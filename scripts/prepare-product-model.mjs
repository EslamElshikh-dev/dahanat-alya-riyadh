import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";

const directory = path.join(process.cwd(), "vendor/background-removal");
const destination = path.join(directory, "u2netp.onnx");
const checksum = "309c8469258dda742793dce0ebea8e6dd393174f89934733ecc8b14c76f4ddd8";
const sha256 = buffer => createHash("sha256").update(buffer).digest("hex");
let cached;
try { cached = await readFile(destination); } catch {}
if (!cached || sha256(cached) !== checksum) {
  const response = await fetch("https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2netp.onnx", { signal: AbortSignal.timeout(60_000) });
  if (!response.ok) throw new Error(`Product model download failed (${response.status})`);
  const model = Buffer.from(await response.arrayBuffer());
  if (sha256(model) !== checksum) throw new Error("Product model checksum does not match the pinned release");
  await mkdir(directory, { recursive: true });
  await writeFile(`${destination}.download`, model);
  await rename(`${destination}.download`, destination);
}
console.log("Verified bundled U²-Net product model.");
