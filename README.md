# Proof of Identity System with Face Biometrics

This project provides a Proof of Identity system using face biometrics, leveraging advanced face detection and recognition models.

## Getting Started

Follow these steps to set up the project locally:

### 1. Download Face Detection Model

Run the following script to download the face detection model:

```bash
./download-face-detection-model.sh

```

### 2. Download Pretrained Face Recognition Model

Download the pretrained face recognition model from [this link](https://github.com/reorg-icp/Face-recognition-models/blob/master/face-recognition.onnx) and save it in the root directory as `face-recognition.onnx`.

### 3. Install Required Tools

Ensure you have the following tools installed:

- **DFX**: The SDK for building, deploying, and running Internet Computer (IC) applications.
- **Rust**: A systems programming language.

### 4. Install `wasi2ic`

Install `wasi2ic` by following the [instructions here](https://github.com/wasm-forge/wasi2ic).

### 5. Install `wasm-opt`

To optimize your WebAssembly modules, run:

```bash
cargo install wasm-opt

```

### 6. `dfx start --clean --background`

### 7. `npm run deploy:local`

### 8.
 ```    bash  dfx canister call backend clear_face_detection_model_bytes
dfx canister call backend clear_face_recognition_model_bytes
ic-file-uploader backend append_face_detection_model_bytes version-RFB-320.onnx
ic-file-uploader backend append_face_recognition_model_bytes face-recognition.onnx
dfx canister call backend setup_models  

```

#### Credits

Thanks to Dfinity for providing the facial recognition template that runs fully onchain

