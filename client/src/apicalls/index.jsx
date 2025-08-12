import axios from 'axios';

export const axiosInstance = axios.create({
    // This is the base URL of your backend server
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
    }
});