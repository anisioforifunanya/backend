'use client'
import {useState, useEffect, useContext} from 'react'
import moment from 'moment';
import { useRouter } from 'next/navigation';
import styles from '../styles/Post.module.css'
import { IoHeartOutline, IoShareSocial } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { LiaCommentDots } from "react-icons/lia";
import { toast } from 'react-toastify';
import Image from 'next/image'
import { deletePost, likePost, unlikePost } from '@/services/postService';
import { AuthContext } from '@/context/authContext';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa6';
import Modal from '@/app/components/Modal';
import Loader from '@/app/components/Loader';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export default function Post({post, handleShare, handleDeleteFilter}) {
  const [isliked, setisLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [deletePending, setDeletePending] = useState(false)
  const { user: authUser } = useContext(AuthContext);
  const { push } = useRouter();
  
  useEffect(() => {
    setisLiked(post?.liked_users?.includes(authUser?.id));
    setLikes(post?.liked_users?.length);
  }, [])

  const toggleLike = () => {
    if(isliked){
      setisLiked(false);
      setLikes(prevLikes => prevLikes - 1);
      unlikePost(post.id)
      .then(res => {
        if(res !== 'error'){
          toast.success('Post unliked!');
        }else{
          setisLiked(true);
          setLikes(prevLikes => prevLikes + 1);
        }
      })
    }else{
      setisLiked(true);
      setLikes(prevLikes => prevLikes + 1);
      likePost(post.id)
      .then(res => {
        if(res !== 'error'){
          toast.success('Post liked!');
        }else{
          setisLiked(false);
          setLikes(prevLikes => prevLikes - 1);
        }
      })
    }
  }

  const sharePost = (postId) => {
    handleShare(`${baseUrl}home/posts/${postId}`);
  }

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
        title={'Confirm Post Delete'}
      >
        <p className="font-semibold mb-4">Are you sure you want to delete your post. <br /> <span className='text-red-500'>This cannot be undone!</span></p>
          
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
          {post.author === authUser?.id && (
            <button onClick={()=> setShowDelete(true)} className='text-red-500'>
              <FaTrash size={14}/>
            </button>
          )}
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
            onClick={()=> toggleLike()}>
            {isliked? <FcLike /> : <IoHeartOutline />}
            <span>{likes}</span>
          </button>
          <button 
            className="flex items-center gap-1"
            onClick={()=> push(`/home/posts/${post.id}`)}
          >
            <LiaCommentDots />
            <span>{post.comments?.length}</span>
          </button>
          <button className="flex items-center gap-1" onClick={()=>sharePost(post.id)}>
            <IoShareSocial />
          </button>
        </div>
    </div>
  )
}
