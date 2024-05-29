'use client'
import {useState, useEffect} from 'react'
import Post from '@/app/home/components/Post'
import { fetchPosts } from '@/services/postService'
import { sortMostRecent } from '@/utils/stringHelperFuncts'
import Spinner from '@/app/components/Spinner'
import Modal from '@/app/components/Modal'
import { 
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    TelegramShareButton,
   } from 'react-share'
import { toast } from 'react-toastify'
import { FaWhatsapp, FaRegCopy, FaFacebook, FaTelegram, FaXTwitter } from "react-icons/fa6";

export default function PostsActivity({userId, name}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sharedPost, setSharedPost] = useState(null);

    const copyLink = () => {
        navigator.clipboard.writeText(sharedPost);
        toast.success('Link copied to clipboard!', {
          theme: 'light'
        })
        }

    useEffect(() => {
        setLoading(true);
        fetchPosts()
            .then((res) =>{ 
            setPosts(sortMostRecent(res).filter(post => post.author_info.id === userId));
            setLoading(false);
            }).then(()=>{
            })
        }, [])
        
    const sharePost = (link) => {
        setSharedPost(link)
        }

  return (
    <>
        { (posts.length > 0)? 
          posts.map((post, index) => ( <Post key={index} post={post} handleShare={sharePost} />)) : (loading)?
            <Spinner centered={true} /> :
            <h2 className='w-full font-semibold text-xl text-center'>{name == "You" ? `You have` : `${name} has`} not made any posts yet!</h2>
        }
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
    </>
  )
}
