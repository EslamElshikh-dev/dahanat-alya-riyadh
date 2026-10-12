# Product photo foreground segmentation

`u2netp.onnx` is the unmodified lightweight U²-Net model by Xuebin Qin and the U-2-Net authors, distributed under Apache-2.0 (see LICENSE). The build downloads the pinned release with `scripts/prepare-product-model.mjs`, verifies SHA-256, and includes the model in the upload function. The generated binary is ignored in Git.

- Original project: https://github.com/xuebinqin/U-2-Net
- ONNX distribution: https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2netp.onnx
- SHA-256: `309c8469258dda742793dce0ebea8e6dd393174f89934733ecc8b14c76f4ddd8`
- MD5 published by rembg: `8e83ca70e441ab06c318d82300c84806`

The upload endpoint runs inference locally on the server using ONNX Runtime CPU. No runtime model download, third-party photo upload, or removal-service API key is needed. Only the image's alpha mask changes: product pixels and printed labels are not generated. The upload keeps the original photograph and stores a separate transparent WebP for display.
