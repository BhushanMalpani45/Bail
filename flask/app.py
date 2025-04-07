from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import re, string, joblib
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

# Define global variables
model = None
vectorizer = None
label_encoder = None

# Function to clean text - same as in your training code
def clean_text(text):
    text = str(text).lower()
    text = re.sub(r'\d+', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# Load the model and components at startup
def init_app():
    global model, vectorizer, label_encoder
    try:
        model = joblib.load('best_model.joblib')
        vectorizer = joblib.load('vectorizer.joblib')
        label_encoder = joblib.load('label_encoder.joblib')
        print("Model and components loaded successfully")
    except Exception as e:
        print(f"Error loading model components: {str(e)}")
        print("Make sure you've saved the model files before running the API")

# Initialize when the file is loaded
init_app()

# API endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if model components are loaded
        if model is None or vectorizer is None or label_encoder is None:
            return jsonify({
                'error': 'Model components not loaded. Check if model files exist.'
            }), 500
            
        # Get data from request
        data = request.get_json()
        description = data.get('description', '')
        
        # Clean and prepare input
        cleaned_desc = clean_text(description)
        
        # Vectorize the input
        vectorized = vectorizer.transform([cleaned_desc])
        
        # Make prediction
        prediction = model.predict(vectorized)[0]
        result = label_encoder.inverse_transform([prediction])[0]
        
        # Return result
        return jsonify({
            'description': description,
            'prediction': result
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    status = 'ok' if all([model, vectorizer, label_encoder]) else 'model not loaded'
    return jsonify({'status': status})

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)