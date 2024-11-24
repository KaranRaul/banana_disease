import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            if (response.status === 200) {
                alert('Login successful!');
                localStorage.setItem('token', response.data.token); // Save token to localStorage
                navigate('/detect'); // Redirect to main page
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid credentials.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-300 via-yellow-200 to-green-400">
            <Header />
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)]">
                <h2 className="text-4xl font-bold text-green-800 animate-bounce">Login</h2>
                <form className="mt-8 w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
