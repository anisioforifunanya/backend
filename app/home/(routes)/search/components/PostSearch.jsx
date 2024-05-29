'use client'
import React, { useEffect, useState, useContext } from 'react'
import { search } from '@/services/peopleService'
import Spinner from '@/app/components/Spinner'
import { AuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import UserCard from '@/app/components/people/userCard'
import Error from '@/app/components/Error'
import NoResults from '@/app/components/NoResults';
import Post from '@/app/home/components/Post';
import Modal from '@/app/components/Modal'
import { 
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    TelegramShareButton,
   } from 'react-share'
import { toast } from 'react-toastify'
import { FaWhatsapp, FaRegCopy, FaFacebook, FaTelegram, FaXTwitter } from "react-icons/fa6";

export default function PostSearch({query}) {
    const { user: authUser } = useContext(AuthContext);
    const { push } = useRouter();
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState(null)
    const [sharedPost, setSharedPost] = useState(null);


    useEffect(() => {
     if(authUser) {
        setLoading(true)
        setPosts(null)
        search("posts", query)
          .then(data => {
            if(data === 'error'){
                setError(true)
            } else {
              setPosts(data)
            }
        }).finally(()=> setLoading(false))
      }}, [authUser, query])

      const copyLink = () => {
        navigator.clipboard.writeText(sharedPost);
        toast.success('Link copied to clipboard!')
      }

      const sharePost = (link) => {
        setSharedPost(link)
        }
  
  return (
    <div className='flex flex-col w-full items-center p-[15px] h-[calc(100vh-70px)] overflow-y-auto'>
        {posts?.length > 0?
          <>
            <div className='flex gap-3 flex-wrap animate-fadeup justify-center w-full'>
                {posts.map(post => (<Post post={post} key={post.id} handleShare={sharePost} />))}
            </div>
            <h2 className="text-center-font-semibold text-xl mt-[15px]">End of search results!</h2>
          </>
        : posts?.length === 0? 
            <NoResults className={'w-[150px] h-auto'}/>
        : loading ?
            <Spinner centered />
        : error? <Error className={'w-[150px] h-auto'}/>
        : null}
         <Modal
        onClose={() => setSharedPost(null)}
        isModalOpen={sharedPost}
      >
         <h2 className="text-xl font-semibold mb-5 text-center">Share this Post!</h2>
        <div className="flex flex-wrap items-center justify-center gap-2 text-white text-2xl">

          <WhatsappShareButton url={sharedPost}>
            <div className='bg-[#1f9f1f] p-2 rounded-full hover:scale-105'>
              <FaWhatsapp />
            </div>
          </WhatsappShareButton>

          <FacebookShareButton url={sharedPost}>
            <div className='bg-[#3939b6] p-2 rounded-full hover:scale-105'>
              <FaFacebook />
            </div>
          </FacebookShareButton>

          <TwitterShareButton url={sharedPost}>
            <div className='bg-[black] p-2 rounded-full hover:scale-105'>
              <FaXTwitter />
            </div>
          </TwitterShareButton>

          <TelegramShareButton url={sharedPost}>
            <div className='bg-[#00a2ff] p-2 rounded-full hover:scale-105'>
              <FaTelegram />
            </div>
          </TelegramShareButton>
        </div>

        <div className="p-2 w-full overflow-x-auto rounded flex mt-4 mx-auto justify-between gap-5 border-red-500 border relative">
          <p>{sharedPost}</p>
          <button 
            title='Copy' 
            onClick={copyLink}
            className='text-xl border-slate-500 bordertext-red-400 absolute px-2 right-0 bg-[#fffffff1]'><FaRegCopy /></button>
        </div>
         </Modal>
    </div>
  )
}
