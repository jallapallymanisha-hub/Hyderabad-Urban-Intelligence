from ultralytics import YOLO

# Pothole detection model
MODEL_URL = "https://huggingface.co/peterhdd/pothole-detection-yolov8/resolve/main/best.pt"

model = YOLO(MODEL_URL)


def detect_potholes(image_path):
    results = model.predict(
        source=image_path,
        conf=0.25,
        save=True
    )

    detections = []

    for result in results:
        for box in result.boxes:
            confidence = float(box.conf[0])

            x1, y1, x2, y2 = box.xyxy[0].tolist()

            detections.append({
                "label": "pothole",
                "confidence": round(confidence * 100, 2),
                "box": [
                    round(x1, 2),
                    round(y1, 2),
                    round(x2, 2),
                    round(y2, 2)
                ]
            })

    return detections


if __name__ == "__main__":
    print("Pothole AI detector is ready.")