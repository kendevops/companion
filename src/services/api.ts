import axios from 'axios';
import API_URL from './api-config';
import { toast } from "react-hot-toast";

// Create an axios instance with the base URL
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common errors
        if (error.response) {
            // Authentication errors
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                toast.error('Session expired. Please login again.');
                window.location.href = '/login';
            }

            // Authorization errors
            if (error.response.status === 403) {
                toast.error('You do not have permission to perform this action');
            }

            // Validation errors
            if (error.response.status === 400 && error.response.data.errors) {
                Object.values(error.response.data.errors).forEach((errorMessages) => {
                    (errorMessages as string[]).forEach((message: string) => {
                        toast.error(message);
                    });
                });
            }

            // Display general error message
            if (error.response.data.message) {
                toast.error(error.response.data.message);
            }
        } else {
            // Network errors or other issues
            toast.error('Network error. Please check your connection.');
        }

        return Promise.reject(error);
    }
);

export default api;