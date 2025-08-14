import { axiosInstance } from ".";

// Add Movie
export const AddMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/movies/add", payload);
        return response.data;
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Update Movie
export const UpdateMovie = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`/api/movies/update/${id}`, payload);
        return response.data;
    } catch (error) {
        return { success: false, error: error.message };
    }
};
