import {test} from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import {applyAdsPush, authorizeAdsPush, readAdsPushBody, reportCredential, validateAdsPush} from "../lib/admin/ads-push";
import {ALYA_ADS_ACCOUNT, ADS_REPORT_ENDPOINT, googleAdsReportScript} from "../lib/admin/ads-script-source";
import {emptyReports} from "../lib/admin/reports";
import {POST} from "../app/api/integrations/google-ads/report/route";

const now=Date.now();
const generatedAt=new Date(now).toISOString();
const row={date:"2026-10-01",campaignId:"24361680145",campaign:"Alya",currency:"SAR",impressions:100,clicks:8,spend:19.5,conversions:1.5};
const payload={schemaVersion:1,accountId:ALYA_ADS_ACCOUNT,currency:"SAR",timeZone:"Asia/Riyadh",generatedAt,from:"2026-10-01",to:"2026-10-02",rows:[row]};

test("report credential is scoped and wrong credentials fail before storage access",async()=>{
  const secret="test-session-secret-with-enough-entropy";
  const token=reportCredential(secret);
  assert.notEqual(token,secret);
  assert.equal(authorizeAdsPush(`Bearer ${token}`,secret),true);
  for(const header of [null,"Bearer wrong",`Basic ${token}`,`Bearer ${token}extra`])assert.equal(authorizeAdsPush(header,secret),false);
  const response=await POST(new Request(ADS_REPORT_ENDPOINT,{method:"POST",body:"{}"}));
  assert.equal(response.status,401);
  assert.deepEqual(await response.json(),{error:"غير مصرح."});
});

test("push rejects other accounts, currency, stale timestamps, duplicates and out-of-window rows",()=>{
  assert.equal(validateAdsPush(payload,now).rows[0].conversions,1.5);
  for(const invalid of [
    {...payload,accountId:"9393644523"}, {...payload,currency:"USD"}, {...payload,timeZone:"UTC"},
    {...payload,generatedAt:new Date(now-3*3600000).toISOString()},
    {...payload,generatedAt:new Date(now+6*60000).toISOString()},
    {...payload,rows:[row,row]}, {...payload,rows:[{...row,date:"2026-09-30"}]},
    {...payload,rows:[{...row,spend:-1}]}, {...payload,rows:[{...row,impressions:1.5}]},
    {...payload,rows:[{...row,currency:"USD"}]}, {...payload,rows:[null]},
    {...payload,from:"2026-02-31"}
  ])assert.throws(()=>validateAdsPush(invalid,now));
});

test("complete snapshots reconcile removals and late conversions without duplicating or losing older/GBP data",()=>{
  const gbp=[{date:"2026-10-01",views:25,calls:2,websiteClicks:3,directions:1}];
  const current={...emptyReports,ads:[{...row,date:"2026-09-01"},{...row,conversions:0},{...row,date:"2026-10-02"}],gbp};
  const report=validateAdsPush(payload,now);
  const next=applyAdsPush(current,report);
  assert.equal(next.changed,true);
  assert.equal(next.value.ads.length,2);
  assert.equal(next.value.ads[1].conversions,1.5);
  assert.deepEqual(next.value.gbp,gbp);
  assert.equal(current.ads.length,3);
  assert.equal(applyAdsPush(next.value,report).changed,false);
  const stale={...report,generatedAt:new Date(now-1000).toISOString()};
  assert.equal(applyAdsPush(next.value,stale).changed,false);
  assert.throws(()=>applyAdsPush(next.value,{...report,rows:[]}));
  const empty=applyAdsPush(next.value,{...report,generatedAt:new Date(now+1000).toISOString(),rows:[]});
  assert.equal(empty.value.ads.length,1);
  assert.equal(empty.value.ads[0].date,"2026-09-01");
  assert.throws(()=>applyAdsPush({...current,adsAccount:"9393644523"},report));
});

test("webhook body limits are enforced with and without Content-Length",async()=>{
  const request=(body:string,headers:Record<string,string>={})=>new Request(ADS_REPORT_ENDPOINT,{method:"POST",headers:{"content-type":"application/json",...headers},body});
  assert.deepEqual(await readAdsPushBody(request('{"rows":[]}')),{rows:[]});
  await assert.rejects(()=>readAdsPushBody(request("not json")));
  await assert.rejects(()=>readAdsPushBody(request(" ".repeat(1000001))),{status:413});
  await assert.rejects(()=>readAdsPushBody(request("{}",{"content-length":"1000001"})),{status:413});
});

function executeScript({preview=false,account=ALYA_ADS_ACCOUNT,status=200}={}) {
  const calls:{url:string;options:Record<string,unknown>}[]=[];
  const queries:string[]=[];
  const logs:string[]=[];
  const source=[{segments:{date:"2026-10-01"},campaign:{id:24361680145,name:"Alya"},metrics:{impressions:100,clicks:8,costMicros:19500000,conversions:1.5}}];
  const allowed={currentAccount:()=>({getCustomerId:()=>account,getCurrencyCode:()=>"SAR",getTimeZone:()=>"Asia/Riyadh"}),
    getExecutionInfo:()=>({isPreview:()=>preview}),search:(q:string)=>{queries.push(q);let index=0;return{hasNext:()=>index<source.length,next:()=>source[index++]};}};
  const context=vm.createContext({AdsApp:new Proxy(allowed,{get(target,key){assert.ok(key in target,`Unexpected Google Ads operation: ${String(key)}`);return Reflect.get(target,key);}}),
    Utilities:{formatDate:()=>"2026-10-02"},Logger:{log:(message:string)=>logs.push(message)},
    UrlFetchApp:{fetch:(url:string,options:Record<string,unknown>)=>{calls.push({url,options});return{getResponseCode:()=>status,getContentText:()=>'{"ok":true}'};}}});
  const script=googleAdsReportScript("test-report-token");
  vm.runInContext(script,context);
  return{run:()=>vm.runInContext("main()",context),calls,queries,logs};
}

test("generated script reads performance only and converts micro-SAR correctly",()=>{
  const result=executeScript();result.run();
  assert.equal(result.queries.length,1);
  assert.match(result.queries[0],/^SELECT .* FROM campaign WHERE /);
  assert.equal(result.calls.length,1);
  assert.equal(result.calls[0].url,ADS_REPORT_ENDPOINT);
  assert.equal(result.calls[0].options.followRedirects,false);
  const report=JSON.parse(String(result.calls[0].options.payload));
  assert.equal(report.rows[0].spend,19.5);
  assert.equal(report.rows[0].conversions,1.5);
  assert.equal(report.accountId,ALYA_ADS_ACCOUNT);
  assert.equal(result.logs.some(message=>message.includes("test-report-token")),false);
});

test("preview sends nothing; wrong account and failed delivery cannot be reported as successful",()=>{
  const preview=executeScript({preview:true});preview.run();assert.equal(preview.calls.length,0);
  const wrong=executeScript({account:"9393644523"});assert.throws(wrong.run);assert.equal(wrong.calls.length,0);assert.equal(wrong.queries.length,0);
  const failed=executeScript({status:503});assert.throws(failed.run);assert.equal(failed.logs.length,0);
});
