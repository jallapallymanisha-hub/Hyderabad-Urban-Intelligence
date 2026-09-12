from ultralytics import YOLO

# YOLO model
model = YOLO("src/garbage_ai/best.pt")

# COCO classes that can represent visible waste
GARBAGE_CLASSES = {
   "glass",
   "paper",
   "plastic",
   "trash"
}


def detect_garbage(image_path):

    results = model.predict(
        source=image_path,
        conf=0.10
    )

    detections = []

    for result in results:

        for box in result.boxes:

            class_id = int(box.cls[0])

            label = result.names[class_id]

            if label in GARBAGE_CLASSES:

                confidence = float(box.conf[0])

                x1, y1, x2, y2 = box.xyxy[0].tolist()

                detections.append({
                    "label": "garbage",
                    "object": label,
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
    print("Garbage AI detector is ready.")