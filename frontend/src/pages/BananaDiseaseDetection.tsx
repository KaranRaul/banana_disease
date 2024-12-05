import React, { useState, ChangeEvent, DragEvent } from "react";
import { FiUpload } from "react-icons/fi";
import Header from "../components/Header";

interface DiseaseInfo {
    disease: string | null;
    message: string | null;
}

const DetectDisease: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [diseaseInfo, setDiseaseInfo] = useState<DiseaseInfo | null>(null);
    const [error, setError] = useState<string>("");
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const diseaseMessages: Record<string, string> = {
        Healthy: "No disease detected. Your banana plant is healthy!",
        "Black Sigatoka":
            "A fungal disease that causes black streaks on leaves. Regular fungicide sprays can help control it.",
        Pestalotiopsis:
            "This disease causes brown spots and damages leaves. Immediate removal of infected parts is recommended.",
        Cordana:
            "A fungal disease leading to yellowing and wilting of leaves. Ensure proper sanitation and avoid overwatering.",
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setDiseaseInfo(null);
            setError("");
        }
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
            setDiseaseInfo(null);
            setError("");
        }
    };

    const handleDragOver = (e: DragEvent<HTMLLabelElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLLabelElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDetect = async (): Promise<void> => {
        if (!file) {
            setError("Please upload an image!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:5000/detect", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "An error occurred!");
                return;
            }

            const data = await response.json();
            setDiseaseInfo({
                disease: data.disease || "No disease detected",
                message: diseaseMessages[data.disease] || "No additional information available.",
            });
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold text-gray-800 text-center">Disease Detection</h1>
                    <p className="text-gray-600 text-center mb-6">
                        Upload an image of your banana plant leaf to detect diseases.
                    </p>
                    <div className="flex flex-col items-center mb-4">
                        <label
                            htmlFor="file-upload"
                            className={`flex items-center justify-center w-48 h-48 ${isDragging ? "bg-green-100" : "bg-green-50"
                                } border-2 border-dashed border-green-400 rounded-lg cursor-pointer`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
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
                                alt="Uploaded Banana Leaf"
                                className="w-48 h-48 object-cover rounded-md border border-green-400"
                            />
                        </div>
                    )}
                    <button
                        onClick={handleDetect}
                        className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 mt-4"
                    >
                        Detect Disease
                    </button>
                    {diseaseInfo && (
                        <div className="mt-6 bg-green-50 p-4 rounded-lg">
                            <h2 className="text-lg font-semibold text-green-800">
                                Disease Detected: {diseaseInfo.disease}
                            </h2>
                            <p className="text-gray-700 mt-2">{diseaseInfo.message}</p>
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

export default DetectDisease;
