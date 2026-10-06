import { sameOrigin, throttleLogin, signIn } from "@/lib/admin/auth";
import { bodyJson, adminJson, adminError } from "@/lib/admin/http";
export async function POST(request:Request){try{sameOrigin(request);await throttleLogin(request);const body=await bodyJson(request);if(!await signIn(body.username,body.password))return adminJson({error:"اسم المستخدم أو كلمة المرور غير صحيحة."},401);return adminJson({ok:true});}catch(error){return adminError(error);}}
