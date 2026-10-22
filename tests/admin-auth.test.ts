import { beforeEach, mock, test } from "node:test";
import assert from "node:assert/strict";
import { randomBytes, scryptSync } from "node:crypto";
import { SignJWT, decodeJwt } from "jose";

// No Vercel credentials or production records are used by this fixture.
const records = new Map<string, { value: unknown; version: string }>();
const jar = new Map<string, string>();
let cookieOptions: Record<string, unknown> = {};
let writes = 0;
class StoreConflict extends Error {}
async function readRecord(path: string) {
  const record = records.get(path);
  return record ? structuredClone(record) : null;
}
async function writeRecord(path: string, value: unknown, version?: string) {
  const current = records.get(path);
  if (current && current.version !== version) throw new StoreConflict();
  const nextVersion = String(++writes);
  records.set(path, { value: structuredClone(value), version: nextVersion });
  return nextVersion;
}
async function ensureRecord(path: string, initial: unknown) {
  const current = await readRecord(path);
  if (current) return current;
  return { value: structuredClone(initial), version: await writeRecord(path, initial) };
}
mock.module("next/headers", { namedExports: { cookies: async () => ({
  get: (name: string) => jar.has(name) ? { value: jar.get(name) } : undefined,
  set: (name: string, value: string, options: Record<string, unknown>) => {
    jar.set(name, value);
    cookieOptions = options;
  },
  delete: (name: string) => jar.delete(name),
}) } });
mock.module(new URL("../lib/admin/storage.ts", import.meta.url).href, {
  namedExports: { readRecord, writeRecord, ensureRecord, StoreConflict },
});
const auth = await import("../lib/admin/auth");
const password = randomBytes(32).toString("hex");
const salt = randomBytes(16).toString("hex");
const secret = randomBytes(48).toString("hex");
const origin = "https://isolated-alya.example";
const request = (path: string, method = "POST", body: unknown = {}, from = origin) =>
  new Request(`${origin}/api/admin/${path}`, { method,
    headers: { origin: from, "content-type": "application/json", "x-vercel-forwarded-for": "192.0.2.11" },
    ...(method === "GET" ? {} : { body: JSON.stringify(body) }),
  });

