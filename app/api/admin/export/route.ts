import { NextResponse } from "next/server";
import { requireSession } from "@/lib/admin/auth";
import { readReports } from "@/lib/admin/reports";
import { readCatalog } from "@/lib/admin/catalog";
import { csvExport } from "@/lib/admin/csv";
import { adminError } from "@/lib/admin/http";
export async function GET(request:Request){try{await requireSession();const url=new URL(request.url);const kind=url.searchParams.get("kind");if(kind==="products"){const {value}=await readCatalog();return new NextResponse(JSON.stringify(value.products,null,2),{headers:{"Content-Type":"application/json; charset=utf-8","Content-Disposition":'attachment; filename="alya-products.json"',"Cache-Control":"private, no-store"}});}
 const {value}=await readReports();const from=url.searchParams.get("from")||"";const to=url.searchParams.get("to")||"9999-12-31";const ads=kind==="ads";const rows=(ads?value.ads:value.gbp).filter(r=>r.date>=from&&r.date<=to);const headers=ads?["date","campaign","campaignId","impressions","clicks","spend","conversions","currency"]:["date","views","calls","websiteClicks","directions"];return new NextResponse(csvExport(rows as unknown as Record<string,unknown>[],headers),{headers:{"Content-Type":"text/csv; charset=utf-8","Content-Disposition":`attachment; filename="alya-${ads?"ads":"google-profile"}.csv"`,"Cache-Control":"private, no-store"}});
 }catch(error){return adminError(error);}}
