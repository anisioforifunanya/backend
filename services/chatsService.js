import { toast } from 'react-toastify';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

let user = null;

if (typeof window !== "undefined" && window.localStorage) {
    user = JSON.parse(localStorage.getItem('user'));
}

export const sendMessage = async (msgObj) => {
    try {
        const response = await fetch(`${baseUrl}chat_mgt/dms/`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify(msgObj)
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

export const setAsRead = async (id) => {
    try {
        const response = await fetch(`${baseUrl}chat_mgt/dms/${id}/`,{
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify({
                is_read: true,
            })
        });
        const json = await response.json();

        if (!response.ok) throw new Error(json.message);

        return json.data;

    } catch (error) {
        console.log(error);
        return 'error';
    } 
};

export const getMessages = async () => {

    try {
        const response = await fetch(`${baseUrl}chat_mgt/dms/`,{
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
        });

        const json = await response.json();

        if (!response.ok) throw new Error(json.message);

        return json.data;

    } catch (error) {
        toast.error(`Error: ${error}`);
        console.log(error);
    } 
};

export const createGroup = async (group) => {
    try {
        const response = await fetch(`${baseUrl}chat_mgt/groups/`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify(group)
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

export const getGroupList = async () => {

    try {
        const response = await fetch(`${baseUrl}chat_mgt/groups/`,{
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
        });

        const json = await response.json();

        if (!response.ok) throw new Error(json.message);

        return json.data;

    } catch (error) {
        toast.error(`${error || 'something went wrong!'}`);
        console.log(error);
        return 'error'
    } 
};

export const getGroupMsg = async (groupId) => {

    try {
        const response = await fetch(`${baseUrl}chat_mgt/group_chats/`,{
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
        });

        const json = await response.json();

        if (!response.ok) throw new Error(json.message);

        return json.data.filter(item => item.group == groupId)[0];

    } catch (error) {
        toast.error(`${error || 'something went wrong!'}`);
        console.log(error);
        return 'error'
    } 
};

export const sendGroupMessage = async (msgObj) => {
    try {
        const response = await fetch(`${baseUrl}chat_mgt/group_chats/`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify(msgObj)
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