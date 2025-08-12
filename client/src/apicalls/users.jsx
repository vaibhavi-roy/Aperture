import { axiosInstance } from "."; // <-- Notice the import from "."

// Register a new user
export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/users/register', payload);
        return response.data;
    } catch (error) {
        // Axios wraps the error response in error.response
        throw error.response.data;
    }
};

// Login a user
export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/users/login', payload);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('/users/get-current-user');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};