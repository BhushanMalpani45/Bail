# # -*- coding: utf-8 -*-
# # @Time : 20-6-9 上午10:20
# # @Author : zhuying
# # @Company : Minivision
# # @File : anti_spoof_predict.py
# # @Software : PyCharm

# import os
# import traceback
# import cv2

# import math
# import torch
# import numpy as np
# import torch.nn.functional as F


# from src.model_lib.MiniFASNet import MiniFASNetV1, MiniFASNetV2,MiniFASNetV1SE,MiniFASNetV2SE
# from src.data_io import transform as trans
# from src.utility import get_kernel, parse_model_name

# MODEL_MAPPING = {
#     'MiniFASNetV1': MiniFASNetV1,
#     'MiniFASNetV2': MiniFASNetV2,
#     'MiniFASNetV1SE':MiniFASNetV1SE,
#     'MiniFASNetV2SE':MiniFASNetV2SE
# }


# class Detection:
#     # def __init__(self):
#     #     stack = traceback.extract_stack()
#     #     dirname = os.path.dirname(stack[-2].filename)
    
#     #     caffemodel = os.path.join(dirname, 'resources', 'detection_model', 'Widerface-RetinaFace.caffemodel')
#     #     deploy = os.path.join(dirname, 'resources', 'detection_model', 'deploy.prototxt')
        
#     #     self.detector = cv2.dnn.readNetFromCaffe(deploy, caffemodel)
#     #     self.detector_confidence = 0.6
    
#     def __init__(self, device_id):
#         stack = traceback.extract_stack()
#         dirname = os.path.dirname(stack[-2].filename)

#         caffemodel = os.path.join(dirname, 'resources', 'detection_model', 'Widerface-RetinaFace.caffemodel')
#         deploy = os.path.join(dirname, 'resources', 'detection_model', 'deploy.prototxt')
        
#         if not os.path.exists(deploy):
#             raise FileNotFoundError(f"Deploy file not found at {deploy}")

#         if not os.path.exists(caffemodel):
#             raise FileNotFoundError(f"Caffe model file not found at {caffemodel}")

#         try:
#             self.detector = cv2.dnn.readNetFromCaffe(deploy, caffemodel)
#         except cv2.error as e:
#             print(f"Error loading model: {e}")
#             raise
#         self.detector_confidence = 0.6
#         self.device_id = device_id

#     def get_bbox(self, img):
#         height, width = img.shape[0], img.shape[1]
#         aspect_ratio = width / height
#         if img.shape[1] * img.shape[0] >= 192 * 192:
#             img = cv2.resize(img,
#                              (int(192 * math.sqrt(aspect_ratio)),
#                               int(192 / math.sqrt(aspect_ratio))), interpolation=cv2.INTER_LINEAR)

#         blob = cv2.dnn.blobFromImage(img, 1, mean=(104, 117, 123))
#         self.detector.setInput(blob, 'data')
#         out = self.detector.forward('detection_out').squeeze()
#         max_conf_index = np.argmax(out[:, 2])
#         left, top, right, bottom = out[max_conf_index, 3]*width, out[max_conf_index, 4]*height, \
#                                    out[max_conf_index, 5]*width, out[max_conf_index, 6]*height
#         bbox = [int(left), int(top), int(right-left+1), int(bottom-top+1)]
#         return bbox


# class AntiSpoofPredict(Detection):
#     def __init__(self, device_id):
#         super(AntiSpoofPredict, self).__init__()
#         self.device = torch.device("cuda:{}".format(device_id)
#                                    if torch.cuda.is_available() else "cpu")

#     def _load_model(self, model_path):
#         # define model
#         model_name = os.path.basename(model_path)
#         h_input, w_input, model_type, _ = parse_model_name(model_name)
#         self.kernel_size = get_kernel(h_input, w_input,)
#         self.model = MODEL_MAPPING[model_type](conv6_kernel=self.kernel_size).to(self.device)

#         # load model weight
#         state_dict = torch.load(model_path, map_location=self.device)
#         keys = iter(state_dict)
#         first_layer_name = keys.__next__()
#         if first_layer_name.find('module.') >= 0:
#             from collections import OrderedDict
#             new_state_dict = OrderedDict()
#             for key, value in state_dict.items():
#                 name_key = key[7:]
#                 new_state_dict[name_key] = value
#             self.model.load_state_dict(new_state_dict)
#         else:
#             self.model.load_state_dict(state_dict)
#         return None

