import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import { prepareProductImage } from "@/lib/admin/product-image";
import { requireSession, sameOrigin } from "@/lib/admin/auth";
import { adminJson, adminError } from "@/lib/admin/http";
export const runtime="nodejs";
export const maxDuration=60;
export async function POST(request:Request){try{
 sameOrigin(request);await requireSession();if(Number(request.headers.get("content-length")||0)>4200000)throw new Error("الصورة أكبر من ٤ ميجابايت.");const form=await request.formData();const file=form.get("image");if(!(file instanceof File)||file.size>4000000||!file.size)throw new Error("اختر صورة حتى ٤ ميجابايت.");if(!["image/png","image/jpeg","image/webp"].includes(file.type))throw new Error("الصور المسموحة: PNG وJPG وWEBP.");
 const buffer=Buffer.from(await file.arrayBuffer());const prepared=await prepareProductImage(buffer);const id=randomUUID();const options={access:"public" as const,token:process.env.BLOB_READ_WRITE_TOKEN,addRandomSuffix:false,cacheControlMaxAge:31536000};
 const extension=file.type==="image/jpeg"?"jpg":file.type==="image/png"?"png":"webp";
 const original=await put(`alya-products/originals/${id}.${extension}`,buffer,{...options,contentType:file.type});
 const blob=await put(`alya-products/${id}.webp`,prepared.image,{...options,contentType:"image/webp"});return adminJson({url:blob.url,originalUrl:original.url,width:prepared.width,height:prepared.height,backgroundRemoved:prepared.backgroundRemoved});
}catch(error){return adminError(error);}}
