import { randomUUID } from "node:crypto";
import { get, put } from "@vercel/blob";
import { prepareProductImage } from "../lib/admin/product-image";
import type { ProductStore } from "../lib/admin/types";

// Credentials arrive through stdin only; never put them in arguments, files, or logs.
if (process.stdin.isTTY) process.stdin.setRawMode(true);
process.stdin.setEncoding("utf8");
console.log("Ready for maintenance JSON on stdin (input is hidden).");
const input = await new Promise<string>(resolve => {
  let text = "";
  const receive = (chunk: string) => {
    text += chunk;
    if (text.includes("\n")) {
      process.stdin.off("data", receive); process.stdin.pause();
      if (process.stdin.isTTY) process.stdin.setRawMode(false);
      resolve(text.slice(0, text.indexOf("\n")));
    }
  };
  process.stdin.on("data", receive);
});
let config;
try { config = JSON.parse(input); } catch { throw new Error("Invalid maintenance configuration"); }
const { privateToken, mediaToken, mediaHost, slug, mode = "inspect" } = config as {
  privateToken: string; mediaToken: string; mediaHost: string; slug: string; mode?: "inspect" | "replace";
};
async function catalog() {
  const record = await get("alya/catalog.json", { access: "private", token: privateToken, useCache: false, headers: { "Accept-Encoding": "identity" } });
  if (!record || record.statusCode !== 200 || !record.stream) throw new Error("Catalog is unavailable");
  return { value: JSON.parse(await new Response(record.stream).text()) as ProductStore, version: record.blob.etag };
}
const current = await catalog();
const product = current.value.products.find(item => item.slug === slug);
if (!product || product.status === "deleted") throw new Error("Active product not found");
if (mode === "inspect") {
  console.log(JSON.stringify({ title: product.title, status: product.status, image: product.image, originalImage: product.originalImage, version: current.version }));
} else if (mode === "replace") {
  const originalImage = product.originalImage || product.image;
  const url = new URL(originalImage);
  if (url.protocol !== "https:" || url.hostname !== mediaHost || !url.pathname.startsWith("/alya-products/")) throw new Error("Unexpected source image");
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000), redirect: "error" });
  if (!response.ok) throw new Error("Source photo download failed");
  const source = Buffer.from(await response.arrayBuffer());
  if (!source.length || source.length > 4_000_000) throw new Error("Source image size is invalid");
  const prepared = await prepareProductImage(source);
  const blob = await put(`alya-products/${randomUUID()}.webp`, prepared.image, {
    access: "public", token: mediaToken, addRandomSuffix: false, contentType: "image/webp", cacheControlMaxAge: 31536000,
  });
  // Preserve every other product field, including its publication state. Abort if someone edited the store meanwhile.
  if ((await catalog()).version !== current.version) throw new Error("Catalog changed; replacement was not applied");
  const now = new Date().toISOString();
  Object.assign(product, { image: blob.url, originalImage, customImage: true, updatedAt: now });
  current.value.updatedAt = now;
  current.value.activity.unshift({ id: randomUUID(), action: "فُرّغت خلفية صورة المنتج", subject: product.title, at: now });
  current.value.activity = current.value.activity.slice(0, 100);
  await put("alya/catalog.json", JSON.stringify(current.value), {
    access: "private", token: privateToken, addRandomSuffix: false, allowOverwrite: true,
    ifMatch: current.version, contentType: "application/json", cacheControlMaxAge: 60,
  });
  console.log(JSON.stringify({ title: product.title, image: blob.url, originalImage, status: product.status, width: prepared.width, height: prepared.height }));
} else throw new Error("Invalid maintenance mode");
