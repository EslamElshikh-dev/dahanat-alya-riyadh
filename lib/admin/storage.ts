import "server-only";
import { get, put, BlobPreconditionFailedError, BlobNotFoundError } from "@vercel/blob";
export class StoreConflict extends Error { constructor(){super("تم تحديث البيانات في جلسة أخرى. حدّث الصفحة ثم أعد المحاولة.");} }
export function dataToken(){ const token=process.env.ALYA_DATA_BLOB_TOKEN; if(!token)throw new Error("التخزين غير متاح حاليًا."); return token; }
export async function readRecord<T>(path:string):Promise<{value:T; version:string}|null>{
  try { const blob=await get(`alya/${path}`,{access:"private",token:dataToken(),useCache:false});
    if(!blob||blob.statusCode!==200||!blob.stream)return null;
    return {value:JSON.parse(await new Response(blob.stream).text()) as T,version:blob.blob.etag};
  } catch(error){if(error instanceof BlobNotFoundError)return null;throw error;}
}
export async function writeRecord<T>(path:string,value:T,version?:string){
  try{ const blob=await put(`alya/${path}`,JSON.stringify(value),{access:"private",token:dataToken(),addRandomSuffix:false,allowOverwrite:!!version,...(version?{ifMatch:version}:{}),contentType:"application/json",cacheControlMaxAge:60});return blob.etag;
  }catch(error){if(error instanceof BlobPreconditionFailedError || String(error).includes("already exists"))throw new StoreConflict();throw error;}
}
export async function ensureRecord<T>(path:string,initial:T){
  const existing=await readRecord<T>(path); if(existing)return existing;
  try{const version=await writeRecord(path,initial);return {value:initial,version};}
  catch(error){if(error instanceof StoreConflict){const current=await readRecord<T>(path);if(current)return current;}throw error;}
}
