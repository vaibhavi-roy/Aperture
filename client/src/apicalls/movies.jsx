import { axiosInstance } from ".";

// Add Movie
export const AddMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/movies/add", payload);
        return response.data;
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Get All Movies
export const GetAllMovies = async () => {
    try {
        const response = await axiosInstance.get("/movies/get-all-movies");
        return response.data;
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Update Movie
export const UpdateMovie = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`/movies/update/${id}`, payload);
        return response.data;
    } catch (error) {
        return { success: false, error: error.message };
    }
};


// Delete Movie
export const DeleteMovie = async (id) => {
    try {
        const response = await axiosInstance.delete(`/movies/delete/${id}`);
        return response.data;
    } catch (error) {
        return { success: false, error: error.message };
    }
}