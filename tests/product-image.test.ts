import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
import { prepareProductImage } from "../lib/admin/product-image";

test("a black-background product photo becomes transparent without holes in the lid or label", async () => {
  const original = await readFile(new URL("./fixtures/awp300-source.webp", import.meta.url));
  const result = await prepareProductImage(original);
  assert.equal(result.backgroundRemoved, true);
  const { data, info } = await sharp(result.image).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.deepEqual([info.width, info.height, info.channels], [960, 1100, 4]);
  const alpha = (x: number, y: number) => data[(y * info.width + x) * 4 + 3];
  let opaqueBlack = 0;
  for (let i = 0; i < data.length; i += 4) if (data[i + 3] > 230 && Math.max(data[i], data[i + 1], data[i + 2]) < 22) opaqueBlack++;
  // This particular bucket is blue and white. Its black backdrop must not survive inside the mask.
  assert.ok(opaqueBlack < info.width * info.height * 0.001, `opaque backdrop pixels: ${opaqueBlack}`);
  for (const [x, y] of [[0, 0], [959, 0], [0, 1099], [959, 1099], [480, 10]]) assert.equal(alpha(x, y), 0);
  for (let y = 115; y <= 180; y += 5) for (let x = 300; x <= 650; x += 10) assert.ok(alpha(x, y) >= 245, `lid pixel ${x},${y}`);
  for (let y = 500; y <= 800; y += 10) for (let x = 350; x <= 650; x += 10) assert.ok(alpha(x, y) >= 245, `label pixel ${x},${y}`);
});

test("already-transparent wide products keep their proportions and receive centered margins", async () => {
  const input = await sharp({ create: { width: 420, height: 220, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: await sharp({ create: { width: 400, height: 200, channels: 4, background: "#246a9a" } }).png().toBuffer(), left: 10, top: 10 }])
    .png().toBuffer();
  const result = await prepareProductImage(input);
  assert.equal(result.backgroundRemoved, false);
  const { data, info } = await sharp(result.image).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let left = info.width, right = -1, top = info.height, bottom = -1;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * 4 + 3] > 128) {
    left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y);
  }
  assert.ok(Math.abs((right - left + 1) / (bottom - top + 1) - 2) < 0.03);
  assert.ok(Math.abs(left - (info.width - right - 1)) <= 2);
  assert.ok(Math.abs(top - (info.height - bottom - 1)) <= 2);
});

test("a white backdrop is removed while the white product lid stays opaque", async () => {
  const original = await readFile(new URL("./fixtures/awp300-source.webp", import.meta.url));
  const cutout = (await prepareProductImage(original)).image;
  const photo = await sharp(cutout).flatten({ background: "#fff" }).jpeg({ quality: 92 }).toBuffer();
  const prepared = await prepareProductImage(photo);
  const { data, info } = await sharp(prepared.image).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(data[3], 0);
  for (let y = 115; y <= 180; y += 10) for (let x = 300; x <= 650; x += 20) assert.ok(data[(y * info.width + x) * 4 + 3] >= 245, `white lid pixel ${x},${y}`);
});

test("blank transparent images and non-image files cannot become product photos", async () => {
  const blank = await sharp({ create: { width: 64, height: 64, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).png().toBuffer();
  await assert.rejects(() => prepareProductImage(blank), /لم نتمكن من تفريغ الصورة/);
  await assert.rejects(() => prepareProductImage(Buffer.from("not an image")));
});
