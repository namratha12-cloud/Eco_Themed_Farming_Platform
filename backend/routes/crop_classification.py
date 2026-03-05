from flask import Blueprint, request, jsonify  # pyre-ignore[21]
from ultralytics import YOLO  # pyre-ignore[21]
import os

crop_classify = Blueprint("crop_classify", __name__)

# Load model once when server starts
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
model_path = os.path.join(ROOT_DIR, "backend", "models", "crops_classification", "best.pt")

if not os.path.exists(model_path):
    # fallback to the one in root if custom one missing
    model_path = os.path.join(ROOT_DIR, "yolov8s-cls.pt")
    if not os.path.exists(model_path):
        model_path = "yolov8n-cls.pt"

model = YOLO(model_path)

@crop_classify.route("/classify", methods=["POST"])
def classify_crop():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]
    image_path = "temp_image.jpg"
    image.save(image_path)

    results = model(image_path)

    # best class index & confidence
    index = results[0].probs.top1
    confidence = float(results[0].probs.top1conf)

    # Map index → label
    label = results[0].names[index]

    return jsonify({
        "label": label,
        "class_id": index,
        "confidence": confidence
    })