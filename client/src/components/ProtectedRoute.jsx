import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { GetCurrentUser as GetUserFromAPI } from '../apicalls/users';

function ProtectedRoute({ children }) {
    const [user, setUser] = useState(null);

    const validateUser = async () => {
        try {
            const response = await GetUserFromAPI();
            if (response.success) {
                setUser(response.data);
            }
            else {
                setUser(null);
                message.error(response.message || "Failed to fetch user data");
            }
        } catch (error) {
            setUser(null);
            message.error(error.message || "Failed to fetch user data");
        }
    }

    useEffect(() => {
        validateUser();
    }, [])

    return (
        user && <div>
            {user.name}
            {children}
        </div>
    )
}

export default ProtectedRoute