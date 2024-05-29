import { toast } from 'react-toastify';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

let user = null;

if (typeof window !== "undefined" && window.localStorage) {
    user = JSON.parse(localStorage.getItem('user'));
}

export const fetchUserLocations = async (isUser) => {

    try {
        const response = await fetch(`${baseUrl}user_mgt/users/${isUser? '?user_type=user' : ""}`);
        if (!response.ok) {
            return 'error';
        }
        const json = await response.json();
        return json.data?.map(user => ({
            id: user.id,
            display_name: user.display_name,
            profile_pic: user.profile_pic_url,
            last_seen: user.date_updated,
            coordinates: user.coordinates || null
        })).filter(user => user.coordinates !== null);

    } catch (error) {
        toast.error(`Network Error: Could not Fetch Users`);
        console.log(error);
        return 'error';
    } 
};

export const getLocation = async (id) => {

    try {
        const response = await fetch(`${baseUrl}user_mgt/users/${id}/`,{
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            }
        });

        const json = await response.json();

        if (!response.ok) throw new Error(json.message);

        return json.data?.coordinates || null;

    } catch (error) {
        toast.error(`Network Error: ${error}`);
        console.log(error);
        return 'error'
    } 
};

export const updateUserLocation = async (id, coordinates) => {

    try {
        const response = await fetch(`${baseUrl}user_mgt/users/${id}/`,{
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify({
                coordinates,
            })
        });
        
        const json = await response.json();

        if (!response.ok) return toast.error(`${json.message}`);

        return json.data;

    } catch (error) {
        toast.error(`Network Error: Could not update location!`);
        console.log(error);
        return 'error';
    } 
};
