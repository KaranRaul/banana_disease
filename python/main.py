from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import os

app = Flask(__name__)
CORS(app)

# Load model and class labels
model_path = r'D:\PRAGYAI\project\python\Banana-Leaf-Disease-Detection\banana_disease_model.h5'
train_data_path = r'D:\PRAGYAI\project\python\Banana-Leaf-Disease-Detection\BananaLSD\OriginalSet'

# Image parameters
img_height, img_width = 224, 224

# Load model
if os.path.exists(model_path):
    model = load_model(model_path)
    print("Model loaded successfully.")
else:
    raise FileNotFoundError(f"Model not found at {model_path}")

# Class labels (you may want to hardcode these if static)
class_labels = {0: "healthy", 1: "cordana", 2: "pestalotiopsis", 3: "sigatoka"}  # Example mapping

# Image preprocessing function
def load_and_preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(img_height, img_width))  # Resize
    img_array = image.img_to_array(img)  # Convert to array
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array /= 255.0  # Rescale to [0, 1]
    return img_array

# Flask route for prediction
@app.route('/detect', methods=['POST'])
def detect():
    data = request.json  # Expecting a JSON object with 'path'
    
    if 'path' not in data:
        return jsonify({'error': 'Path not provided'}), 400
    
    img_path = data['path']
    print(img_path)
    
    # Validate the image path
    if not os.path.exists(img_path):
        return jsonify({'error': 'Image path does not exist'}), 400

    try:
        # Preprocess the image
        img_array = load_and_preprocess_image(img_path)
        
        # Make prediction
        predictions = model.predict(img_array)
        predicted_class_index = np.argmax(predictions, axis=1)[0]
        predicted_label = class_labels.get(predicted_class_index, "Unknown")

        return jsonify({'disease': predicted_label})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True,port=5000)
