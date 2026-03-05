from ultralytics import YOLO  # pyre-ignore[21]
import os

def main():
    # Define paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    dataset_yaml = os.path.join(current_dir, "data.yml") # The data configuration file
    
    # Check if data.yml exists
    if not os.path.exists(dataset_yaml):
        print(f"Error: {dataset_yaml} not found.")
        print("Please configure your dataset before training.")
        return

    print("Loading base model (yolov8s-cls.pt)...")
    # Load the base model. If the file doesn't exist locally,
    # it will be downloaded automatically by ultralytics.
    model_file = "yolov8s-cls.pt"
    # To use the one in the root directory:
    root_model_path = os.path.join(current_dir, "..", "..", "..", model_file)
    if os.path.exists(root_model_path):
        model = YOLO(root_model_path)
    else:
        model = YOLO(model_file)
    
    print("Starting training process...")
    # Train the model
    # Adjust epochs, imgsz, and batch size according to your system capabilities
    results = model.train(
        data=dataset_yaml,
        epochs=50, 
        imgsz=224, 
        batch=16,
        project=os.path.join(current_dir, "runs"),
        name="crop_classification_model"
    )
    
    print("\nTraining complete!")
    print(f"The best model weights are saved at: {os.path.join(current_dir, 'runs', 'crop_classification_model', 'weights', 'best.pt')}")

if __name__ == "__main__":
    main()
