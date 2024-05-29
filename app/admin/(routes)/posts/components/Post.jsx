'use client'
import {useState, useEffect, useContext} from 'react'
import moment from 'moment';
import { useRouter } from 'next/navigation';
import styles from '../styles/post.module.css'
import { LiaCommentDots } from "react-icons/lia";
import { toast } from 'react-toastify';
import Image from 'next/image'
import { deletePost } from '@/services/postService';
import { AuthContext } from '@/context/authContext';
import { FaTrash } from 'react-icons/fa6';
import Modal from '@/app/components/Modal';
import Loader from '@/app/components/Loader';


export default function Post({post, handleDeleteFilter}) {
  const [showDelete, setShowDelete] = useState(false);
  const [deletePending, setDeletePending] = useState(false)
  const { user: authUser } = useContext(AuthContext);
  const { push } = useRouter();

  const handleDelete = () =>{
    setDeletePending(true);
      deletePost(post.id)
        .then((res)=> {
          if(res !== 'error'){
            toast.success('Post deleted successfully!');
            setShowDelete(false);
            handleDeleteFilter(post.id)
          }
        }).finally(()=> setDeletePending(false))
  }

  return (
    <div className={styles.postWrapper}>
      <Modal 
        onClose={() => setShowDelete(false)}
        isModalOpen={showDelete}
        className={"text-black"}
        title={'Confirm Post Delete'}
      >
        <p className="font-semibold mb-4">Are you sure you want to delete this post. <br /> <span className='text-red-500'>This cannot be undone!</span></p>
          
          <div className="flex gap-2">
          <button 
              onClick={handleDelete} 
              className={`p-3 rounded text-white ${deletePending ? 'bg-[#545454]' : 'bg-[#ff2f00]'} font-semibold w-[48%] flex items-center justify-center gap-2`}>{deletePending? <>Loading <Loader /></>: 'Delete Post'}</button>
          <button 
              onClick={()=> setShowDelete(false)} 
              className='p-3 text-white rounded bg-[#4b4b4b] font-semibold w-[48%]'>Cancel</button>
          </div>
      </Modal>
        <div className={styles.postHeader}>
          <div>
            <Image 
              src={post.author_info?.profile_pic_url || '/img/user.png'} 
              alt={post.author_info?.username || 'user'} 
              height={40} 
              width={40}
              className='cursor-pointer'
              onClick={()=> push(`/home/people/${post.author_info?.id}`)}
            />
            <div>
                <h4 className="leading-tight font-semibold">{post.author_info?.display_name}</h4>
                <p className="leading-none text-gray-500 text-[0.85em]">@{post.author_info?.username} • <span className='text-red-400'>{ moment(post.date_created).fromNow()}</span></p>
            </div>
          </div>
        <button onClick={()=> setShowDelete(true)} className='text-red-500'>
            <FaTrash size={16}/>
        </button>
        </div>
        <p className="py-2">{post.content}</p>
        <div className={styles.mediaWrapper}>
        {
          post.media?.length > 0?
          post.media.map((media, index) => (
            <div key={index} style={post.media.length % 2 !== 0 && index === post.media.length - 1 ? { width: '100%' } : { width: '49%', height:"300px" }}>
                  {media.type == 'image'?
                  <img src={media.url} alt={post.content} />:
                  <video src={media.url} controls></video>
                }
              </div>
          ))  : null
        }
        </div>
        <div className={styles.engagements}>
          <button 
            className="flex items-center gap-1"
            onClick={()=> push(`/home/posts/${post.id}`)}
          >
            <LiaCommentDots />
            <span>{post.comments?.length}</span>
          </button>
        </div>
    </div>
  )
}
