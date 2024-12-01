import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../context/authContext';
import { login, register } from '../api/auth.api';

const Auth = () => {
    const { login: loginContext } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = isRegister
                ? await register(email, password)
                : await login(email, password);
            loginContext(email, response.data.token);

            navigate("/");

        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    {isRegister ? 'Register' : 'Login'}
                </h2>
                {error && (
                    <p className="text-red-500 text-center text-sm mb-4">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-slate-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300"
                    >
                        {isRegister ? 'Register' : 'Login'}
                    </button>
                </form>
                <button
                    onClick={() => setIsRegister(!isRegister)}
                    className="w-full mt-4 text-blue-500 hover:underline text-sm"
                >
                    {isRegister ? 'Switch to Login' : 'Switch to Register'}
                </button>
            </div>
        </div>
    );
};

export default Auth;
