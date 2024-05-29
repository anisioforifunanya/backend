'use client'
import React, { Fragment, useEffect } from 'react'
import { useContext, useState } from 'react'
import { AuthContext } from '@/context/authContext'
import { comment, fetchComments, fetchPost } from '@/services/postService'
import Post from '@/app/home/components/Post'
import Modal from '@/app/components/Modal'
import { useRouter } from 'next/navigation'

import Spinner from '@/app/components/Spinner'
import { 
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    TelegramShareButton,
   } from 'react-share'
import { FaWhatsapp, FaRegCopy, FaFacebook, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { toast } from 'react-toastify'
import Loader from '@/app/components/Loader'
import moment from 'moment'


export default function page({params}) {

    const { user } = useContext(AuthContext);
    const [postData, setPostData] = useState(null);
    const [refetchCount, setRefetchCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [sharedPost, setSharedPost] = useState(null);
    const { push } = useRouter();

    useEffect(() => {
        fetchPost(params?.id)
            .then(data => {
                setPostData(data)
            }).catch(err => {
                console.log('error displayed', err)
                toast.error('Post not found!')
            })
    }, [refetchCount])

    useEffect(() => {
       if(user){ 
            fetchComments({
                post: params?.id,
                author: user?.id
            }).then(data => {
                setComments(data.filter(comment => comment?.post == params?.id))
            })
        }
        console.log(comments)
    }, [refetchCount, user])

    const handleSharePost = (link) => {
        setSharedPost(link)
      }
    
    const copyLink = () => {
        navigator.clipboard.writeText(sharedPost);
        toast.success('Link copied to clipboard!', {
          theme: 'light'
        })
    }

    const handleCommentChange = (e) => {
        setCommentInput(e.target.value);
    }

    const handleComment = () => {
        if (commentInput) {
            setLoading(true);
            if (!user) {
                toast.error('Your session has expired!');
                push(`/login?redirect=session-expired`)
                return;
            }
             const payload = {
                content: commentInput,
                post: postData?.id,
                author: user.id
             }

             comment(payload)
                .then(data => {
                    if(data !== 'error'){
                        toast.success('Comment posted successfully!')
                        setCommentInput('');
                        setRefetchCount(refetchCount + 1);
                    }
                }).finally(() => setLoading(false));
        } else{
            toast.error('Comment cannot be empty!')
        }
    }




    return (
    <div className='w-full p-4 h-full overflow-y-auto'>
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
       { postData ?
            <>
                <Post post={postData} handleShare={handleSharePost} />
                <div>
                    <h2 className="text-lg my-2 font-semibold">Comments ({comments?.length || 0})</h2>
                    <div>
                        {comments.map((comment, index) => (
                            <Fragment key={index} >
                                <div className="flex gap-2 my-2 items-center leading-tight">
                                    <img 
                                        src={comment?.author_profile_url || '/img/user.png'} 
                                        alt={comment?.author_display_name || 'user'} 
                                        className="w-8 h-8 rounded-full"
                                        onClick={()=> push(`/home/people/${comment?.author}`)}
                                    />
                                    <div>
                                        <h4 className="font-semibold">
                                            {comment?.author_display_name || 'User'}
                                            <span className='text-gray-500 text-xs font-thin'>
                                            {' • '}{moment(comment.date_created).fromNow()}</span>
                                        </h4>
                                        <p>{comment.content}</p>
                                    </div>
                                </div>
                                <hr />
                            </Fragment>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mt-5">
                        <input 
                            type="text" 
                            placeholder="Add a comment" 
                            className="w-full p-2 border border-gray-300 rounded" 
                            value={commentInput} 
                            onChange={handleCommentChange}
                        />
                        <button 
                            className={`${loading? 'bg-slate-600' :'bg-red-500'} text-white px-3 py-2 rounded font-semibold flex items-center gap-1 transition-colors`}
                            onClick={handleComment}
                        >
                                Post
                                {loading && <Loader />}
                        </button>
                    </div>
                </div>
            </>
            : <Spinner centered={true} />}
    </div>
  )
}
