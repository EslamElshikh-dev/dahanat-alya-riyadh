import { requireSession, sameOrigin } from "@/lib/admin/auth";
import { readIntegration, integrationSummary, saveIntegration } from "@/lib/admin/reports";
import { bodyJson, adminJson, adminError } from "@/lib/admin/http";
export async function GET(){try{await requireSession();return adminJson(integrationSummary((await readIntegration()).value));}catch(error){return adminError(error);}}
export async function POST(request:Request){try{sameOrigin(request);await requireSession();return adminJson(await saveIntegration(await bodyJson(request)));}catch(error){return adminError(error);}}