#     def predict(self, img, model_path):
#         test_transform = trans.Compose([
#             trans.ToTensor(),
#         ])
#         img = test_transform(img)
#         img = img.unsqueeze(0).to(self.device)
#         self._load_model(model_path)
#         self.model.eval()
#         with torch.no_grad():
#             result = self.model.forward(img)
#             result = F.softmax(result).cpu().numpy()
#         return result










# # -*- coding: utf-8 -*-
# # @Time : 20-6-9 上午10:20
# # @Author : zhuying
# # @Company : Minivision
# # @File : anti_spoof_predict.py
# # @Software : PyCharm

# # import os
# # import traceback
# # import cv2
# # import math
# # import torch
# # import numpy as np
# # import torch.nn.functional as F
# # from collections import OrderedDict

# # from src.model_lib.MiniFASNet import MiniFASNetV1, MiniFASNetV2, MiniFASNetV1SE, MiniFASNetV2SE
# # from src.data_io import transform as trans
# # from src.utility import get_kernel, parse_model_name

# # MODEL_MAPPING = {
# #     'MiniFASNetV1': MiniFASNetV1,
# #     'MiniFASNetV2': MiniFASNetV2,
# #     'MiniFASNetV1SE': MiniFASNetV1SE,
# #     'MiniFASNetV2SE': MiniFASNetV2SE
# # }

# # class Detection:
# #     def __init__(self):
# #         # Direct paths to model files
# #         self.caffemodel = r'C:\Users\91799\Desktop\1SIHFACE\face-attendance-system\spoofing\resources\detection_model\Widerface-RetinaFace.caffemodel'
# #         self.deploy = r'C:\Users\91799\Desktop\1SIHFACE\face-attendance-system\spoofing\resources\detection_model\deploy.prototxt'
        
# #         if not os.path.isfile(self.caffemodel):
# #             raise FileNotFoundError(f"Caffe model file not found: {self.caffemodel}")
# #         if not os.path.isfile(self.deploy):
# #             raise FileNotFoundError(f"Prototxt file not found: {self.deploy}")

# #         self.detector = cv2.dnn.readNetFromCaffe(self.deploy, self.caffemodel)
# #         self.detector_confidence = 0.6

# #     def get_bbox(self, img):
# #         height, width = img.shape[0], img.shape[1]
# #         aspect_ratio = width / height
# #         if img.shape[1] * img.shape[0] >= 192 * 192:
# #             img = cv2.resize(img,
# #                              (int(192 * math.sqrt(aspect_ratio)),
# #                               int(192 / math.sqrt(aspect_ratio))), interpolation=cv2.INTER_LINEAR)

# #         blob = cv2.dnn.blobFromImage(img, 1, mean=(104, 117, 123))
# #         self.detector.setInput(blob, 'data')
# #         out = self.detector.forward('detection_out').squeeze()
# #         max_conf_index = np.argmax(out[:, 2])
# #         left, top, right, bottom = out[max_conf_index, 3] * width, out[max_conf_index, 4] * height, \
# #                                    out[max_conf_index, 5] * width, out[max_conf_index, 6] * height
# #         bbox = [int(left), int(top), int(right - left + 1), int(bottom - top + 1)]
# #         return bbox


# # class AntiSpoofPredict(Detection):
# #     def __init__(self, device_id):
# #         super(AntiSpoofPredict, self).__init__()
# #         self.device = torch.device("cuda:{}".format(device_id)
# #                                 if torch.cuda.is_available() else "cpu")

# #     def _load_model(self, model_path):
# #         # Define model
# #         model_name = os.path.basename(model_path)
# #         h_input, w_input, model_type, _ = parse_model_name(model_name)
# #         self.kernel_size = get_kernel(h_input, w_input)
# #         self.model = MODEL_MAPPING[model_type](conv6_kernel=self.kernel_size).to(self.device)

# #         # Load model weight
# #         if not os.path.isfile(model_path):
# #             raise FileNotFoundError(f"Model file not found: {model_path}")

# #         state_dict = torch.load(model_path, map_location=self.device)
# #         keys = iter(state_dict)
# #         first_layer_name = next(keys)
# #         if 'module.' in first_layer_name:
# #             new_state_dict = OrderedDict()
# #             for key, value in state_dict.items():
# #                 name_key = key[7:]  # Strip 'module.' from keys
# #                 new_state_dict[name_key] = value
# #             self.model.load_state_dict(new_state_dict)
# #         else:
# #             self.model.load_state_dict(state_dict)

