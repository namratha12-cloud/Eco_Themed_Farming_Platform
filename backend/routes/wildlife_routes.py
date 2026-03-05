# backend/routes/wildlife_routes.py
import os
# pyre-ignore[21]  # Flask may not be in type checking environment
from flask import Blueprint, request, jsonify
# pyre-ignore[21]  # Ultralytics may not be in type checking environment
from ultralytics import YOLO
from datetime import datetime

wildlife_bp = Blueprint("wildlife", __name__)

# Load models
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# Classification model for higher variety of animals (Monkey, Boar, Deer, etc.)
cls_model_path = os.path.join(ROOT_DIR, "yolov8n-cls.pt")
# Detection model for counting and common animals
det_model_path = os.path.join(ROOT_DIR, "yolov8n.pt")

cls_model = YOLO(cls_model_path)
det_model = YOLO(det_model_path)

@wildlife_bp.post("/detect-wildlife")
def detect_wildlife():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]
    upload_dir = os.path.join(ROOT_DIR, "backend", "uploads")
    os.makedirs(upload_dir, exist_ok=True)
    
    image_path = os.path.join(upload_dir, f"temp_wildlife_{datetime.now().strftime('%H%M%S')}.jpg")
    image.save(image_path)

    # 1. Try Detection first for count/location of common animals
    det_results = det_model(image_path)
    
    # Mapping for Detection Model (COCO)
    det_mapping = {
        "elephant": "Elephant",
        "bird": "Unknown", # Could be mapped to a specific key if added
        "bear": "Unknown",
        "cow": "Unknown",
        "horse": "Unknown",
        "sheep": "Unknown",
        "dog": "Unknown",
        "cat": "Unknown"
    }

    best_det = None
    count = 0
    
    if len(det_results) > 0:
        r = det_results[0]
        # Filter for animals in COCO (15-24)
        animal_classes = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
        animal_detections = [box for box in r.boxes if int(box.cls) in animal_classes]
        
        if animal_detections:
            count = len(animal_detections)
            # Take highest confidence one
            top_box = max(animal_detections, key=lambda x: float(x.conf))
            cls_id = int(top_box.cls)
            label = r.names[cls_id]
            best_det = {
                "animal": det_mapping.get(label, "Unknown"),
                "confidence": int(float(top_box.conf) * 100),
                "count": count
            }

    # 2. Use Classification for more specific animals if Detection is unclear or "Unknown"
    cls_results = cls_model(image_path)
    index = cls_results[0].probs.top1
    cls_conf = float(cls_results[0].probs.top1conf)
    raw_cls_label = cls_results[0].names[index]

    animal_mapping = {
        "wild boar": "Wild Boar", "boar": "Wild Boar", "hog": "Wild Boar", "pig": "Wild Boar",
        "elephant": "Elephant", "tusker": "Elephant",
        "monkey": "Monkey", "baboon": "Monkey", "macaque": "Monkey", "chimpanzee": "Monkey", "gorilla": "Monkey",
        "deer": "Deer", "fallow deer": "Deer", "impala": "Deer", "gazelle": "Deer", "elk": "Deer", "moose": "Deer",
        "tiger": "Tiger", "lion": "Lion", "leopard": "Leopard", "cheetah": "Leopard",
        "bear": "Bear", "wolf": "Wolf", "fox": "Fox", "bird": "Bird"
    }

    detected_via_cls = "Unknown"
    for key, val in animal_mapping.items():
        if key in raw_cls_label.lower():
            detected_via_cls = val
            break

    # Decision Logic:
    # If Detection found a specific animal (like Elephant), use it.
    # Otherwise use Classification result if it found something specific.
    final_animal = "Unknown"
    final_conf = int(cls_conf * 100)
    
    if best_det is not None and best_det.get("animal") != "Unknown":
        final_animal = best_det["animal"]
        final_conf = best_det["confidence"]
    elif detected_via_cls != "Unknown":
        final_animal = detected_via_cls
        final_conf = int(cls_conf * 100)
        # Count is still 0 from detection, let's say 1 if classification found something
        count = 1 if count == 0 else count
    else:
        # Both "Unknown", use detection count if any
        count = count if count > 0 else 1

    threat_map = {
        "Wild Boar": "high",
        "Elephant": "high",
        "Monkey": "medium",
        "Deer": "low",
        "Unknown": "low"
    }

    # Cleanup
    try:
        os.remove(image_path)
    except:
        pass

    return jsonify({
        "animal": str(final_animal),
        "raw_label": str(raw_cls_label if final_animal == "Unknown" else ""),
        "confidence": int(final_conf),
        "threatLevel": str(threat_map.get(str(final_animal), "medium")),
        "count": int(count)
    })
