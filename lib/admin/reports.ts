import "server-only";
import { ensureRecord, writeRecord, StoreConflict } from "./storage";
import type { AdsRow, GbpRow, ReportStore, IntegrationConfig } from "./types";
import { ALYA_ADS_ACCOUNT } from "./ads-script-source";
export const emptyReports:ReportStore={ads:[],gbp:[],adsAccount:"",gbpLocation:"",adsSource:"",gbpSource:"",adsUpdatedAt:null,gbpUpdatedAt:null};
export const emptyIntegration:IntegrationConfig={adsAccount:ALYA_ADS_ACCOUNT,gbpLocation:"",verifiedBusiness:"",updatedAt:null};
export async function readReports(){return ensureRecord<ReportStore>("reports.json",emptyReports);}
export async function readIntegration(){return ensureRecord<IntegrationConfig>("integration.json",emptyIntegration);}
export async function integrationSummary(config:IntegrationConfig,reports?:ReportStore){const value=reports||(await readReports()).value;return{configured:!!value.adsGeneratedAt,adsAccount:config.adsAccount||ALYA_ADS_ACCOUNT,gbpLocation:config.gbpLocation,updatedAt:config.updatedAt,direct:{available:!!process.env.ALYA_SESSION_SECRET,receivedAt:value.adsGeneratedAt?value.adsUpdatedAt:null,generatedAt:value.adsGeneratedAt||null,stale:!!value.adsGeneratedAt&&!!value.adsUpdatedAt&&Date.now()-Date.parse(value.adsUpdatedAt)>48*3600000}};}
function metric(v:unknown,label:string){if(v===null||v===undefined||String(v).trim()==="")throw new Error(`قيمة ${label} مفقودة.`);const clean=String(v).trim().replace(/[٠-٩]/g,c=>String("٠١٢٣٤٥٦٧٨٩".indexOf(c))).replace(/[٬,]/g,"").replace(/٫/g,".").replace(/^(SAR|ر\.?س\.?)\s*/i,"").replace(/\s*(SAR|ر\.?س\.?)$/i,"");const n=Number(clean);if(!Number.isFinite(n)||n<0||n>1e12)throw new Error(`قيمة ${label} غير صالحة.`);return n;}
export function reportDate(value:unknown){if(typeof value!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(value)||!Number.isFinite(Date.parse(`${value}T00:00:00Z`))||new Date(`${value}T00:00:00Z`).toISOString().slice(0,10)!==value)throw new Error("صيغة التاريخ يجب أن تكون YYYY-MM-DD.");if(value>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Riyadh"}).format(new Date()))throw new Error("التقرير يحتوي على تاريخ في المستقبل.");return value;}
export function normalizeAds(row:Record<string,unknown>):AdsRow{
 const campaign=String(row.campaign||"").trim();const campaignId=String(row.campaignId??row.campaign_id??"").trim();if(!campaign||campaign.length>200||!campaignId||campaignId.length>100)throw new Error("اسم الحملة ومعرّفها مطلوبان.");
 const currency=String(row.currency||"").toUpperCase();if(currency!=="SAR")throw new Error("تقبل هذه اللوحة تقارير حساب عليا بالريال السعودي SAR فقط.");
 return{date:reportDate(row.date),campaign,campaignId,impressions:metric(row.impressions,"مرات الظهور"),clicks:metric(row.clicks,"النقرات"),spend:metric(row.spend,"الإنفاق"),conversions:metric(row.conversions,"التحويلات"),currency};
}
export function normalizeGbp(row:Record<string,unknown>):GbpRow{return{date:reportDate(row.date),views:metric(row.views??row.impressions,"مشاهدات الملف"),calls:metric(row.calls??row.call_clicks,"ضغطات الاتصال"),websiteClicks:metric(row.websiteClicks??row.website_clicks,"نقرات الموقع"),directions:metric(row.directions??row.direction_requests,"طلبات الاتجاهات")};}
export function mergeRows<T>(existing:T[],incoming:T[],key:(r:T)=>string){const map=new Map(existing.map(r=>[key(r),r]));for(const r of incoming)map.set(key(r),r);return[...map.values()].sort((a,b)=>key(a).localeCompare(key(b)));}
export async function saveReport(kind:string,rows:unknown[],identity:string,source:string,version:string){
 if(!["ads","gbp"].includes(kind)||!rows.length||rows.length>15000)throw new Error("التقرير يجب أن يحتوي على ١ إلى ١٥٠٠٠ صف.");if(!identity.trim()||identity.length>100)throw new Error("حدد معرّف حساب عليا للتقرير.");
 const current=await readReports();if(current.version!==version)throw new StoreConflict();const next=structuredClone(current.value);const now=new Date().toISOString();const seen=new Set<string>();
 if(kind==="ads"){const incoming=rows.map(r=>normalizeAds(r as Record<string,unknown>));for(const r of incoming){const key=`${r.date}|${r.campaignId}`;if(seen.has(key))throw new Error("يوجد صف مكرر لنفس التاريخ والحملة. ارفع تقرير حملات يوميًا دون تقسيم إضافي.");seen.add(key);}if(next.adsAccount&&next.adsAccount!==identity&&next.ads.length)throw new Error("معرّف الحساب لا يطابق التقارير المحفوظة.");next.ads=mergeRows(next.ads,incoming,r=>`${r.date}|${r.campaignId}`);next.adsAccount=identity;next.adsSource=source;next.adsUpdatedAt=now;}
 else{const incoming=rows.map(r=>normalizeGbp(r as Record<string,unknown>));for(const r of incoming){if(seen.has(r.date))throw new Error("يوجد أكثر من صف لنفس اليوم. ارفع تقريرًا لملف واحد.");seen.add(r.date);}if(next.gbpLocation&&next.gbpLocation!==identity&&next.gbp.length)throw new Error("معرّف الملف لا يطابق التقارير المحفوظة.");next.gbp=mergeRows(next.gbp,incoming,r=>r.date);next.gbpLocation=identity;next.gbpSource=source;next.gbpUpdatedAt=now;}
 const nextVersion=await writeRecord("reports.json",next,current.version);return{reports:next,reportsVersion:nextVersion};
}
export async function saveIntegration(input:Record<string,unknown>){
 const current=await readIntegration();const ads=String(input.adsAccount||ALYA_ADS_ACCOUNT).replace(/-/g,"").trim();const gbp=String(input.gbpLocation||"").trim();
 if(ads!==ALYA_ADS_ACCOUNT)throw new Error("الربط مخصص لحساب دهانات عليا 413-093-9368.");if(gbp&&!/^locations\/\d+$/.test(gbp))throw new Error("معرّف الملف يجب أن يكون بصيغة locations/123456789.");
 if(input.confirmBusiness!==true)throw new Error("أكّد أن الحساب والملف يخصان دهانات عليا.");const reports=await readReports();if(reports.value.adsAccount&&ads&&reports.value.adsAccount.replace(/-/g,"")!==ads)throw new Error("الحساب لا يطابق تقارير عليا المحفوظة.");if(reports.value.gbpLocation&&gbp&&reports.value.gbpLocation!==gbp)throw new Error("الملف لا يطابق تقارير عليا المحفوظة.");
 const config:IntegrationConfig={adsAccount:ads,gbpLocation:gbp,verifiedBusiness:"دهانات عليا Alya Paints",updatedAt:new Date().toISOString()};await writeRecord("integration.json",config,current.version);return integrationSummary(config);
}
export async function refreshReportSnapshot(kind:string,from:string,to:string){
 reportDate(from);reportDate(to);if(from>to||Date.parse(to)-Date.parse(from)>93*86400000)throw new Error("اختر فترة لا تزيد على ٩٣ يومًا.");
 if(kind!=="ads")throw new Error("تقارير الملف التجاري متاحة بالاستيراد من قسم التقارير.");
 const current=await readReports();return{reports:current.value,reportsVersion:current.version};
}
