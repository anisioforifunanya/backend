import { toast } from 'react-toastify';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

let user = null;

if (typeof window !== "undefined" && window.localStorage) {
    user = JSON.parse(localStorage.getItem('user'));
}

export const fetchPosts = async () => {
    if(!user){
        console.error('user not logged in')
        return
    }
    try {
        const response = await fetch(`${baseUrl}post_mgt/posts/`,{
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            }
        });

        if (!response.ok) throw new Error(response.message);

        const json = await response.json();
        return json.data;

    } catch (error) {
        toast.error(`Network Error: ${error || 'Could not Fetch Posts'}`);
        return 'error'
    } 
};

export const fetchPost = async (id) => {

    try {
        const response = await fetch(`${baseUrl}post_mgt/posts/${id}/`,{
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            }
        });

        const json = await response.json();

        if (!response.ok) throw new Error(json.message);

        return json.data;

    } catch (error) {
        throw new Error(error);
    } 
};

export const updateUser = async (id, formData) => {

    try {
        const response = await fetch(`${baseUrl}job_mgt/jobs/${id}/`,{
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: formData
        });

        if (!response.ok) throw new Error(response.message);

        const json = await response.json();
        return json.data;

    } catch (error) {
        toast.error(`Network Error: Could not Fetch Job`);
        console.log(error);
    } 
};

export const createPost = async (formData) => {
    try {
        const response = await fetch(`${baseUrl}post_mgt/posts/`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify(formData)
        });
        
        const json = await response.json();

        if (!response.ok) throw new Error(json.message);

        return json.data;

    } catch (error) {
        toast.error(`Error: ${error}`);
        console.log(error);
        return 'error';
    } 
};

export const uploadMedia = async (post_id, file, type) => {

    const formData = new FormData();
    
    if (type === 'picture') {
        formData.append('image', file);
    } else if (type === 'video') {
        formData.append('video', file);
    }
    
    formData.append('post_id', post_id);

    try {
        const response = await fetch(`${baseUrl}post_mgt/upload_media/`,{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user?.accessToken}`
            },
            body: formData
        });

        const json = await response.json();
        
        if (!response.ok) return json

        return json.data;

    } catch (error) {
        console.log(error);
        return 'error';
    } 
};

export const comment = async (payload) => {
    try {
        const response = await fetch(`${baseUrl}post_mgt/comments/`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify(payload)
        });

        const json = await response.json();
        
        if (!response.ok) {
            toast.error(`Error: ${json.message}`);
            return 'error'
        }

        return json.data;

    } catch (error) {
        console.log(error);
        return 'error';
    } 
};

export const fetchComments = async (postId) => {
    try {
        const response = await fetch(`${baseUrl}post_mgt/comments/`,{
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            }
        });

        const json = await response.json();

        if (!response.ok) throw new Error(json.message);

        return json.data;

    } catch (error) {
        throw new Error(error);
    } 
};

export const likePost = async (id) => {
    try {
        const response = await fetch(`${baseUrl}post_mgt/posts/${id}/`,{
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify({
                is_liked: true
            })
        });

        const json = await response.json();
        
        if (!response.ok) {
            toast.error(`Error: failed to like post: ${json.message || 'something went wrong!'}`);
            return 'error'
        }

        return json.data;

    } catch (error) {
        console.log(error);
        return 'error';
    } 
};

export const unlikePost = async (id) => {
    try {
        const response = await fetch(`${baseUrl}post_mgt/posts/${id}/`,{
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify({
                is_unliked:true
            })
        });

        const json = await response.json();
        
        if (!response.ok) {
            toast.error(`Error: failed to unlike post: ${json.message || 'something went wrong!'}`);
            return 'error'
        }

        return json.data;

    } catch (error) {
        console.log(error);
        return 'error';
    } 
};


export const deletePost = async (id) => {
    try {
        const response = await fetch(`${baseUrl}post_mgt/posts/${id}/`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.accessToken}`,
            }
        });
        
        if (!response.ok) throw new Error('failed to delete post')

        return 'deleted';

    } catch (error) {
        console.log(error);
        toast.error(`${error}`);
        return 'error';
    } 
};