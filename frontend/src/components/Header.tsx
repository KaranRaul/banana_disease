import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="flex justify-between items-center p-6 bg-green-600 shadow-lg">
            <h1
                className="text-3xl font-bold text-white cursor-pointer"
                onClick={() => navigate('/')}
            >
                Banana Disease Detection
            </h1>
            <nav>
                <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-green-600 bg-white rounded-lg shadow hover:bg-gray-200 mx-2"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 text-white bg-green-800 rounded-lg shadow hover:bg-green-700 mx-2"
                >
                    Signup
                </button>
            </nav>
        </header>
    );
};

export default Header;
