import { toast } from 'react-toastify';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

let user = null;

if (typeof window !== "undefined" && window.localStorage) {
    user = JSON.parse(localStorage.getItem('user'));
}
export const fetchJobs = async () => {

    try {
        const response = await fetch(`${baseUrl}job_mgt/jobs/`,{
        });

        if (!response.ok) throw new Error(response.message);

        const json = await response.json();
        return json.data;

    } catch (error) {
        toast.error(`Network Error: Could not Fetch Jobs`);
        console.log(error);
        return 'error'
    } 
};

export const fetchJob = async (id) => {

    try {
        const response = await fetch(`${baseUrl}job_mgt/jobs/${id}/`,{
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            }
        });

        const json = await response.json();

        if (!response.ok) throw new Error(json.message);

        return json.data;

    } catch (error) {
        toast.error(`Network Error: Could not Fetch Job`);
        console.log(error);
    } 
};

export const updateJob = async (id, formData) => {

    try {
        const response = await fetch(`${baseUrl}job_mgt/jobs/${id}/`,{
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: formData
        });

        const json = await response.json();
        if (!response.ok) throw new Error(json.message);

        return json.data;

    } catch (error) {
        toast.error(`Network Error: Could not Update Job`);
        console.log(error);
    } 
};


