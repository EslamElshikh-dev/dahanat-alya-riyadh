import { revalidatePath } from "next/cache";
import { requireSession, sameOrigin } from "@/lib/admin/auth";
import { readCatalog, mutateCatalog } from "@/lib/admin/catalog";
import { bodyJson, adminJson, adminError } from "@/lib/admin/http";
export async function GET(){try{await requireSession();const r=await readCatalog();return adminJson({catalog:r.value,catalogVersion:r.version});}catch(error){return adminError(error);}}
export async function POST(request:Request){try{sameOrigin(request);await requireSession();const body=await bodyJson(request);const r=await mutateCatalog(String(body.action),body.product as Record<string,unknown>,String(body.version||""));revalidatePath("/","layout");revalidatePath("/sitemap.xml");return adminJson(r);}catch(error){return adminError(error);}}