# #     def predict(self, img, model_path):
# #         test_transform = trans.Compose([
# #             trans.ToTensor(),
# #         ])
# #         img = test_transform(img)
# #         img = img.unsqueeze(0).to(self.device)
# #         self._load_model(model_path)
# #         self.model.eval()
# #         with torch.no_grad():
# #             result = self.model(img)
# #             result = F.softmax(result, dim=1).cpu().numpy()
# #         return result




import os
import traceback
import cv2
import math
import torch
import numpy as np
import torch.nn.functional as F

from src.model_lib.MiniFASNet import MiniFASNetV1, MiniFASNetV2, MiniFASNetV1SE, MiniFASNetV2SE
from src.data_io import transform as trans
from src.utility import get_kernel, parse_model_name

MODEL_MAPPING = {
    'MiniFASNetV1': MiniFASNetV1,
    'MiniFASNetV2': MiniFASNetV2,
    'MiniFASNetV1SE': MiniFASNetV1SE,
    'MiniFASNetV2SE': MiniFASNetV2SE
}

class Detection:
    def __init__(self, device_id):
        stack = traceback.extract_stack()
        dirname = os.path.dirname(stack[-2].filename)

        self.caffemodel = os.path.join(dirname, '..', 'resources', 'detection_model', 'Widerface-RetinaFace.caffemodel')
        self.deploy = os.path.join(dirname, '..', 'resources', 'detection_model', 'deploy.prototxt')

        if not os.path.exists(self.deploy):
            raise FileNotFoundError(f"Deploy file not found at {self.deploy}")

        if not os.path.exists(self.caffemodel):
            raise FileNotFoundError(f"Caffe model file not found at {self.caffemodel}")

        try:
            self.detector = cv2.dnn.readNetFromCaffe(self.deploy, self.caffemodel)
        except cv2.error as e:
            print(f"Error loading model: {e}")
            raise
        self.detector_confidence = 0.6
        self.device_id = device_id

    def get_bbox(self, img):
        height, width = img.shape[0], img.shape[1]
        aspect_ratio = width / height
        if img.shape[1] * img.shape[0] >= 192 * 192:
            img = cv2.resize(img,
                            (int(192 * math.sqrt(aspect_ratio)),
                            int(192 / math.sqrt(aspect_ratio))), interpolation=cv2.INTER_LINEAR)

        blob = cv2.dnn.blobFromImage(img, 1, mean=(104, 117, 123))
        self.detector.setInput(blob, 'data')
        out = self.detector.forward('detection_out').squeeze()
        max_conf_index = np.argmax(out[:, 2])
        left, top, right, bottom = out[max_conf_index, 3] * width, out[max_conf_index, 4] * height, \
                                   out[max_conf_index, 5] * width, out[max_conf_index, 6] * height
        bbox = [int(left), int(top), int(right - left + 1), int(bottom - top + 1)]
        return bbox

class AntiSpoofPredict(Detection):
    def __init__(self, device_id):
        super(AntiSpoofPredict, self).__init__(device_id)
        self.device = torch.device("cuda:{}".format(device_id) if torch.cuda.is_available() else "cpu")
        self.model = None
        self.kernel_size = None

    def _load_model(self, model_path):
        model_name = os.path.basename(model_path)
        h_input, w_input, model_type, _ = parse_model_name(model_name)
        self.kernel_size = get_kernel(h_input, w_input)
        self.model = MODEL_MAPPING[model_type](conv6_kernel=self.kernel_size).to(self.device)

        # Load model weight
        state_dict = torch.load(model_path, map_location=self.device)
        keys = iter(state_dict)
        first_layer_name = keys.__next__()
        if first_layer_name.find('module.') >= 0:
            from collections import OrderedDict
            new_state_dict = OrderedDict()
            for key, value in state_dict.items():
                name_key = key[7:]
                new_state_dict[name_key] = value
            self.model.load_state_dict(new_state_dict)
        else:
            self.model.load_state_dict(state_dict)

    def predict(self, img, model_path):
        test_transform = trans.Compose([
            trans.ToTensor(),
        ])
        img = test_transform(img)
        img = img.unsqueeze(0).to(self.device)
        self._load_model(model_path)
        self.model.eval()
        with torch.no_grad():
            result = self.model.forward(img)
            result = F.softmax(result, dim=1).cpu().numpy()  # Ensure the softmax is applied along the correct dimension
        return result
