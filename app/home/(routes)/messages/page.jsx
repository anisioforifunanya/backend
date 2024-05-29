'use client'
import { getGroupList, getMessages } from '@/services/chatsService'
import {useState, useEffect, useContext} from 'react'
import { AuthContext } from '@/context/authContext'
import Spinner from '@/app/components/Spinner'
import Error from '@/app/components/Error'
import SkeletonLoader from '@/app/components/SkeletonLoader'
import ChatBody from './components/ChatBody'
import { toast } from 'react-toastify'
import { LuMessageSquarePlus } from "react-icons/lu";
import { MdGroupAdd } from "react-icons/md";
import Modal from '@/app/components/Modal'
import NewMessage from './components/NewMessage'
import GroupBody from './components/GroupBody'
import NewGroupMsg from './components/NewGroupMsg'


export default function messages() {
  const [tab, setTab] = useState('chats')
  const [chats, setChats] = useState(null)
  const [currentChat, setCurrentChat] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openGroup, setOpenGroup] = useState(false)
  const { user: authUser } = useContext(AuthContext);
  const [groups, setGroups] = useState(null);
  const [groupsPending, setGroupsPending] = useState(null);

  useEffect(() => {
    if (authUser) {
      const fetchMessages = async () => {
        try {
          const res = await getMessages();
      
          if (res !== 'error') {
            const chatMap = new Map();
      
            res.forEach((msg) => {
              const isAuthUserSender = msg.sender === authUser.id;
              const isAuthUserReceiver = msg.receiver === authUser.id;
              
              const otherParticipant = isAuthUserSender ? msg.receiver : msg.sender;
              
              const shouldIncludeMessage =
                (isAuthUserReceiver && !isAuthUserSender) || 
                (isAuthUserSender && !isAuthUserReceiver); 
      
              if (shouldIncludeMessage) {
                if (chatMap.has(otherParticipant)) {
                  chatMap.get(otherParticipant).messages.push(msg);
                } else {
                  chatMap.set(otherParticipant, {
                    participantId: otherParticipant,
                    participantInfo:
                      msg.sender === authUser.id ? msg.receiver_info : msg.sender_info,
                    messages: [msg],
                  });
                }
              }
            });
      
            const allChats = Array.from(chatMap.values());
      
            setChats(allChats);
            fetchMessages()
          } else {
            setError(true);
          }
        } catch (error) {
          setError(true);
          console.error('Error fetching messages:', error);
        } finally {
          setLoading(false);
      
          if (error) {
            toast.error('It seems you are offline, reload the page to try again!', {
              autoClose: false,
            });
          }
        }
      };

      fetchMessages(); 
    }
  }, [authUser]);

  useEffect(() => {
    if (chats && currentChat) {
      const updatedChat = chats.find((chat) => chat.participantId === currentChat.participantId);
      if (updatedChat) {
        setCurrentChat(updatedChat);
      }
    }
  }, [chats, currentChat]);

  useEffect(()=>{
    if(authUser){
        setGroupsPending(true)
        getGroupList()
        .then(res=>{
            if(res !== 'error'){
                setGroups(res.filter(group => group.members?.includes(authUser.id)))
            }else{
                setError(true)
            }
        }).finally(()=> setGroupsPending(false))
    }
  }, [authUser])

  return (
    <div className='w-full overflow-y-auto flex h-full'>
      <NewMessage 
          openModal={openModal}
          handleCloseModal={()=> setOpenModal(false)}
          authUser={authUser}
      />
      <NewGroupMsg
        openModal={openGroup}
        handleCloseModal={()=> setOpenGroup(false)}
        authUser={authUser}
      />
      <div 
        className={`h-full sm:w-[50%] sm:flex  ${!currentChat && !currentGroup? 'flex' : 'hidden'} relative w-full max-w-none md:max-w-xs border-r border-r-[#eaeaea] overflow-y-auto flex flex-col`}>
          <header 
            className='flex text-center text-red-800 font-semibold sticky top-0 z-10 shadow-red-200 shadow-lg bg-white'>
            <span
              onClick={()=> setTab('chats')} 
              className={`p-1 border-b-2 flex-1 ${tab === 'chats' ? "border-b-red-800 text-red-800": "border-b-grey text-gray-500"} border-r transition-all border-gray-300 cursor-pointer`}>
                Chats
            </span>
            <span 
              onClick={()=> setTab('groups')} 
              className={`p-1 border-b-2 flex-1 ${tab === 'groups' ? "border-b-red-800 text-red-800": "border-b-grey text-gray-500"} transition-all cursor-pointer`}>
                Groups
            </span>
          </header>
          {tab === 'chats' ? <>
              {chats && chats.length === 0 &&
                  <div className='h-full flex-col flex justify-center items-center'>
                    <p className="font-semibold text-center mb-2">
                      You haven't sent or received any messages yet!
                    </p>
                    <button 
                      onClick={()=> setOpenModal(true)}
                      className="p-2 text-white rounded-md font-semibold bg-red-500">
                      Send Message
                    </button>
                  </div>
              }
             {authUser && 
            <button 
                onClick={()=> setOpenModal(true)}
                title='New Message' 
                className="cursor-pointer p-2 bg-red-500 rounded-full shadow-lg w-fit text-2xl text-white absolute bottom-4 left-3 border-3 border-black">
                <LuMessageSquarePlus />
              </button>}
            {chats?.map(chat => (
              <div 
                key={chat.participantId} 
                onClick={() => setCurrentChat(chat)}
                className='p-3 flex border-b border-gray-100 gap-2 hover:bg-gray-100 transition cursor-pointer items-center capitalize justify-between'
                >
                  <div className='flex gap-2 items-center'>
                      <img 
                        src={chat.participantInfo.profile_pic_url || '/img/user.png'} 
                        className='w-[35px] h-[35px] object-cover rounded-full border-2 border-red-600'
                        alt="user" />
                        <p className='truncate'>
                          {chat.participantInfo.display_name}
                        </p>
                  </div>
                {currentChat?.participantId !== chat.participantId &&
                  chat.messages?.filter(msg => msg.is_read === false && msg.sender !== authUser?.id).length > 0 && 
                    <span className='p-1 leading-none text-[0.65rem] px-[5px] bg-red-600 text-white font-semibold rounded-full'>
                      {chat.messages?.filter(msg => msg.is_read === false && msg.sender !== authUser?.id).length}
                    </span>
                }
              </div>
            ))}
            {loading && <div className='p-3'>
                <SkeletonLoader />
              </div>}
            {error && <Error className={'w-[150px] h-auto'}><p className='text-sm' >Try reloading the page!</p></Error>}
          </> : <>
            <div className='h-full flex flex-col items-center justify-center'>

              { groups && groups.length === 0 &&  <div className='h-full flex-col flex justify-center items-center'>
                    <p className="font-semibold text-center mb-2">
                      You aren't in any groups yet!
                    </p>
                    <button 
                      onClick={()=> setOpenGroup(true)}
                      className="p-2 text-white rounded-md font-semibold bg-red-500">
                      Create Group
                    </button>
                  </div>}

              {groupsPending && (<div className='p-3 w-full'>
                <SkeletonLoader />
              </div>)}

              {authUser && 
                <button 
                    onClick={()=> setOpenGroup(true)}
                    title='New Group' 
                    className="cursor-pointer p-2 bg-red-500 rounded-full shadow-lg w-fit text-2xl text-white absolute bottom-4 left-3 border-3 border-black">
                    <MdGroupAdd />
                  </button>}

              <div className='h-full w-full'>
                {groups?.map(group => (
                    <div 
                      key={group.id} 
                      onClick={() => setCurrentGroup(group)}
                      className='p-2 border-b border-gray-100 hover:bg-gray-100 transition cursor-pointer capitalize'
                    >
                      <p className='truncate'>{group.name}</p>
                      <p className='text-xs text-gray-600'>{group.members?.length} {group.members?.length === 1 ? 'Member' : 'Members'}</p>
                  </div>
                ))}
              </div>
              {error && <Error className={'w-[150px] h-auto'}><p className='text-sm' >Try reloading the page!</p></Error>}
            </div>
          </>}
        </div>
 

          { tab === 'chats' ? (
             <div className={`h-full w-full sm:block ${currentChat? 'block' : 'hidden'}`}>
                {!loading && (currentChat? (
                    <ChatBody currentChat={currentChat} user={authUser} closeChat={() => setCurrentChat(null)} />
                  ) : (
                    <div className='h-full w-full flex justify-center text-center items-center flex-col'>
                      <p className="font-semibold">
                        Select a chat to see messages!
                      </p>
                    </div>
                ))}
                {loading && <Spinner centered />}
            </div>
          ) : (
            <div className={`h-full w-full sm:block ${currentGroup? 'block' : 'hidden'}`}>
            {currentGroup? (
                <GroupBody group={currentGroup} user={authUser} closeGroup={() => setCurrentGroup(null)} />
              ) : (
                <div className='h-full w-full flex justify-center text-center items-center flex-col'>
                  <p className="font-semibold">
                    Select a group to see messages!
                  </p>
                </div>
            )}
        </div>
          )}
    </div>
  )
}