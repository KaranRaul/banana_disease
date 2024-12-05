import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = Boolean(localStorage.getItem("token"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="bg-white border-gray-200  shadow-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    {/* <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        alt="Logo"
                        className="h-8 mr-3"
                    /> */}
                    <span className="text-2xl font-semibold text-gray-900 ">
                        Banana Project
                    </span>
                </div>
                <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
                    {!isLoggedIn ? (
                        <>
                            <button
                                onClick={() => navigate("/login")}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate("/signup")}
                                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
                            >
                                Signup
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
                        >
                            Logout
                        </button>
                    )}
                </div>
                <div
                    className="hidden md:flex md:w-auto md:order-1"
                    id="navbar-cta"
                >
                    <ul className="flex flex-col md:flex-row md:space-x-8 font-medium">
                        <li>
                            <button
                                onClick={() => navigate("/detect")}
                                className="text-gray-900 py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 "
                            >
                                Disease Detection
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/crop")}
                                className="text-gray-900 py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 "
                            >
                                Crop Grading
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
