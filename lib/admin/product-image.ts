import "server-only";
import path from "node:path";
import sharp from "sharp";
import type { InferenceSession } from "onnxruntime-node";

const INPUT_SIZE = 320;
const OUTPUT_SIZE = { width: 960, height: 1100 };
let sessionPromise: Promise<InferenceSession> | undefined;

async function segmentationSession() {
  if (!sessionPromise) {
    sessionPromise = import("onnxruntime-node").then(({ InferenceSession }) =>
      InferenceSession.create(path.join(process.cwd(), "vendor/background-removal/u2netp.onnx"), {
        executionProviders: ["cpu"],
        intraOpNumThreads: 2,
        interOpNumThreads: 1,
        graphOptimizationLevel: "all",
      }),
    ).catch(error => { sessionPromise = undefined; throw error; });
  }
  return sessionPromise;
}

async function foregroundMask(image: Buffer, width: number, height: number) {
  const { Tensor } = await import("onnxruntime-node");
  const session = await segmentationSession();
  const rgb = await sharp(image).flatten({ background: "#fff" }).removeAlpha()
    .resize(INPUT_SIZE, INPUT_SIZE, { fit: "fill", kernel: "lanczos3" }).raw().toBuffer();
  const plane = INPUT_SIZE * INPUT_SIZE;
  const input = new Float32Array(plane * 3);
  const mean = [0.485, 0.456, 0.406];
  const std = [0.229, 0.224, 0.225];
  let max = 1;
  for (const value of rgb) max = Math.max(max, value);
  for (let pixel = 0; pixel < plane; pixel++) {
    for (let channel = 0; channel < 3; channel++) {
      input[channel * plane + pixel] = (rgb[pixel * 3 + channel] / max - mean[channel]) / std[channel];
    }
  }
  const result = await session.run({ [session.inputNames[0]]: new Tensor("float32", input, [1, 3, INPUT_SIZE, INPUT_SIZE]) });
  const prediction = result[session.outputNames[0]].data as Float32Array;
  let min = Infinity, upper = -Infinity;
  for (let i = 0; i < plane; i++) { min = Math.min(min, prediction[i]); upper = Math.max(upper, prediction[i]); }
  if (!Number.isFinite(upper) || upper - min < 0.01) throw new Error("لم نتمكن من تحديد حدود المنتج. اختر صورة أوضح للعبوة.");
  const mask = Buffer.alloc(plane);
  for (let i = 0; i < plane; i++) {
    // A soft alpha edge, with solid product interiors. RGB pixels are never generated or redrawn.
    const confidence = Math.max(0, Math.min(1, ((prediction[i] - min) / (upper - min) - 0.06) / 0.88));
    mask[i] = Math.round(255 * confidence * confidence * (3 - 2 * confidence));
  }
  return sharp(mask, { raw: { width: INPUT_SIZE, height: INPUT_SIZE, channels: 1 } })
    .resize(width, height, { kernel: "lanczos3" }).greyscale().raw().toBuffer();
}

function refineUniformBackground(pixels: Buffer, alpha: Buffer, width: number, height: number) {
  const corners = [0, width - 1, (height - 1) * width, width * height - 1];
  const background = [0, 1, 2].map(channel => corners.reduce((sum, pixel) => sum + pixels[pixel * 4 + channel], 0) / 4);
  const distance = (pixel: number) => Math.hypot(...background.map((value, channel) => pixels[pixel * 4 + channel] - value));
  if (corners.some(pixel => distance(pixel) > 16)) return;
  // Only edge-connected background is cleared. Dark lettering inside the product is preserved.
  const seen = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let start = 0, end = 0;
  function visit(pixel: number) {
    if (seen[pixel] || distance(pixel) > 30 || alpha[pixel] > 245) return;
    seen[pixel] = 1; queue[end++] = pixel;
  }
  for (let x = 0; x < width; x++) { visit(x); visit((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { visit(y * width); visit(y * width + width - 1); }
  while (start < end) {
    const pixel = queue[start++];
    const edge = Math.max(0, Math.min(1, (distance(pixel) - 8) / 22));
    alpha[pixel] = Math.min(alpha[pixel], Math.round(edge * 255));
    const x = pixel % width, y = Math.floor(pixel / width);
    if (x > 0) visit(pixel - 1);
    if (x < width - 1) visit(pixel + 1);
    if (y > 0) visit(pixel - width);
    if (y < height - 1) visit(pixel + width);
  }
}

/** Segment uploaded photos, preserve their RGB pixels, and fit the complete product on a transparent canvas. */
export async function prepareProductImage(buffer: Buffer) {
  const decoder = sharp(buffer, { limitInputPixels: 24_000_000, animated: false });
  const metadata = await decoder.metadata();
  if (!["png", "jpeg", "webp"].includes(metadata.format || "")) throw new Error("ملف الصورة غير صالح.");
  if ((metadata.pages || 1) > 1) throw new Error("اختر صورة ثابتة للمنتج.");
  const source = await decoder.rotate().resize(1400, 1400, { fit: "inside", withoutEnlargement: true })
    .toColourspace("srgb").ensureAlpha().png().toBuffer();
  const { data: pixels, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const count = width * height;
  let transparentPixels = 0;
  for (let i = 0; i < count; i++) if (pixels[i * 4 + 3] < 230) transparentPixels++;
  const alreadyTransparent = transparentPixels / count > 0.015;
  const alpha = alreadyTransparent ? Buffer.alloc(count) : await foregroundMask(source, width, height);
  if (alreadyTransparent) for (let i = 0; i < count; i++) alpha[i] = pixels[i * 4 + 3];
  else refineUniformBackground(pixels, alpha, width, height);

  let left = width, top = height, right = -1, bottom = -1, foreground = 0;
  for (let i = 0; i < count; i++) {
    pixels[i * 4 + 3] = Math.min(pixels[i * 4 + 3], alpha[i]);
    if (pixels[i * 4 + 3] > 32) {
      foreground++; const x = i % width, y = Math.floor(i / width);
      left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y);
    }
  }
  if (foreground < count * 0.015 || right - left < 8 || bottom - top < 8 || (!alreadyTransparent && foreground > count * 0.98)) {
    throw new Error("لم نتمكن من تفريغ الصورة بوضوح. اختر صورة تُظهر المنتج كاملًا وخلفية مختلفة عنه.");
  }
  // Keep an antialiased edge and even margins; never stretch a tall or wide package.
  left = Math.max(0, left - 3); top = Math.max(0, top - 3);
  right = Math.min(width - 1, right + 3); bottom = Math.min(height - 1, bottom + 3);
  const fitted = await sharp(pixels, { raw: { width, height, channels: 4 } })
    .extract({ left, top, width: right - left + 1, height: bottom - top + 1 })
    .resize(OUTPUT_SIZE.width - 120, OUTPUT_SIZE.height - 120, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 60, bottom: 60, left: 60, right: 60, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 94, alphaQuality: 100, effort: 5 }).toBuffer();
  return { image: fitted, width: OUTPUT_SIZE.width, height: OUTPUT_SIZE.height, backgroundRemoved: !alreadyTransparent };
}
