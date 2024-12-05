from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
from io import BytesIO
import os

app = Flask(__name__)
CORS(app)

# Paths to the models
MODEL_PATH1 = 'banana_disease_model.h5'
MODEL_PATH2 = 'test.h5'

# Load the first model (banana disease detection)
try:
    classifier = tf.keras.models.load_model(MODEL_PATH1)
    print("Model 1 (Banana Disease Detection) loaded successfully.")
except Exception as e:
    raise FileNotFoundError(f"Could not load Model 1: {e}")

# Load the second model (additional predictions)
try:
    model2 = tf.keras.models.load_model(MODEL_PATH2)
    print("Model 2 loaded successfully.")
except Exception as e:
    raise FileNotFoundError(f"Could not load Model 2: {e}")

# Image dimensions (ensure they match the models' input shape)
IMG_HEIGHT, IMG_WIDTH = 224, 224

# Class labels for the first model
class_labels = {
    0: 'Cordana',
    1: 'Healthy',
    2: 'Pestalotiopsis',
    3: 'Black Sigatoka',
}

# Class labels for the second model
label_map = {
    0: 'Label_1',
    1: 'Label_2',
    2: 'Label_3',
    3: 'Label_4',
    4: 'Label_5',
    5: 'Label_6',
    6: 'Label_7',
    7: 'Label_8',
}


def load_and_preprocess_image(file):
    """Load and preprocess an image for prediction."""
    try:
        # Open and resize the image
        img = Image.open(file)
        img = img.resize((IMG_WIDTH, IMG_HEIGHT))
        img_array = img_to_array(img) / 255.0  # Normalize to [0, 1]
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        return img_array
    except Exception as e:
        raise ValueError(f"Error in image preprocessing: {e}")


@app.route('/', methods=['GET'])
def index():
    return 'Welcome to the Banana Disease Detection API!'


@app.route('/detect', methods=['POST'])
def detect():
    if 'file' not in request.files:
        app.logger.error('No file part in the request')
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        app.logger.error('No selected file')
        return jsonify({'error': 'No selected file'}), 400

    try:
        img_array = load_and_preprocess_image(file)
        prediction = classifier.predict(img_array)
        predicted_class_index = np.argmax(prediction, axis=1)[0]
        predicted_class = class_labels.get(predicted_class_index, 'Unknown')

        app.logger.info(f"Prediction: {prediction}")
        return jsonify({'disease': predicted_class})
    except Exception as e:
        app.logger.error(f"Error in detection: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/predict', methods=['POST'])
def predict():
    """Endpoint to make predictions using the second model and determine banana ripeness."""
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']

    try:
        # Preprocess the image
        img_array = load_and_preprocess_image(file)

        # Make prediction
        predictions = model2.predict(img_array)
        predicted_class = int(np.argmax(predictions))  # Convert to native int
        predicted_label = label_map.get(predicted_class, 'Unknown')

        # Determine ripeness based on predicted label
        ripeness = None
        if 0 <= predicted_class <= 4:
            ripeness = "Raw"
        elif 5 >= predicted_class <= 6:
            ripeness = "Pefectly ripe"
        elif  7 >= predicted_class:
            ripeness = "Overripe"

        # Debugging: Log the prediction scores
        print(f"Prediction scores (Model 2): {predictions}")

        return jsonify({
            "ripeness": ripeness,
            # "confidence_scores": predictions.tolist()  # Convert numpy array to list
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
if __name__ == '__main__':
    app.run(debug=True, port=5000)


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import tensorflow as tf
# import numpy as np
# from tensorflow.keras.preprocessing.image import img_to_array
# from PIL import Image
# import os

# app = Flask(__name__)
# CORS(app)

# # Paths to the models
# MODEL_PATH2 = 'test.h5'

# # Load the second model (banana ripeness prediction)
# try:
#     model2 = tf.keras.models.load_model(MODEL_PATH2)
#     print("Model loaded successfully.")
# except Exception as e:
#     raise FileNotFoundError(f"Could not load model: {e}")

# # Image dimensions
# IMG_HEIGHT, IMG_WIDTH = 224, 224

# # Class labels for the model
# label_map = {
#     0: 'Label_1',
#     1: 'Label_2',
#     2: 'Label_3',
#     3: 'Label_4',
#     4: 'Label_5',
#     5: 'Label_6',
#     6: 'Label_7',
#     7: 'Label_8',
# }


# def load_and_preprocess_image(file):
#     """Load and preprocess an image for prediction."""
#     try:
#         img = Image.open(file)
#         img = img.resize((IMG_WIDTH, IMG_HEIGHT))
#         img_array = img_to_array(img) / 255.0  # Normalize to [0, 1]
#         img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
#         return img_array
#     except Exception as e:
#         raise ValueError(f"Error in image preprocessing: {e}")

# @app.route('/predict', methods=['POST'])
# def predict():
#     """Endpoint to make predictions on multiple images and return labels directly."""
#     if 'images' not in request.files:
#         return jsonify({"error": "No images uploaded"}), 400

#     files = request.files.getlist('images')
#     predictions = []

#     for file in files:
#         try:
#             # Preprocess the image
#             img_array = load_and_preprocess_image(file)

#             # Make prediction
#             prediction_scores = model2.predict(img_array)
#             predicted_class = int(np.argmax(prediction_scores))
#             predicted_label = label_map.get(predicted_class, 'Unknown')

#             predictions.append({
#                 "image": file.filename,
#                 "label": predicted_label
#             })

#         except Exception as e:
#             predictions.append({
#                 "image": file.filename,
#                 "error": str(e)
#             })

#     return jsonify({"predictions": predictions})


# if __name__ == '__main__':
#     app.run(debug=True, port=5000)
