import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const catalogs = [
  {
    "slug": "alya-paints",
    "bytes": 2684310,
    "sha256": "706f01efe20dfe105f2f0d6a26fb6193686f1d45450add2d80e101034b915f23"
  },
  {
    "slug": "alya-thermal",
    "bytes": 1716287,
    "sha256": "87ba6a36b0f9bfccf0c96a120386f37a061fce1dd3a76a0df6ee7900c5ee1e5a"
  }
];

await mkdir(path.join(root, "public/catalogs"), { recursive: true });
for (const { slug, sha256, bytes } of catalogs) {
  const directory = path.join(root, "catalog-sources", slug);
  const parts = (await readdir(directory)).filter((name) => /^\d{3}\.b64$/.test(name)).sort();
  const pdf = Buffer.concat(await Promise.all(parts.map(async (name) => Buffer.from(await readFile(path.join(directory, name), "utf8"), "base64"))));
  if (pdf.byteLength !== bytes || createHash("sha256").update(pdf).digest("hex") !== sha256) {
    throw new Error(`Catalog integrity check failed: ${slug}`);
  }
  await writeFile(path.join(root, "public/catalogs", `${slug}.pdf`), pdf);
  console.log(`Prepared ${slug}.pdf (${pdf.byteLength} bytes)`);
}

const assets = JSON.parse(await readFile(path.join(root, "catalog-sources/assets.json"), "utf8"));
await mkdir(path.join(root, "public/catalog-previews"), { recursive: true });
for (const [assetPath, data] of Object.entries(assets)) {
  await writeFile(path.join(root, "public", assetPath), Buffer.from(data, "base64"));
}
console.log(`Prepared ${Object.keys(assets).length} catalog images`);
