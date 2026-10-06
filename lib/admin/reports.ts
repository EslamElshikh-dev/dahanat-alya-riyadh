import "server-only";
import { ensureRecord, writeRecord, StoreConflict } from "./storage";
import type { AdsRow, GbpRow, ReportStore, IntegrationConfig } from "./types";
export const emptyReports:ReportStore={ads:[],gbp:[],adsAccount:"",gbpLocation:"",adsSource:"",gbpSource:"",adsUpdatedAt:null,gbpUpdatedAt:null};
export const emptyIntegration:IntegrationConfig={windsorKey:"",adsAccount:"",gbpLocation:"",verifiedBusiness:"",updatedAt:null};
export async function readReports(){return ensureRecord<ReportStore>("reports.json",emptyReports);}
export async function readIntegration(){return ensureRecord<IntegrationConfig>("integration.json",emptyIntegration);}
export function integrationSummary(config:IntegrationConfig){return{configured:!!config.windsorKey&&!!(config.adsAccount||config.gbpLocation),keyPresent:!!config.windsorKey,adsAccount:config.adsAccount,gbpLocation:config.gbpLocation,updatedAt:config.updatedAt};}
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
 const current=await readIntegration();const key=input.clearKey===true?"":typeof input.windsorKey==="string"&&input.windsorKey.trim()?input.windsorKey.trim():current.value.windsorKey;
 if(key.length>300||/[\r\n]/.test(key))throw new Error("مفتاح الربط غير صالح.");const ads=String(input.adsAccount||"").replace(/-/g,"").trim();const gbp=String(input.gbpLocation||"").trim();
 if(ads&&!/^\d{10}$/.test(ads))throw new Error("معرّف Google Ads يجب أن يتكوّن من ١٠ أرقام.");if(gbp&&!/^locations\/\d+$/.test(gbp))throw new Error("معرّف الملف يجب أن يكون بصيغة locations/123456789.");
 if(input.confirmBusiness!==true)throw new Error("أكّد أن الحساب والملف يخصان دهانات عليا.");const reports=await readReports();if(reports.value.adsAccount&&ads&&reports.value.adsAccount.replace(/-/g,"")!==ads)throw new Error("الحساب لا يطابق تقارير عليا المحفوظة.");if(reports.value.gbpLocation&&gbp&&reports.value.gbpLocation!==gbp)throw new Error("الملف لا يطابق تقارير عليا المحفوظة.");
 const config:IntegrationConfig={windsorKey:key,adsAccount:ads,gbpLocation:gbp,verifiedBusiness:"دهانات عليا Alya Paints",updatedAt:new Date().toISOString()};await writeRecord("integration.json",config,current.version);return integrationSummary(config);
}
export async function syncGoogle(kind:string,from:string,to:string){
 reportDate(from);reportDate(to);if(from>to||Date.parse(to)-Date.parse(from)>93*86400000)throw new Error("اختر فترة لا تزيد على ٩٣ يومًا.");
 const {value:config}=await readIntegration();if(!config.windsorKey)throw new Error("أكمل مفتاح الربط من الإعدادات، أو استورد تقرير CSV.");const account=kind==="ads"?config.adsAccount:config.gbpLocation;if(!account)throw new Error("حدد حساب عليا في إعدادات الربط أولًا.");
 const connector=kind==="ads"?"google_ads":"google_my_business";
 const fields=kind==="ads"?"date,account_name,campaign,campaign_id,impressions,clicks,spend,conversions,currency":"date,location_id,location_title,location_primary_phone,impressions,call_clicks,website_clicks,direction_requests";
 const url=new URL(`https://connectors.windsor.ai/${connector}`);url.search=new URLSearchParams({api_key:config.windsorKey,date_from:from,date_to:to,fields,select_accounts:account}).toString();
 const response=await fetch(url,{cache:"no-store",signal:AbortSignal.timeout(45000)});if(!response.ok)throw new Error("تعذّرت المزامنة. راجع صلاحية الربط ومعرّف الحساب ثم أعد المحاولة.");const body=await response.json();if(!Array.isArray(body.data))throw new Error("البيانات غير جاهزة لدى مصدر الربط. أعد المزامنة لاحقًا.");if(!body.data.length)throw new Error("لم يُرجع Google بيانات لهذه الفترة. لم تُستبدل التقارير المحفوظة.");
 if(kind==="gbp"&&body.data.some((r:Record<string,unknown>)=>String(r.location_id)!==account||!String(r.location_title||"").includes("عليا")||String(r.location_primary_phone||"").replace(/\D/g,"").slice(-9)!=="552980261"))throw new Error("الملف المسترجع لا يطابق اسم وهاتف دهانات عليا.");
 const current=await readReports();return saveReport(kind,body.data,account,"مزامنة Google عبر Windsor.ai",current.version);
}
