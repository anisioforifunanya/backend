import { toast } from 'react-toastify';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

let user = null;

if (typeof window !== "undefined" && window.localStorage) {
    user = JSON.parse(localStorage.getItem('user'));
}

export const createProduct = async (formData) => {
    try {
        const response = await fetch(`${baseUrl}store_mgt/products/`,{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
            body: formData
        });
        const json = await response.json();

        if (!response.ok) throw new Error(json.message);
        console.log('json', json.data)
        console.log('response', response)

        return json.data;

    } catch (error) {
        toast.error(`Error: ${error}`);
        console.log(error);
        return 'error';
    } 
};

export const fetchProducts = async () => {

    try {
        const response = await fetch(`${baseUrl}store_mgt/products/`,{
        });

        const json = await response.json();

        if (!response.ok) throw new Error(json.message);

        return json.data;

    } catch (error) {
        toast.error(`Error: ${error}`);
        console.log(error);
    } 
};

export const fetchProduct = async (id) => {

    try {
        const response = await fetch(`${baseUrl}store_mgt/products/${id}/`,{
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            }
        });

        const json = await response.json();

        if (!response.ok) throw new Error(json.message);

        return json.data;

    } catch (error) {
        toast.error(`Network Error: Could not Fetch Product`);
        console.log(error);
        return 'error';
    } 
};

export const updateProduct = async (id, formData) => {

    try {
        const response = await fetch(`${baseUrl}store_mgt/products/${id}/`,{
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
        toast.error(`Error ${error}`);
        console.log(error);
        return 'error';
    } 
};

export const deleteProduct = async (id) => {

    try {
        const response = await fetch(`${baseUrl}store_mgt/products/${id}/`,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            }
        });

        if (!response.ok) throw new Error('Could not Delete Product');

        return 'success';

    } catch (error) {
        toast.error(`Error: ${error}`);
        console.log(error);
        return 'error'
    } 
};