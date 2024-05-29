import { fill } from 'lodash';
import { toast } from 'react-toastify';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

let user = null;

if (typeof window !== "undefined" && window.localStorage) {
    user = JSON.parse(localStorage.getItem('user'));
}
export const fetchRequests = async (isUser) => {

    try {
        const response = await fetch(`${baseUrl}user_mgt/users/${isUser? '?user_type=user' : ""}`);
        if (!response.ok) {
            return 'error';
        }

        const json = await response.json();
        return json.data.filter(user => user.filled_all_info && user.user_type === 'user' && user.is_removed === false);

    } catch (error) {
        toast.error(`Network Error: Could not Fetch Users`);
        console.log(error);
        return 'error';
    } 
};

export const adminStats = async () =>{
    try {
        const response = await fetch(`${baseUrl}user_mgt/stats/`,{
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            }
        });
        
        const json = await response.json();

        if (!response.ok) throw new Error(json.message);

        return json.data;

    } catch (error) {
        toast.error(`Error: ${error || 'Something went wrong, please try again!'}`);
    } 
}

export const approveUser = async (id) => {

    try {
        const response = await fetch(`${baseUrl}user_mgt/users/${id}/`,{
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify({
                is_verified: true,
                filled_all_info: false,
            })
        });
        
        const json = await response.json();

        if (!response.ok) throw new Error(json.message);

        return json.data;

    } catch (error) {
        toast.error(`Oops, something went wrong:${error}`);
        console.log(error);
        return 'error';
    } 
};

export const rejectUser = async (id) => {

    try {
        const response = await fetch(`${baseUrl}user_mgt/users/${id}/`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.accessToken}`,
            },
        });
        
        const json = await response.json();

        if (!response.ok) throw new Error(json?.message);

        return 'deleted';

    } catch (error) {
        toast.error(`Oops, something went wrong ${error}`);
        console.log(error);
        return 'error';
    } 
};

export const dismissUser = async (id) => {

    try {
        const response = await fetch(`${baseUrl}user_mgt/users/${id}/`,{
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify({
                is_removed: true,
            })
        });
        
        const json = await response.json();

        if (!response.ok) throw new Error(json.message);

        return json.data;

    } catch (error) {
        toast.error(`Oops, something went wrong:${error}`);
        console.log(error);
        return 'error';
    } 
};