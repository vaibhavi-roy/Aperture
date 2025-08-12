import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/usersSlice';
import { hideGlobalLoader, showGlobalLoader } from '../redux/loadersSlice';

function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); // Add a loading state
    const navigate = useNavigate();

    const getCurrentUser = async () => {
        try {
            dispatch(showGlobalLoader());
            const response = await GetCurrentUser();
            dispatch(hideGlobalLoader());

            if (response.success) {
                // setUser(response.data);
                dispatch(setUser(response.data));
            } else {
                // If the API call fails (e.g., bad token), redirect to login
                dispatch(setUser(null));
                message.error(response.message);
                navigate('/login');
            }
        } catch (error) {
            dispatch(setUser(null));
            message.error(error.message);
            navigate('/login');
            dispatch(hideGlobalLoader());

        } finally {
            setLoading(false); // Stop loading regardless of outcome
        }
    }

    useEffect(() => {
        // Only run if there is a token
        if (localStorage.getItem('token')) {
            getCurrentUser();
        } else {
            // If no token, no need to call API, just redirect
            navigate('/login');
            setLoading(false);
        }
    }, []);

    // Conditionally render based on the user and loading states
    if (loading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    // This check is crucial. Only render children if the user object is valid.
    if (user) {
        return (
            <div>
                {/* Now it's safe to access user.name */}
                <h1>Welcome, {user.name}</h1>
                <hr />
                {children}
            </div>
        )
    }

    // If not loading and no user, it implies a redirect has already been triggered.
    // Returning null prevents any further rendering attempts.
    return null;
}

export default ProtectedRoute;