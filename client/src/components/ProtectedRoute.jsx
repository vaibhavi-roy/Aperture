import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { GetCurrentUser as GetUserFromAPI } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const validateToken = async () => {
        try {
            const response = await GetUserFromAPI();
            if (response.success) {
                setUser(response.data);
            } else {
                // Server-side failure (e.g., token invalid)
                localStorage.removeItem('token');
                navigate('/login');
                message.error(response.message);
            }
        } catch (error) {
            // Catches the THROWN error from the API call (e.g., 401 Unauthorized)
            localStorage.removeItem('token'); // Clear the invalid token
            navigate('/login');
            message.error(error.message || 'You must be logged in to access this page.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            validateToken();
        } else {
            // No token exists, immediately redirect.
            navigate('/login');
            setLoading(false);
        }
    }, []);

    // Show a loading indicator while validating
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render the children only if we have a valid user and are done loading
    return user && !loading ? children : null;
}

export default ProtectedRoute;