'use client'
import React, { useEffect, useState } from 'react'
import QuickPost from './QuickPost'
import Post from './Post'
import Modal from '@/app/components/Modal'
import styles from '../styles/Feed.module.css'
import Link from 'next/link'
import { FaWhatsapp, FaRegCopy, FaFacebook, FaTelegram, FaXTwitter } from "react-icons/fa6";
import Image from 'next/image'
import { fetchPosts } from '@/services/postService'
import Spinner from '@/app/components/Spinner'
import { sortMostRecent } from '@/utils/stringHelperFuncts'
import { 
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    TelegramShareButton,
   } from 'react-share'
import { toast } from 'react-toastify'
import Error from '@/app/components/Error'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(false)
  const [refetchCount, setRefetchCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [sharedPost, setSharedPost] = useState(null);

  const copyLink = () => {
    navigator.clipboard.writeText(sharedPost);
    toast.success('Link copied to clipboard!', {
      theme: 'light'
    })
    }

  const handleRefetch = () => {
    setRefetchCount(prev => prev + 1);
  };

  const handleSharePost = (link) => {
    setSharedPost(link)
  }

  const handleDelete = (id) =>{
    setPosts(posts.filter(post => post.id != id))
  } 

  useEffect(() => {
    fetchPosts()
      .then((res) =>{ 
        if( res === 'error'){
          setError(true)
          return
        } else {
          setPosts(sortMostRecent(res));
        }
          setLoading(false);
      })
  }, [refetchCount])

  return (
   <div className={styles.feedWrapper}>
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

          {/* <Link href={sharedPost}>
            <div className='bg-[#ff0066] p-2 rounded-full hover:scale-105'>
              <FaInstagram />
            </div>
          </Link>

          <Link href={sharedPost}>
            <div className='bg-[#ff0000] p-2 rounded-full hover:scale-105'>
              <FaYoutube />
            </div>
          </Link> */}
        </div>

        <div className="p-2 w-full overflow-x-auto rounded flex mt-4 mx-auto justify-between gap-5 border-red-500 border relative">
          <p>{sharedPost}</p>
          <button 
            title='Copy' 
            onClick={copyLink}
            className='text-xl border-slate-500 bordertext-red-400 absolute px-2 right-0 bg-[#fffffff1]'><FaRegCopy /></button>
        </div>

      </Modal>
      <QuickPost refetchPosts={handleRefetch} />
      { (posts && posts.length > 0)? 
            posts.map((post, index) => ( <Post key={index} post={post} handleShare={handleSharePost} handleDeleteFilter={handleDelete} />))
      : (!error)?
            <Spinner centered={true} /> 
      : <Error className={'w-[100px] h-auto '}/>
             
            
        }
      {posts && posts.length > 0 && 
        <div className={styles.noMorePosts}>
          <Image src='/posts_illustration.svg' alt='more posts' width={200} height={200} />
          <p>Follow people to see more posts!</p>
          <Link href='./home/people'>Find People</Link>
        </div>}
   </div>
  )
}
