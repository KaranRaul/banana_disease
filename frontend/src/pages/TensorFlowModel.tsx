import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const TensorFlowModel = () => {
    const [model, setModel] = useState<any>();
    const [prediction, setPrediction] = useState<any>(null);

    useEffect(() => {
        // Function to load the model
        const loadModel = async () => {
            try {
                // Use the model URL from the public folder
                const modelUrl = `../../public/tfjs_model_directory/model.json`;

                // console.log(modelUrl)
                const loadedModel = await tf.loadGraphModel(modelUrl);
                setModel(loadedModel);
                // console.log('Model loaded successfully');
            } catch (error) {
                console.error('Error loading model:', error);
            }
        };

        loadModel();
    }, []);

    // Function to make predictions (example with dummy data)
    const makePrediction = async () => {
        if (!model) {
            console.error('Model not loaded yet!');
            return;
        }
        console.log();

        // Example input tensor (replace with actual input data)
        // const inputTensor = tf.tensor([-1, 224, 224, 3]); // Adjust based on your model's input shape
        // const prediction = model.predict(inputTensor);
        // setPrediction(await prediction.dataSync());
        // prediction.print(); // For debugging
    };

    return (
        <div>
            <h1>TensorFlow.js in React</h1>
            <button onClick={makePrediction} disabled={!model}>
                Make Prediction
            </button>
            {prediction && (
                <div>
                    <h2>Prediction Result:</h2>
                    <pre>{JSON.stringify(prediction, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default TensorFlowModel;
