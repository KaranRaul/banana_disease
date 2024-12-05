import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const Signup: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setSuccessMessage(""); // Clear previous success messages

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/auth/signup", {
                email,
                password,
            });

            if (response.status === 201) {
                setSuccessMessage("Signup successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000); // Navigate after 2 seconds
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Error signing up.");
        }
    };

    return (
        <div className="font-[sans-serif]">
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
                    <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
                        <form className="space-y-4" onSubmit={handleSignup}>
                            <div className="mb-8">
                                <h3 className="text-gray-800 text-3xl font-extrabold">
                                    Sign up
                                </h3>
                                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                                    Create an account and start your journey with us today.
                                </p>
                            </div>

                            {/* Display messages */}
                            {error && (
                                <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4">
                                    {error}
                                </div>
                            )}
                            {successMessage && (
                                <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm mb-4">
                                    {successMessage}
                                </div>
                            )}

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                                    placeholder="Enter password"
                                />
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">
                                    Confirm Password
                                </label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                                    placeholder="Confirm password"
                                />
                            </div>

                            <div className="!mt-8">
                                <button
                                    type="submit"
                                    className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                >
                                    Sign up
                                </button>
                            </div>

                            <p className="text-sm !mt-8 text-center text-gray-800">
                                Already have an account?
                                <a
                                    href="javascript:void(0);"
                                    onClick={() => navigate("/login")}
                                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                                >
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                    <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
                        <img
                            src="https://readymadeui.com/login-image.webp"
                            className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
                            alt="Signup Illustration"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
