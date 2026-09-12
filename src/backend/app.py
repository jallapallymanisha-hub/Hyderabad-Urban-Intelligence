import sys
from pathlib import Path
import os
import random
import uuid

sys.path.append(str(Path(__file__).resolve().parents[2]))

from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from ultralytics import YOLO


# Vehicle detection model
vehicle_model = YOLO("yolo11n.pt")


app = Flask(__name__)
CORS(app)


def calculate_congestion(vehicle_count, average_speed):
    """
    Calculate traffic congestion score from 0 to 100.
    Higher score = more congestion.
    """

    vehicle_score = min((vehicle_count / 100) * 60, 60)

    speed_score = max((40 - average_speed) / 40 * 40, 0)

    score = vehicle_score + speed_score

    return round(min(score, 100), 2)


# -----------------------------------
# HOME
# -----------------------------------

@app.route("/")
def home():
    return jsonify({
        "message": "Hyderabad Urban Intelligence Backend is running"
    })


# -----------------------------------
# VEHICLE DETECTION
# -----------------------------------

@app.route("/api/vehicle-detect", methods=["POST"])
def vehicle_detect():

    if "image" not in request.files:
        return jsonify({
            "error": "No image uploaded"
        }), 400

    image = request.files["image"]

    temp_path = "vehicle_camera.jpg"

    image.save(temp_path)

    results = vehicle_model.predict(
        source=temp_path,
        conf=0.25
    )

    vehicles = []

    vehicle_classes = {
        2: "car",
        3: "motorcycle",
        5: "bus",
        7: "truck"
    }

    for result in results:

        for box in result.boxes:

            class_id = int(box.cls[0])

            if class_id in vehicle_classes:

                confidence = float(box.conf[0])

                vehicles.append({
                    "label": vehicle_classes[class_id],
                    "confidence": round(
                        confidence * 100,
                        2
                    ),
                    "box": [
                        round(x, 2)
                        for x in box.xyxy[0].tolist()
                    ]
                })

    return jsonify({
        "vehicle_count": len(vehicles),
        "vehicles": vehicles
    })


# -----------------------------------
# TRAFFIC DATA
# -----------------------------------

@app.route("/api/traffic")
def traffic():

    vehicle_count = random.randint(20, 100)

    average_speed = random.randint(10, 45)

    congestion_score = calculate_congestion(
        vehicle_count,
        average_speed
    )

    if congestion_score < 30:

        level = "Low"

    elif congestion_score < 60:

        level = "Moderate"

    elif congestion_score < 80:

        level = "High"

    else:

        level = "Severe"

    return jsonify({

        "city": "Hyderabad",

        "vehicle_count": vehicle_count,

        "average_speed": average_speed,

        "congestion_score": congestion_score,

        "congestion_level": level
    })
@app.route("/api/garbage-detect", methods=["POST"])
def garbage_detect():

        from src.garbage_ai.garbage_detector import detect_garbage

        if "image" not in request.files:

            return jsonify({
                "error": "No image uploaded"
            }), 400

        image = request.files["image"]

        filename = f"{uuid.uuid4().hex}_{image.filename}"

        image_path = os.path.join(
            "src",
            "garbage_ai",
            filename
        )

        image.save(image_path)

        detections = detect_garbage(image_path)

        return jsonify({
            "garbage_count": len(detections),
            "detections": detections
        })
# -----------------------------------
# POTHOLE DETECTION
# -----------------------------------

@app.route("/api/pothole-detect", methods=["POST"])
def pothole_detect():

    from src.pothole_ai.pothole_detector import detect_potholes

    if "image" not in request.files:

        return jsonify({
            "error": "No image uploaded"
        }), 400

    image = request.files["image"]

    filename = f"{uuid.uuid4().hex}_{image.filename}"

    image_path = os.path.join(
        "src",
        "pothole_ai",
        filename
    )

    image.save(image_path)

    detections = detect_potholes(
        image_path
    )

    return jsonify({

        "detections": detections,

        "image": "/api/pothole-result"
    })


# -----------------------------------
# POTHOLE RESULT
# -----------------------------------

@app.route("/api/pothole-result")
def pothole_result():

    image_path = os.path.join(

        os.path.dirname(
            os.path.dirname(
                os.path.dirname(__file__)
            )
        ),

        "runs",
        "detect",
        "predict",
        "Pothole.jpg"
    )

    return send_file(

        image_path,

        mimetype="image/jpeg"
    )


# -----------------------------------
# START FLASK
# -----------------------------------

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=False
    )