import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import sharp from "sharp";
import { requireSession, sameOrigin } from "@/lib/admin/auth";
import { adminJson, adminError } from "@/lib/admin/http";
export const runtime="nodejs";
export async function POST(request:Request){try{
 sameOrigin(request);await requireSession();if(Number(request.headers.get("content-length")||0)>4200000)throw new Error("الصورة أكبر من ٤ ميجابايت.");const form=await request.formData();const file=form.get("image");if(!(file instanceof File)||file.size>4000000||!file.size)throw new Error("اختر صورة حتى ٤ ميجابايت.");if(!["image/png","image/jpeg","image/webp"].includes(file.type))throw new Error("الصور المسموحة: PNG وJPG وWEBP.");
 const buffer=Buffer.from(await file.arrayBuffer());const img=sharp(buffer,{limitInputPixels:24000000});const info=await img.metadata();if(!["png","jpeg","webp"].includes(info.format||""))throw new Error("ملف الصورة غير صالح.");const webp=await img.rotate().resize(1400,1400,{fit:"inside",withoutEnlargement:true}).webp({quality:88}).toBuffer();
 const blob=await put(`alya-products/${randomUUID()}.webp`,webp,{access:"public",token:process.env.BLOB_READ_WRITE_TOKEN,contentType:"image/webp",addRandomSuffix:false,cacheControlMaxAge:31536000});return adminJson({url:blob.url});
}catch(error){return adminError(error);}}
