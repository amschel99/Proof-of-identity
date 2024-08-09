import os
import torch
import facenet_pytorch

# Disable NNPACK warnings
os.environ['TORCH_WARNINGS_ONLY_ONCE'] = '1'

# Use MKL-DNN backend if available
torch.backends.mkldnn.enabled = True

# Load the pretrained InceptionResnetV1 model
resnet = facenet_pytorch.InceptionResnetV1(pretrained='vggface2').eval()

# Create a dummy input tensor
input = torch.randn(1, 3, 160, 160)

# Export the model to ONNX format
torch.onnx.export(resnet, input, "face-recognition.onnx", verbose=False, opset_version=11)

