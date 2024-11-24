import React from 'react';
import { useNavigate } from 'react-router-dom';
import png from '../assets/banana-tree.png'
import Header from '../components/Header';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-300 via-yellow-200 to-green-400">
            <Header />
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)]">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-green-800 animate-bounce">
                        Detect Banana Diseases with AI!
                    </h2>
                    <p className="mt-4 text-lg text-gray-800">
                        Upload an image of your banana plant and get insights into its health instantly.
                    </p>
                </div>

                {/* Banana Graphic */}
                <div className="relative w-64 h-64 mt-8">
                    <img
                        src={png} // Replace with your preferred banana image URL
                        alt="Banana"
                        className="w-full h-full animate-spin-slow"
                    />
                </div>

                {/* Call to Action */}
                <button
                    onClick={() => navigate('/signup')}
                    className="mt-10 px-6 py-3 bg-green-700 text-white text-lg rounded-lg shadow hover:bg-green-600"
                >
                    Get Started
                </button>
            </div>

            {/* Footer */}
            {/* <footer className="py-4 text-center bg-green-700 text-white">
                © 2024 Banana Disease Detection. All rights reserved.
            </footer> */}
        </div>
    );
};

export default LandingPage;
