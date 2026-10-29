"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Check, Copy, Code2, ExternalLink, FileSpreadsheet, LoaderCircle, RefreshCw, ShieldCheck} from "lucide-react";
import type {IntegrationSummary} from "@/lib/admin/types";

export function GoogleAdsConnection({integration,onRefresh}:{integration:IntegrationSummary;onRefresh:()=>Promise<void>}) {
  const router = useRouter();
  const [script,setScript] = useState("");
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState("");
  const [copied,setCopied] = useState(false);
  const received = integration.direct.receivedAt;
  const stale = integration.direct.stale;
  async function prepare() {
    setBusy(true);setError("");setCopied(false);
    try {
      const response = await fetch("/api/admin/ads-script",{method:"POST"});
      const body = await response.json();
      if (!response.ok) {if(response.status===401)router.push("/admin");throw new Error(body.error||"تعذّر تجهيز الكود.");}
      setScript(body.script);
    } catch(e) {setError(e instanceof Error?e.message:"تعذّر تجهيز الكود.");}
    finally {setBusy(false);}
  }
  async function copy() {
    try {await navigator.clipboard.writeText(script);setCopied(true);}
    catch {setError("تعذّر النسخ التلقائي. حدّد الكود وانسخه من المربع.");}
  }
  return <section className="admin-card integration-settings direct-ads-settings">
    <header className="admin-card-heading"><div><span className="admin-kicker">ربط مباشر · بدون اشتراك وسيط</span><h3>نتائج حملاتك، في لوحتك.</h3></div><span className="integration-status"><span className={`status-dot ${received&&!stale?"green":"amber"}`}/>{received?(stale?"التحديث متأخر":"تم استلام التقارير"):"بانتظار أول تقرير"}</span></header>
    <p className="settings-description">Google Ads Scripts يرسل الإنفاق والظهور والنقرات والتحويلات مباشرة من حساب دهانات عليا. آخر ٩٠ يومًا تُحدّث مع كل تشغيل، مع الاحتفاظ بالتاريخ السابق.</p>
    <div className="direct-ads-account"><span>حساب الإعلانات</span><strong dir="ltr">413-093-9368</strong></div>
    <div className="direct-ads-assurance"><ShieldCheck size={21}/><p>الكود يقرأ الأداء فقط. لا يغيّر الإعلانات أو الميزانية أو المزايدة أو مادة الاتصال.</p></div>
    <ol className="direct-ads-steps">
      <li>جهّز الكود هنا وانسخه إلى برنامج نصي جديد داخل حساب عليا في Google Ads، من «الأدوات ← الإجراءات المجمّعة ← البرامج النصية».</li>
      <li>امنح Google إذن تشغيله، ثم اختر «معاينة». المعاينة تختبر القراءة ولا ترسل بيانات للوحة.</li>
      <li>اختر «تشغيل» لاستلام أول تقرير، ثم اضبط التكرار كل ساعة أو يوميًا من Google Ads.</li>
    </ol>
    <div className="direct-ads-actions"><button className="admin-button admin-primary" disabled={busy||!integration.direct.available} onClick={prepare}>{busy?<LoaderCircle size={17} className="admin-spin"/>:<Code2 size={17}/>}تجهيز كود الربط</button><a href="https://ads.google.com/" target="_blank" rel="noopener noreferrer" className="admin-button admin-secondary">فتح Google Ads <ExternalLink size={15}/></a><button className="admin-button admin-secondary" onClick={()=>void onRefresh()}><RefreshCw size={15}/>فحص الاستلام</button></div>
    {!integration.direct.available&&<p className="admin-error">خدمة الربط غير جاهزة حاليًا. راجع إعدادات الخادم.</p>}
    {script&&<div className="direct-ads-code"><div><strong>كود مخصص لحساب عليا</strong><button className="admin-button admin-secondary" onClick={copy}>{copied?<Check size={15}/>:<Copy size={15}/>} {copied?"تم النسخ":"نسخ الكود"}</button></div><label htmlFor="alya-ads-script">احتفظ بالكود داخل حساب Google Ads؛ يتضمن رمزًا خاصًا لاستقبال تقاريرك.</label><textarea id="alya-ads-script" readOnly value={script} dir="ltr" spellCheck={false} autoComplete="off"/></div>}
    {error&&<p className="admin-error" role="alert">{error}</p>}
    <p className="direct-ads-receipt" role="status">{received?`آخر استلام: ${new Intl.DateTimeFormat("ar-SA",{timeZone:"Asia/Riyadh",dateStyle:"medium",timeStyle:"short"}).format(new Date(received))}`:"لم يصل تقرير مباشر بعد. الربط يُعدّ مكتملًا بعد نجاح أول تشغيل."}</p>
    <div className="integration-alternative"><FileSpreadsheet size={23}/><div><strong>الاستيراد والتصدير متاحان أيضًا.</strong><p>يمكن استيراد CSV من قسم الإعلانات أو الملف التجاري. التحويل المسجل لا يعني بالضرورة مكالمة مكتملة أو رسالة واتساب مرسلة.</p></div></div>
  </section>;
}
