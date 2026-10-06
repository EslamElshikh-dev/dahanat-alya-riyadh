import { requireSession, sameOrigin } from "@/lib/admin/auth";
import { syncGoogle } from "@/lib/admin/reports";
import { bodyJson, adminJson, adminError } from "@/lib/admin/http";
export const maxDuration=60;
export async function POST(request:Request){try{sameOrigin(request);await requireSession();const body=await bodyJson(request);if(!["ads","gbp"].includes(String(body.kind)))throw new Error("المصدر غير صالح.");return adminJson(await syncGoogle(String(body.kind),String(body.from),String(body.to)));}catch(error){return adminError(error);}}
