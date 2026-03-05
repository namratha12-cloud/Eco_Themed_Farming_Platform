# pyre-ignore-all-errors
import os
import numpy as np  # pyre-ignore[21]
from PIL import Image  # pyre-ignore[21]
from ultralytics import YOLO  # pyre-ignore[21]

# Create a small dummy dataset to demonstrate training
dataset_path = os.path.abspath("dummy_dataset")
for split in ["train", "val"]:
    for crop in ["wheat", "corn"]:
        path = os.path.join(dataset_path, split, crop)
        os.makedirs(path, exist_ok=True)
        # Create 2 dummy images per class
        for i in range(2):
            img = np.random.randint(0, 255, (224, 224, 3), dtype=np.uint8)
            im = Image.fromarray(img)
            im.save(os.path.join(path, f"dummy_{i}.jpg"))

print(f"Created dummy dataset at {dataset_path}")

# Load the base model
model = YOLO("yolov8n-cls.pt") # Using nano model for quick demonstration

# Train the model
print("Starting training...")
results = model.train(data=dataset_path, epochs=1, imgsz=224, project="runs", name="dummy_train")

print("Training completed! The trained model and logs are saved in the 'runs/dummy_train' directory.")
