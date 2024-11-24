import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt
import os

# Paths
model_path = r'D:\PRAGYAI\project\python\Banana-Leaf-Disease-Detection\banana_disease_model.h5'
train_data_path = r'D:\PRAGYAI\project\python\Banana-Leaf-Disease-Detection\BananaLSD\OriginalSet'

# Image parameters
img_height, img_width = 224, 224
batch_size = 32

# Data generator
datagen = ImageDataGenerator(
    rescale=1.0 / 255,
    validation_split=0.2,  # Splits dataset for validation
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True
)

# Load model
if os.path.exists(model_path):
    model = load_model(model_path)
    print("Model loaded successfully.")
else:
    raise FileNotFoundError(f"Model not found at {model_path}")

# Generate data for training
train_generator = datagen.flow_from_directory(
    train_data_path,
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='categorical',  # Classification task
    subset='training'
)

# Class labels from generator
class_indices = train_generator.class_indices
class_labels = {v: k for k, v in class_indices.items()}  # Reverse mapping
print("Class labels:", class_labels)

# Image preprocessing function
def load_and_preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(img_height, img_width))  # Resize
    img_array = image.img_to_array(img)  # Convert to array
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array /= 255.0  # Rescale to [0, 1]
    return img_array

# Test images
img_path = r'D:\PRAGYAI\project\python\Banana-Leaf-Disease-Detection\BananaLSD\AugmentedSet\healthy\1_aug.jpeg'


img_array = load_and_preprocess_image(img_path)
predictions = model.predict(img_array)
predicted_class_index = np.argmax(predictions, axis=1)[0]
predicted_label = class_labels.get(predicted_class_index, "Unknown")
print(f"Predicted class for {img_path}: {predicted_label}")

# # Predictions
# plt.figure(figsize=(10, 5))
# for i, img_path in enumerate(test_image_paths):
#     if not os.path.exists(img_path):
#         print(f"File not found: {img_path}")
#         continue

#     img_array = load_and_preprocess_image(img_path)
#     predictions = model.predict(img_array)
#     predicted_class_index = np.argmax(predictions, axis=1)[0]
#     predicted_label = class_labels.get(predicted_class_index, "Unknown")

#     print(f"Predicted class for {img_path}: {predicted_label}")

#     # Display image with prediction
#     plt.subplot(1, len(test_image_paths), i + 1)
#     plt.imshow(image.load_img(img_path))  # Load original image
#     plt.title(predicted_label)
#     plt.axis('off')

# plt.tight_layout()
# plt.show()
