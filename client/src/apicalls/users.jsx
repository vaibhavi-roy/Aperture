import { axiosInstance } from "."; // <-- Notice the import from "."

// Register a new user
export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/users/register', payload);
        return response.data;
    } catch (error) {
        // Axios wraps the error response in error.response
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error("An unexpected error occurred");
    }
};

// Login a user
export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/users/login', payload);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error("An unexpected error occurred");
    }
};

export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('/users/get-current-user');
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error("An unexpected error occurred");
    }
};