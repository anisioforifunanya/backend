import { toast } from 'react-toastify';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

let user = null;

if (typeof window !== "undefined" && window.localStorage) {
    user = JSON.parse(localStorage.getItem('user'));
}
export const fetchUsers = async (isUser) => {

    try {
        const response = await fetch(`${baseUrl}user_mgt/users/${isUser? '?user_type=user' : ""}`);
        if (!response.ok) {
            return 'error';
        }

        const json = await response.json();
        return json.data.filter(data => data.is_verified);

    } catch (error) {
        toast.error(`Network Error: Could not Fetch Users`);
        console.log(error);
        return 'error';
    } 
};

export const suggestedProfiles = async () => {
    if(!user){
        console.error('user not logged in')
        return
    }
    try {
        const response = await fetch(`${baseUrl}user_mgt/suggested_people/`,{
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            }
        });
        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message);
        }
        return json.data;

    } catch (error) {
        toast.error(`Network Error:${error ||  'Could not Fetch Users'}`);
        console.log(error);
        return 'error';
    } 
};

export const fetchUser = async (id) => {

    try {
        const response = await fetch(`${baseUrl}user_mgt/users/${id}/`,{
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            }
        });

        if (!response.ok) throw new Error(response.message);

        const json = await response.json();
        return json.data;

    } catch (error) {
        toast.error(`Network Error: Could not Fetch User`);
        console.log(error);
    } 
};

export const updateUser = async (id, formData) => {

    try {
        const response = await fetch(`${baseUrl}user_mgt/users/${id}/`,{
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: formData
        });
        
        const json = await response.json();

        if (!response.ok) return toast.error(`${json.message}`);

        return json.data;

    } catch (error) {
        toast.error(`Network Error: Could not update profile!`);
        console.log(error);
        return 'error';
    } 
};

export const updateProfilePic = async (id, formData) => {

    try {
        const response = await fetch(`${baseUrl}user_mgt/upload_profile_pic/`,{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: formData
        });
        
        const json = await response.json();

        if (!response.ok) {
            return toast.error(`${json.message}`);
        };

        return 'success';

    } catch (error) {
        toast.error(`${error}`);
        console.log(error);
    } 
};

export const updateCoverPic = async (id, formData) => {

    try {
        const response = await fetch(`${baseUrl}user_mgt/upload_other_pics/`,{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: formData
        });
        
        const json = await response.json();

        if (!response.ok) {
            return toast.error(`${json.message}`);
        };

        return 'success';

    } catch (error) {
        toast.error(`${error}`);
        console.log(error);
    } 
};

export const uploadVerifyPic = async (formData) => {

    try {
        const response = await fetch(`${baseUrl}user_mgt/upload_verify_pic/`,{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: formData
        });
        
        const json = await response.json();

        if (!response.ok) throw new Error(json.message);
        
        return json.data;
        
    } catch (error) {
        toast.error(`${error}`);
        return 'error'
    } 
};

export const followUser = async (id, followed) => {
    try {
        const response = await fetch(`${baseUrl}user_mgt/users/${id}/`,{
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify({
                followed_username: followed
            })
        });
        
        const json = await response.json();

        if (!response.ok) {
            toast.error(`${json.message}`);
            return 'error'
        }

        return json.data;

    } catch (error) {
        toast.error(`Network Error: Could not follow User!`);
        console.log(error);
        return 'error';
    } 
};

export const unFollowUser = async (id, followed) => {
    try {
        const response = await fetch(`${baseUrl}user_mgt/users/${id}/`,{
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify({
                unfollowed_username: followed
            })
        });
        
        const json = await response.json();

        if (!response.ok) {
            toast.error(`${json.message}`);
            return 'error'
        }

        return json.data;

    } catch (error) {
        toast.error(`Network Error: Could not unfollow User!`);
        console.log(error);
        return 'error';
    } 
};


export const search = async (type, query) => {

    try {
        const response = await fetch(`${baseUrl}user_mgt/search/?category=${type}&query=${query}`);

        if (!response.ok) throw new Error(response.message);

        const json = await response.json();
        
        return type === 'users' ? json.data.filter(user => user.is_verified) : json.data;

    } catch (error) {
        toast.error(`Network Error: ${error}`);
        return 'error'
    } 
};
