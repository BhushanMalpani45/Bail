# import os
# import cv2
# import numpy as np
# import time

# from src.anti_spoof_predict import AntiSpoofPredict
# from src.generate_patches import CropImage
# from src.utility import parse_model_name

# def check_image(image):
#     height, width, _ = image.shape
#     if width / height != 3 / 4:
#         print("Image is not appropriate!!!\nHeight/Width should be 4/3.")
#         return False
#     else:
#         return True

# def test(image, model_dir, device_id):
#     model_test = AntiSpoofPredict(device_id)
#     image_cropper = CropImage()
    
#     image = cv2.resize(image, (int(image.shape[0] * 3 / 4), image.shape[0]))
    
#     if not check_image(image):
#         return None  # Ensure the function returns a value if the image check fails
    
#     image_bbox = model_test.get_bbox(image)
#     prediction = np.zeros((1, 3))
#     test_speed = 0
    
#     for model_name in os.listdir(model_dir):
#         h_input, w_input, model_type, scale = parse_model_name(model_name)
#         param = {
#             "org_img": image,
#             "bbox": image_bbox,
#             "scale": scale,
#             "out_w": w_input,
#             "out_h": h_input,
#             "crop": True,
#         }
#         if scale is None:
#             param["crop"] = False
#         img = image_cropper.crop(**param)
#         start = time.time()
#         prediction += model_test.predict(img, os.path.join(model_dir, model_name))
#         test_speed += time.time() - start

#     label = np.argmax(prediction)
#     value = prediction[0][label] / 2
    
#     return label  # Ensure the function returns the label

# if __name__ == "__main__":
#     import argparse
#     desc = "test"
#     parser = argparse.ArgumentParser(description=desc)
#     parser.add_argument(
#         "--device_id",
#         type=int,
#         default=0,
#         help="which gpu id, [0/1/2/3]")
#     parser.add_argument(
#         "--model_dir",
#         type=str,
#         default="./resources/anti_spoof_models",
#         help="model_lib used to test")
#     parser.add_argument(
#         "--image_name",
#         type=str,
#         default="./images/sample/image_F1.jpg",
#         help="image used to test")
#     args = parser.parse_args()
    
#     # Ensure the image path is valid
#     if os.path.exists(args.image_name):
#         image = cv2.imread(args.image_name)
#         test(image, args.model_dir, args.device_id)
#     else:
#         print(f"Image file {args.image_name} does not exist.")


import os
import cv2
import numpy as np
import time

from src.anti_spoof_predict import AntiSpoofPredict
from src.generate_patches import CropImage
from src.utility import parse_model_name

def check_image(image):
    height, width, _ = image.shape
    if width / height == 4 / 3:
        print("Image is not appropriate!!!\nHeight/Width ratio should be 4/3.")
        return False
    return True

def test(image, model_dir, device_id):
    model_test = AntiSpoofPredict(device_id)
    image_cropper = CropImage()
    
    # Resize image to ensure width is 3/4 of height
    image = cv2.resize(image, (int(image.shape[0] * 3 / 4), image.shape[0]))

    if not check_image(image):
        return None  # Ensure the function returns None if the image check fails
    
    image_bbox = model_test.get_bbox(image)
    prediction = np.zeros((1, 3))
    test_speed = 0
    
    # Ensure model directory exists and contains files
    if not os.path.isdir(model_dir):
        raise FileNotFoundError(f"Model directory {model_dir} does not exist.")
    
    model_files = [f for f in os.listdir(model_dir) if os.path.isfile(os.path.join(model_dir, f))]
    if not model_files:
        raise FileNotFoundError(f"No model files found in directory {model_dir}.")
    
    for model_name in model_files:
        h_input, w_input, model_type, scale = parse_model_name(model_name)
        param = {
            "org_img": image,
            "bbox": image_bbox,
            "scale": scale,
            "out_w": w_input,
            "out_h": h_input,
            "crop": True,
        }
        if scale is None:
            param["crop"] = False
        
        img = image_cropper.crop(**param)
        start = time.time()
        prediction += model_test.predict(img, os.path.join(model_dir, model_name))
        test_speed += time.time() - start
    
    # Log test speed for debugging
    print(f"Total test time: {test_speed:.2f} seconds")

    if np.sum(prediction) == 0:
        print("No predictions made. Check the model or image.")
        return None
    
    label = np.argmax(prediction)
    value = prediction[0][label] / 2
    
    return label  # Return the label

if __name__ == "__main__":
    import argparse
    
    desc = "Test Anti-Spoofing Model"
    parser = argparse.ArgumentParser(description=desc)
    parser.add_argument(
        "--device_id",
        type=int,
        default=0,
        help="GPU device ID to use (e.g., [0/1/2/3])"
    )
    parser.add_argument(
        "--model_dir",
        type=str,
        default="./resources/anti_spoof_models",
        help="Directory containing anti-spoofing model files"
    )
    parser.add_argument(
        "--image_name",
        type=str,
        default="./images/sample/image_F1.jpg",
        help="Path to the image used for testing"
    )
    args = parser.parse_args()
    
    # Ensure the image path is valid and can be read
    if os.path.exists(args.image_name):
        image = cv2.imread(args.image_name)
        if image is not None:
            label = test(image, args.model_dir, args.device_id)
            if label is not None:
                print(f"Predicted label: {label}")
            else:
                print("Prediction failed.")
        else:
            print(f"Unable to read image file {args.image_name}.")
    else:
        print(f"Image file {args.image_name} does not exist.")
