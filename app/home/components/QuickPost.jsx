'use client'
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/authContext';
import { IoCameraOutline, IoAttach, IoVideocamOutline } from "react-icons/io5";
import styles from '../styles/QuickPost.module.css';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { createPost, uploadMedia } from '@/services/postService';
import { FaTrash } from 'react-icons/fa6';


export default function QuickPost({refetchPosts}) {

    const { push } = useRouter();
    const { user } = useContext(AuthContext);

    useEffect(()=>{
        setFormData(prev =>({
            ...prev,
            author: user?.id
        }))
    },[user]);

    const [formData, setFormData] = useState({
        content: '',
        author:  user?.id,
        media: [],
    });
    const [isPosting, setIsPosting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev =>( {
            ...prev,
            content: value
        }));
    };

    const handleMediaChange = (event) => {
        const { name, files } = event.target;
    
        if (files && files.length > 0) {
            const file = files[0];
            const fileType = name === 'picture' ? 'picture' : 'video';

            if (formData.media.filter(item => item.type === fileType).length > 0) {
                toast.error(`You can only upload a maximun of one ${fileType} at a time.`);
                return;
            }
        
            setFormData(prev => ({
                ...prev,
                media: [...prev.media, { id: uuidv4(), type: fileType, file: file }]
            }));
        }
    };

    const deleteMedia = (id) => {
        setFormData(prev => ({
            ...prev,
            media: prev.media.filter(item => item.id !== id)
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (formData.content.trim() === '') {
            toast.error('Add a caption before posting!');
            return;
        }
    
        setIsPosting(true);
    
        const loadingToastId = toast.loading('Sending post ...', { theme: 'light' });
    
        let payload = {
            author: formData.author ||  user?.id,
            content: formData.content
        };

        if (!user) {
            toast.error('Your session has ended, kindly login again!', { theme: 'light' });
            push('/login')
            return;
        }
    
        createPost(payload)
            .then(res => {
                if (res !== 'error') {
                    const mediaPromises = formData.media.map(item =>
                        uploadMedia(res.id, item.file, item.type)
                    );
    
                    Promise.allSettled(mediaPromises)
                        .then(results => {
                            const hasError = results.some(result => result.value.status === 'failed' || result.value === 'error');
    
                            if (!hasError) {
                                toast.update(loadingToastId, {
                                    render: 'Post sent successfully!',
                                    type: 'success',
                                    isLoading: false,
                                    autoClose: 3000, 
                                });
                                setIsPosting(false);
                                refetchPosts();
                            } else {
                                toast.update(loadingToastId, {
                                    render: `Something went wrong: ${results?.find(result => result?.value.status === 'failed').value?.message}`,
                                    type: 'error',
                                    isLoading: false,
                                    autoClose: 3000, 
                                });
                                setIsPosting(false);
                            }
                        });
                } else {
                    toast.update(loadingToastId, {
                        render: 'Failed to create post. Please try again.',
                        type: 'error',
                        isLoading: false,
                        autoClose: 3000,
                    });
                }
            })
            .catch(error => {
                toast.update(loadingToastId, {
                    render: `An error occurred: ${error.message}`,
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000, 
                });
            })
            .finally(() => {
                setFormData({
                    content: '',
                    media: [],
                });
                setIsPosting(false);
            });
    };


  return (
        <form onSubmit={handleSubmit} className={styles.postInputWrqpper}>
            <textarea
                placeholder="What's on your mind?"
                name="content"
                value={formData.content}
                onChange={handleChange}
            />
            <div className="flex flex-wrap gap-3 w-full justify-start h-fit">
                {formData.media?.map(item => (
                    <div className='relative'>
                        <button 
                            onClick={() => deleteMedia(item.id)}
                            className='p-1 bg-red-600 text-xs text-white top-1 right-0 absolute rounded z-10'
                            >
                                <FaTrash />
                        </button>
                        {item.type === 'picture' ? (<img 
                                key={item.id} 
                                src={URL.createObjectURL(item.file)} 
                                alt="" 
                                className='h-[72px] w-[80px] mt-2 object-cover rounded-md'
                            />) : (
                                <video 
                                    src={URL.createObjectURL(item.file)}
                                    key={item.id}
                                    className='h-[72px] w-[80px] mt-2 object-cover rounded-md'
                                    controls
                                ></video>
                            )}
                    </div>
                ))}
            </div>
            <div className={styles.actionBtns}>
                <div>
                    <input
                        type="file"
                        id="picture"
                        className="hidden absolute"
                        name="picture"
                        accept=".jpg, .jpeg, .png" 
                        capture="environment"
                        onChange={handleMediaChange}
                    />
                    <input
                        type="file"
                        id="videoFile"
                        className="hidden absolute"
                        name="video"
                        capture="environment"
                        accept=".mp4" 
                        onChange={handleMediaChange}
                    />
                    <label htmlFor="picture"><IoCameraOutline /></label>
                    <label htmlFor="videoFile"><IoVideocamOutline /></label>
                </div>
                <button 
                    className={styles.postBtn} 
                    style={isPosting? {cursor:'not-allowed' , backgroundColor:'grey'} : null}
                    disabled={isPosting}
                    type="submit">
                    {isPosting? 
                        <img
                        src={"/icons/spinner.svg"}
                        alt="Loading spinner"
                        className="text-white w-[30px] h-[30px]" 
                    />
                    : null}
                    { isPosting? 'Loading...' : 'Post'}
                </button>
            </div>
        </form>
  )
}