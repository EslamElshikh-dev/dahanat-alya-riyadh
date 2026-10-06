import { requireSession, sameOrigin } from "@/lib/admin/auth";
import { readReports, saveReport } from "@/lib/admin/reports";
import { parseCsv } from "@/lib/admin/csv";
import { bodyJson, adminJson, adminError } from "@/lib/admin/http";
export async function GET(){try{await requireSession();const r=await readReports();return adminJson({reports:r.value,reportsVersion:r.version});}catch(error){return adminError(error);}}
export async function POST(request:Request){try{sameOrigin(request);await requireSession();const body=await bodyJson(request);const rows=parseCsv(String(body.csv||""));const r=await saveReport(String(body.kind),rows,String(body.identity||""),"استيراد تقرير CSV",String(body.version||""));return adminJson(r);}catch(error){return adminError(error);}}