beforeEach(() => {
  records.clear(); jar.clear(); writes = 0; cookieOptions = {};
  process.env.ALYA_SESSION_SECRET = secret;
  process.env.ALYA_ADMIN_PASSWORD_HASH = `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
});

test("login rejects wrong credentials and issues a restricted eight-hour cookie", async () => {
  const login = await import("../app/api/admin/login/route");
  assert.equal((await login.POST(request("login", "POST", { username: "admin", password: "wrong" }))).status, 401);
  assert.equal(jar.size, 0);
  assert.equal((await login.POST(request("login", "POST", { username: "admin", password }))).status, 200);
  assert.equal(await auth.validSession(), true);
  assert.equal(cookieOptions.httpOnly, true);
  assert.equal(cookieOptions.sameSite, "strict");
  assert.equal(cookieOptions.path, "/");
  assert.equal(cookieOptions.maxAge, 28800);
  assert.equal(cookieOptions.secure, process.env.NODE_ENV === "production");
  const payload = decodeJwt(jar.get(auth.SESSION_COOKIE)!);
  assert.equal(payload.sub, "admin");
  assert.equal(payload.iss, "alya-control-center");
  assert.equal(payload.aud, "alya-admin");
  assert.equal(payload.exp! - payload.iat!, 28800);
  assert.ok(records.has(`sessions/${payload.jti}.json`));
});

test("session survives another request without extending expiry and logout revokes replay", async () => {
  assert.equal(await auth.signIn("admin", password), true);
  const token = jar.get(auth.SESSION_COOKIE)!;
  const first = decodeJwt(token);
  const count = writes;
  assert.equal(await auth.validSession(), true);
  assert.equal(writes, count);
  assert.equal(jar.get(auth.SESSION_COOKIE), token);
  const logout = await import("../app/api/admin/logout/route");
  assert.equal((await logout.POST(request("logout"))).status, 200);
  assert.equal(jar.size, 0);
  jar.set(auth.SESSION_COOKIE, token);
  assert.equal(await auth.validSession(), false);
  await auth.signIn("admin", password);
  assert.notEqual(decodeJwt(jar.get(auth.SESSION_COOKIE)!).jti, first.jti);
  assert.equal(await auth.validSession(), true);
});

test("forged, expired, missing and revoked sessions are denied", async () => {
  await auth.signIn("admin", password);
  const token = jar.get(auth.SESSION_COOKIE)!;
  const payload = decodeJwt(token);
  const key = `sessions/${payload.jti}.json`;
  const record = records.get(key)!;
  const segments = token.split(".");
  segments[1] = Buffer.from(JSON.stringify({ ...payload, sub: "other" })).toString("base64url");
  jar.set(auth.SESSION_COOKIE, segments.join("."));
  assert.equal(await auth.validSession(), false);
  jar.set(auth.SESSION_COOKIE, token);
  records.delete(key);
  assert.equal(await auth.validSession(), false);
  records.set(key, { ...record, value: { expires: Date.now() - 1, revoked: false } });
  assert.equal(await auth.validSession(), false);
  records.set(key, { ...record, value: { expires: Date.now() + 60000, revoked: true } });
  assert.equal(await auth.validSession(), false);
  records.set(key, record);
  const expired = await new SignJWT({}).setProtectedHeader({ alg: "HS256" })
    .setSubject("admin").setJti(payload.jti!).setIssuer("alya-control-center")
    .setAudience("alya-admin").setExpirationTime(Math.floor(Date.now() / 1000) - 60)
    .sign(new TextEncoder().encode(secret));
  jar.set(auth.SESSION_COOKIE, expired);
  assert.equal(await auth.validSession(), false);
});

test("every administrative data route refuses unauthenticated access", async () => {
  const routes = [
    await import("../app/api/admin/products/route"),
    await import("../app/api/admin/reports/route"),
    await import("../app/api/admin/integrations/route"),
  ];
  for (const route of routes) {
    const response = await route.GET();
    assert.equal(response.status, 401);
    assert.match(response.headers.get("cache-control")!, /no-store/);
    assert.equal((await route.POST(request("data"))).status, 401);
  }
  const upload = await import("../app/api/admin/upload/route");
  const sync = await import("../app/api/admin/sync/route");
  const exp = await import("../app/api/admin/export/route");
  assert.equal((await upload.POST(request("upload"))).status, 401);
  assert.equal((await sync.POST(request("sync"))).status, 401);
  assert.equal((await exp.GET(request("export", "GET"))).status, 401);
  assert.equal(records.size, 0);
});

test("cross-origin and missing-origin requests cannot log in or log out", async () => {
  const login = await import("../app/api/admin/login/route");
  const logout = await import("../app/api/admin/logout/route");
  assert.equal((await login.POST(request("login", "POST", { username: "admin", password }, "https://foreign.example"))).status, 400);
  assert.equal(records.size, 0);
  await auth.signIn("admin", password);
  const token = jar.get(auth.SESSION_COOKIE);
  assert.equal((await logout.POST(request("logout", "POST", {}, "https://foreign.example"))).status, 400);
  assert.equal(jar.get(auth.SESSION_COOKIE), token);
  assert.equal(await auth.validSession(), true);
  assert.throws(() => auth.sameOrigin(new Request(`${origin}/api/admin/login`)));
  assert.throws(() => auth.sameOrigin(request("login", "POST", {}, "http://isolated-alya.example")));
});

test("login attempts are limited using stored counters", async () => {
  for (let i = 0; i < 12; i++) await auth.throttleLogin(request("login"));
  await assert.rejects(auth.throttleLogin(request("login")), auth.RateError);
});
