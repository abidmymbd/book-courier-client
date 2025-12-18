import axios from 'axios';
import React from 'react';


const axiosSecure = axios.create({
    baseURL: 'https://book-courier-server-ochre.vercel.app',
    headers: {
        'Content-Type': 'application/json',
    }
});

const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;