import React from 'react';
import { Form, message, Input } from 'antd';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';

function Login() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await LoginUser(values);
            if (response.success) {
                message.success(response.message);
                localStorage.setItem('token', response.data);
                window.location.href = "/";
            } else {
                // Always show the message from the backend on failure
                message.error(response.message);

                if (response.userDoesNotExist) {
                    navigate('/register');
                }
            }
        } catch (error) {
            // Show backend error message, or a generic one if not available
            message.error(error.message || 'Something went wrong');
        }
    };

    return (
        <div className='flex justify-center h-screen items-center bg-primary'>
            <div className='card p-3 w-500'>
                <h1 className='text-xl mb-2'>
                    Aperture - Login
                </h1>
                <hr />

                <Form layout="vertical" className='mt-2' onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input type="email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <div className='flex flex-col mt-2 gap-1'>
                        <Button fullWidth type='submit' title='Login' />
                        <Link to="/register" className='text-primary text-center'>
                            Don't have an account? Register
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;