# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import tensorflow as tf
# import numpy as np
# from tensorflow.keras.preprocessing import image
# from io import BytesIO

# app = Flask(__name__)
# CORS(app)

# # Load pre-trained model
# MODEL_PATH = 'banana_disease_model.h5'
# classifier = tf.keras.models.load_model(MODEL_PATH)

# # Image dimensions
# IMG_HEIGHT, IMG_WIDTH = 224, 224

# # Class labels (update these based on your dataset)
# class_labels = {
#     0: 'Healthy',
#     1: 'Black Sigatoka',
#     2: 'Pestalotiopsis',
#     3: 'Cordana'
# }

# def load_and_preprocess_image(file):
#     img = image.load_img(BytesIO(file.read()), target_size=(IMG_WIDTH, IMG_HEIGHT))
#     # img_array = np.array(img) / 255.0  # Normalize
#     # img_array = np.expand_dims(img_array, axis=0)
#     # return img_array
#     img_array = image.img_to_array(img)  # Convert to array
#     img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
#     img_array /= 255.0  # Rescale to [0, 1] if that was done in the generator
#     return img_array

# @app.route('/', methods=['GET'])
# def index():
#     return 'Hello World!'

# @app.route('/detect', methods=['POST'])
# def detect():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file uploaded'}), 400

#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400

#     try:
#         # Preprocess the image
#         img_array = load_and_preprocess_image(file)

#         # Predict the disease
#         prediction = classifier.predict(img_array)
#         predicted_class_index = np.argmax(prediction, axis=1)[0]
#         predicted_class = class_labels.get(predicted_class_index, 'Unknown')

#         return jsonify({'disease': predicted_class})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)



from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from io import BytesIO

app = Flask(__name__)
CORS(app)

# Load pre-trained model
MODEL_PATH = 'banana_disease_model.h5'

# Ensure the model exists and is correctly loaded
try:
    classifier = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully.")
except Exception as e:
    raise FileNotFoundError(f"Could not load model: {e}")

# Image dimensions (must match the model's input shape)
IMG_HEIGHT, IMG_WIDTH = 224, 224

# Class labels (ensure they match the training script's labels)
class_labels = {
    0: 'Healthy',
    1: 'Black Sigatoka',
    2: 'Pestalotiopsis',
    3: 'Cordana'
}

def load_and_preprocess_image(file):
    """Load and preprocess the image for model prediction."""
    try:
        # Load the image file and resize it to the required dimensions
        img = image.load_img(BytesIO(file.read()), target_size=(IMG_HEIGHT, IMG_WIDTH))
        img_array = image.img_to_array(img)  # Convert to array
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        img_array /= 255.0  # Normalize pixel values to [0, 1]
        return img_array
    except Exception as e:
        raise ValueError(f"Error in image preprocessing: {e}")

@app.route('/', methods=['GET'])
def index():
    return 'Welcome to Banana Disease Detection API!'

@app.route('/detect', methods=['POST'])
def detect():
    """Endpoint to detect banana leaf disease."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Preprocess the image
        img_array = load_and_preprocess_image(file)

        # Make a prediction
        prediction = classifier.predict(img_array)
        predicted_class_index = np.argmax(prediction, axis=1)[0]
        predicted_class = class_labels.get(predicted_class_index, 'Unknown')

        # Debugging: Log the prediction scores
        print(f"Prediction scores: {prediction}")

        return jsonify({'disease': predicted_class})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
