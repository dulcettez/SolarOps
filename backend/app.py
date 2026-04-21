from flask import Flask, request, jsonify
from flask_cors import CORS
from normal_inference import predict_normal_image
from thermal_inference import analyze_thermal_image
from db import save_prediction
from database.database import verify_user
import os
import uuid

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/predict/normal', methods=['POST'])
def predict_normal():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    filename = str(uuid.uuid4()) + "_" + file.filename
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    predictions = predict_normal_image(file_path)

    for p in predictions:
        save_prediction(
            filename=filename,
            file_path=file_path,
            defect_class=p['defect_class'],
            confidence=p['confidence'],
            uploaded_by=request.form.get('uploaded_by', 'unknown'),
            image_type='normal'
        )

    return jsonify({'predictions': predictions})


@app.route('/predict/thermal', methods=['POST'])
def predict_thermal():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    filename = file.filename
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    result = analyze_thermal_image(file_path)

    if result is None:
        return jsonify({'error': 'Could not analyze thermal image'}), 400


    save_prediction(
        filename=filename,
        file_path=file_path,
        defect_class=result['sev'],
        confidence=0.0,
        uploaded_by=request.form.get('uploaded_by', 'unknown'),
        image_type='thermal'
    )

    return jsonify({'result': result})


@app.route('/', methods=['GET'])
def health_check():
    return jsonify({'status': 'SolarOps backend is running ✅'})


@app.route('/login', methods=['POST'])
def login():
    data = request.json

    if verify_user(data['email']):
        return jsonify({"message": "Login success"})
    else:
        return jsonify({"error": "Invalid credentials"}), 401


if __name__ == '__main__':
    app.run(debug=True, port=5000)