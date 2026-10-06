import { sameOrigin, signOut } from "@/lib/admin/auth";
import { adminJson, adminError } from "@/lib/admin/http";
export async function POST(request:Request){try{sameOrigin(request);await signOut();return adminJson({ok:true});}catch(error){return adminError(error);}}
