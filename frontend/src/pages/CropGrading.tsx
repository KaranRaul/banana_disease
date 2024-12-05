import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import Header from "../components/Header";

interface Prediction {
    ripeness: string;
}

const CropGrading: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [prediction, setPrediction] = useState<Prediction | null>(null);
    const [error, setError] = useState<string>("");

    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (!localStorage.getItem("token")) {
    //         navigate("/login");
    //     }
    // }, [])
    // useEffect(() => {
    //     if (!file) return;
    //     handleUpload();

    // },)
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setPrediction(null);
            setError("");
        }
    };

    const handleUpload = async (): Promise<void> => {
        if (!file) {
            setError("Please upload an image!");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setPrediction(response.data);
        } catch (err: any) {
            setError(err.response?.data?.error || "Something went wrong!");
        }
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold text-gray-800 text-center">Banana Grading</h1>
                    <p className="text-gray-600 text-center mb-6">
                        Upload an image to determine the ripeness of your banana.
                    </p>
                    <div className="flex flex-col items-center mb-4">
                        <label
                            htmlFor="file-upload"
                            className="flex items-center justify-center w-48 h-48 bg-green-50 border-2 border-dashed border-green-400 rounded-lg cursor-pointer"
                        >
                            <FiUpload className="text-green-500 text-3xl" />
                            <span className="text-green-600 text-sm mt-2">Upload Image</span>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {file && (
                        <div className="flex flex-col items-center">
                            <p className="text-gray-700 text-sm mb-4">Selected file: {file.name}</p>
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Uploaded Banana"
                                className="w-48 h-48 object-cover rounded-md border border-green-400"
                            />
                        </div>
                    )}
                    <button
                        onClick={handleUpload}
                        className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 mt-4"
                    >
                        Upload and Predict
                    </button>
                    {prediction && (
                        <div className="mt-6 bg-green-50 p-4 rounded-lg">
                            <h2 className="text-lg font-semibold text-green-800">
                                Ripeness: {prediction.ripeness}
                            </h2>
                        </div>
                    )}
                    {error && (
                        <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CropGrading;
// import React, { useState, ChangeEvent } from "react";
// import axios from "axios";
// import { FiUpload } from "react-icons/fi";
// import Header from "../components/Header";

// interface Prediction {
//     image: string;
//     label: string;
// }

// const CropGrading: React.FC = () => {
//     const [files, setFiles] = useState<File[]>([]);
//     const [predictions, setPredictions] = useState<Prediction[]>([]);
//     const [error, setError] = useState<string>("");

//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
//         if (e.target.files) {
//             setFiles(Array.from(e.target.files)); // Convert FileList to Array
//             setPredictions([]);
//             setError("");
//         }
//     };

//     const handleUpload = async (): Promise<void> => {
//         if (files.length === 0) {
//             setError("Please upload at least one image!");
//             return;
//         }

//         const formData = new FormData();
//         files.forEach((file) => {
//             formData.append("images", file);
//         });

//         try {
//             const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             setPredictions(response.data.predictions);
//         } catch (err: any) {
//             setError(err.response?.data?.error || "Something went wrong!");
//         }
//     };

//     return (
//         <div>
//             <Header />
//             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//                 <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//                     <h1 className="text-2xl font-bold text-gray-800 text-center">Banana Grading</h1>
//                     <p className="text-gray-600 text-center mb-6">
//                         Upload images to determine the labels of your bananas.
//                     </p>
//                     <div className="flex flex-col items-center mb-4">
//                         <label
//                             htmlFor="file-upload"
//                             className="flex items-center justify-center w-48 h-48 bg-green-50 border-2 border-dashed border-green-400 rounded-lg cursor-pointer"
//                         >
//                             <FiUpload className="text-green-500 text-3xl" />
//                             <span className="text-green-600 text-sm mt-2">Upload Images</span>
//                             <input
//                                 id="file-upload"
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleFileChange}
//                                 multiple
//                                 className="hidden"
//                             />
//                         </label>
//                     </div>
//                     {files.length > 0 && (
//                         <div className="mb-4">
//                             <p className="text-gray-700 text-sm">Selected files:</p>
//                             <ul>
//                                 {files.map((file, idx) => (
//                                     <li key={idx} className="text-gray-700 text-sm">{file.name}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}
//                     <button
//                         onClick={handleUpload}
//                         className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 mt-4"
//                     >
//                         Upload and Predict
//                     </button>
//                     {predictions.length > 0 && (
//                         <div className="mt-6 bg-green-50 p-4 rounded-lg">
//                             <h2 className="text-lg font-semibold text-green-800">Predictions:</h2>
//                             {predictions.map((prediction, idx) => (
//                                 <div key={idx} className="mt-2">
//                                     <p>
//                                         <strong>Image:</strong> {prediction.image}
//                                     </p>
//                                     <p>
//                                         <strong>Label:</strong> {prediction.label}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                     {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CropGrading;
