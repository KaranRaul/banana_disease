import React, { useState } from 'react';
// import Header from '../components/Heade';
import Header from '../components/Header'

const DetectPage: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleDetect = async () => {

        const res = fetch('http://localhost:5000/', {
            method: 'GET'
        });

        // const da = await res.json();
        // setResult(data.disease || 'No disease detected');





        if (!image) return;

        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await fetch('http://localhost:5000/detect', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setResult(data.disease || 'No disease detected');
        } catch (error) {
            setResult('Error detecting disease');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-green-300 to-yellow-400">
            <Header />
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)]">
                <h2 className="text-4xl font-bold text-green-800 animate-bounce">
                    Upload an Image to Detect Banana Diseases
                </h2>
                <p className="mt-4 text-lg text-gray-800 text-center">
                    Upload a clear image of your banana plant to analyze its health.
                </p>
                <div className="mt-8">
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                    />
                </div>
                <button
                    onClick={handleDetect}
                    className="mt-6 px-6 py-3 bg-green-700 text-white text-lg rounded-lg shadow hover:bg-green-600"
                >
                    Detect Disease
                </button>
                {result && (
                    <div className="mt-6 p-4 bg-white border border-gray-300 rounded-lg shadow-md text-green-800">
                        <h3 className="text-2xl font-bold">Detection Result:</h3>
                        <p className="mt-2">{result}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetectPage;
