from ultralytics import YOLO
import os

# ==========================================
# LOAD BOTH MODELS
# ==========================================

# Normal image model (downloaded from Google Drive)
NORMAL_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models/solar_yolov9_normal_finetuned.pt')

# Load model once when the backend starts
try:
    normal_model = YOLO(NORMAL_MODEL_PATH)
    print("Normal model loaded successfully")
except Exception as e:
    print(f"Error loading normal model: {e}")
    normal_model = None


# ==========================================
# PREDICTION FUNCTION
# ==========================================

def predict_normal_image(image_path):
    """
    Takes a normal solar panel image path and returns prediction results.

    Args:
        image_path (str): Path to the uploaded image

    Returns:
        dict: Prediction results including defect class, confidence, coverage
    """
    if normal_model is None:
        return {"error": "Model not loaded"}

    results = normal_model.predict(source=image_path, conf=0.25, verbose=False)

    predictions = []
    for result in results:
        if result.boxes and len(result.boxes) > 0:
            defect_class = normal_model.names[int(result.boxes.cls[0])]
            confidence = float(result.boxes.conf[0])
            coverage = calculate_coverage(result)
        else:
            defect_class = "No Defect Detected"
            confidence = 0.0
            coverage = 0.0

        predictions.append({
            "defect_class": defect_class,
            "confidence": round(confidence * 100, 2),
            "coverage": coverage
        })

    return predictions


# ==========================================
# COVERAGE CALCULATION
# ==========================================

def calculate_coverage(result):
    """Calculates defect coverage ratio over total panel area."""
    panel_area = 0
    defect_area = 0

    if result.masks is not None:
        for i, mask in enumerate(result.masks.data):
            cls = int(result.boxes.cls[i])
            label = result.names[cls]
            mask_pixels = mask.sum().item()

            if label in ['Defective', 'Non-Defective']:
                panel_area = max(panel_area, mask_pixels)
            elif label in ['Dusty', 'Bird-drop', 'Electrical-Damage', 'Physical-Damage']:
                defect_area += mask_pixels

    if panel_area > 0:
        return round((defect_area / panel_area) * 100, 2)
    return 0.0

