import "server-only";
import {createHash, createHmac, timingSafeEqual} from "node:crypto";
import {normalizeAds, readReports, reportDate} from "./reports";
import {StoreConflict, writeRecord} from "./storage";
import {ALYA_ADS_ACCOUNT, ADS_REPORT_SOURCE} from "./ads-script-source";
import type {AdsRow, ReportStore} from "./types";

export class AdsPushError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

export function reportCredential(secret = process.env.ALYA_SESSION_SECRET) {
  if (!secret) throw new AdsPushError("ربط التقارير غير جاهز حاليًا.", 503);
  // A scoped, one-way derived token cannot be used to sign admin sessions.
  return createHmac("sha256", secret).update(`alya:google-ads-reports:${ALYA_ADS_ACCOUNT}:v1`).digest("base64url");
}

export function authorizeAdsPush(header: string | null, secret = process.env.ALYA_SESSION_SECRET) {
  if (!header || header.length > 200 || !header.startsWith("Bearer ")) return false;
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(header.slice(7)), digest(reportCredential(secret)));
}

export type AdsPush = {schemaVersion:1; accountId:string; currency:"SAR"; timeZone:"Asia/Riyadh"; generatedAt:string; from:string; to:string; rows:AdsRow[]};

export function validateAdsPush(input: unknown, now = Date.now()): AdsPush {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new AdsPushError("صيغة التقرير غير صالحة.");
  const body = input as Record<string, unknown>;
  if (body.schemaVersion !== 1 || body.accountId !== ALYA_ADS_ACCOUNT || body.currency !== "SAR" || body.timeZone !== "Asia/Riyadh") {
    throw new AdsPushError("التقرير لا يخص حساب دهانات عليا المحدد.");
  }
  const from = reportDate(body.from), to = reportDate(body.to);
  if (from > to || Date.parse(to) - Date.parse(from) > 92 * 86400000) throw new AdsPushError("فترة التقرير غير صالحة.");
  const generatedAt = typeof body.generatedAt === "string" ? body.generatedAt : "";
  const generated = Date.parse(generatedAt);
  if (!Number.isFinite(generated) || generated < now - 2 * 3600000 || generated > now + 5 * 60000) throw new AdsPushError("وقت التقرير منتهي أو غير صالح.");
  if (!Array.isArray(body.rows) || body.rows.length > 15000) throw new AdsPushError("عدد صفوف التقرير غير صالح.");
  const seen = new Set<string>();
  const rows = body.rows.map(value => {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new AdsPushError("صف تقرير غير صالح.");
    const row = normalizeAds(value as Record<string, unknown>);
    if (!/^\d+$/.test(row.campaignId) || !Number.isSafeInteger(row.impressions) || !Number.isSafeInteger(row.clicks) || row.date < from || row.date > to) throw new AdsPushError("صف التقرير خارج الفترة أو غير صالح.");
    const key = `${row.date}|${row.campaignId}`;
    if (seen.has(key)) throw new AdsPushError("يوجد صف مكرر لنفس الحملة واليوم.");
    seen.add(key);
    return row;
  }).sort((a,b) => `${a.date}|${a.campaignId}`.localeCompare(`${b.date}|${b.campaignId}`));
  return {schemaVersion:1, accountId:ALYA_ADS_ACCOUNT, currency:"SAR", timeZone:"Asia/Riyadh", generatedAt:new Date(generated).toISOString(), from, to, rows};
}

export function applyAdsPush(current: ReportStore, report: AdsPush, receivedAt = new Date().toISOString()) {
  if (current.adsAccount && current.adsAccount.replace(/-/g, "") !== ALYA_ADS_ACCOUNT) throw new AdsPushError("الحساب لا يطابق تقارير اللوحة.", 409);
  const hash = createHash("sha256").update(JSON.stringify(report)).digest("hex");
  if (current.adsGeneratedAt && Date.parse(report.generatedAt) <= Date.parse(current.adsGeneratedAt)) {
    if (report.generatedAt === current.adsGeneratedAt && current.adsSyncHash !== hash) throw new AdsPushError("تقرير مختلف بنفس وقت الإنشاء.", 409);
    return {changed:false, value:current};
  }
  // Replace the complete window so delayed conversions and removed rows reconcile.
  // Older history and Business Profile data are preserved, including empty reports.
  const ads = [...current.ads.filter(row => row.date < report.from || row.date > report.to), ...report.rows]
    .sort((a,b) => `${a.date}|${a.campaignId}`.localeCompare(`${b.date}|${b.campaignId}`));
  return {changed:true, value:{...current, ads, adsAccount:ALYA_ADS_ACCOUNT, adsSource:ADS_REPORT_SOURCE,
    adsUpdatedAt:receivedAt, adsGeneratedAt:report.generatedAt, adsSyncHash:hash}};
}

export async function receiveAdsPush(report: AdsPush) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const current = await readReports();
    const next = applyAdsPush(current.value, report);
    if (!next.changed) return {ok:true, rows:report.rows.length, unchanged:true};
    try {
      await writeRecord("reports.json", next.value, current.version);
      return {ok:true, rows:report.rows.length, receivedAt:next.value.adsUpdatedAt};
    } catch(error) {
      if (!(error instanceof StoreConflict) || attempt === 2) throw error;
    }
  }
  throw new AdsPushError("تعذّر حفظ التقرير. أعد المزامنة.", 409);
}

export async function readAdsPushBody(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) throw new AdsPushError("يتطلب التقرير JSON.", 415);
  const limit = 1000000;
  if (Number(request.headers.get("content-length") || 0) > limit) throw new AdsPushError("التقرير أكبر من الحد المسموح.", 413);
  if (!request.body) throw new AdsPushError("التقرير فارغ.");
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0, text = "";
  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel(); throw new AdsPushError("التقرير أكبر من الحد المسموح.", 413); }
      text += decoder.decode(value, {stream:true});
    }
    text += decoder.decode();
  } finally { reader.releaseLock(); }
  try { return JSON.parse(text) as unknown; } catch { throw new AdsPushError("صيغة JSON غير صالحة."); }
}
