import { message } from 'antd';
import React, { useEffect } from 'react';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/usersSlice';
import { hideGlobalLoader, showGlobalLoader } from '../redux/loadersSlice';

function ProtectedRoute({ children }) {
    // Get user from the global Redux store
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getCurrentUser = async () => {
        try {
            dispatch(showGlobalLoader());
            const response = await GetCurrentUser();
            dispatch(hideGlobalLoader());

            if (response.success) {
                // Dispatch the user data to the Redux store
                dispatch(setUser(response.data));
            } else {
                // If token is invalid, clear user from store and local storage
                dispatch(setUser(null));
                localStorage.removeItem("token");
                message.error(response.message);
                navigate('/login');
            }
        } catch (error) {
            dispatch(hideGlobalLoader());
            dispatch(setUser(null));
            localStorage.removeItem("token");
            message.error(error.message);
            navigate('/login');
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            // If we have a token but no user in the store, fetch the user
            if (!user) {
                getCurrentUser();
            }
        } else {
            // If no token, redirect to login
            navigate('/login');
        }
    }, [user, navigate]); // Rerun if user or navigate function changes

    // Render the children only if the user object exists in the Redux store
    if (user) {
        return (
            <div>
                <h1>Welcome, {user.name}</h1>
                <hr />
                {children}
            </div>
        )
    }

    // Return null while authentication is in progress or redirecting
    return null;
}

export default ProtectedRoute;