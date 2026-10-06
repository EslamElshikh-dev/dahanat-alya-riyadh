import "server-only";
import { cookies } from "next/headers";
import { createHash, randomBytes, randomUUID, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { SignJWT, jwtVerify } from "jose";
import { readRecord, writeRecord, ensureRecord, StoreConflict } from "./storage";
const scrypt=promisify(scryptCb);
export const SESSION_COOKIE="alya_admin_session";
const age=8*60*60;
function key(){if(!process.env.ALYA_SESSION_SECRET)throw new Error("تسجيل الدخول غير متاح حاليًا.");return new TextEncoder().encode(process.env.ALYA_SESSION_SECRET);}
export async function validSession(){
 const token=(await cookies()).get(SESSION_COOKIE)?.value;if(!token)return false;
 try{const {payload}=await jwtVerify(token,key(),{algorithms:["HS256"],issuer:"alya-control-center",audience:"alya-admin"});if(payload.sub!=="admin"||typeof payload.jti!=="string")return false;const session=await readRecord<{expires:number;revoked:boolean}>(`sessions/${payload.jti}.json`);return!!session&&!session.value.revoked&&session.value.expires>Date.now();}catch{return false;}
}
export async function requireSession(){if(!await validSession())throw new AuthError();}
export class AuthError extends Error {constructor(){super("انتهت الجلسة. سجّل الدخول من جديد.");}}
export function sameOrigin(request:Request){const origin=request.headers.get("origin");if(!origin||origin!==new URL(request.url).origin)throw new Error("الطلب غير مسموح.");}
export async function throttleLogin(request:Request){
 const ip=request.headers.get("x-vercel-forwarded-for")||request.headers.get("x-forwarded-for")?.split(",")[0]||"unknown";
 const bucket=Math.floor(Date.now()/900000);const fingerprint=createHash("sha256").update(ip.trim()).digest("hex").slice(0,32);
 for(const scope of [fingerprint,"global"]){
   for(let attempt=0;attempt<4;attempt++){
     const path=`login/${bucket}-${scope}.json`;const r=await ensureRecord(path,{count:0});if(r.value.count>=(scope==="global"?150:12))throw new RateError();
     try{await writeRecord(path,{count:r.value.count+1},r.version);break;}catch(error){if(!(error instanceof StoreConflict)||attempt===3)throw new RateError();}
   }
 }
}
export class RateError extends Error{constructor(){super("محاولات كثيرة. أعد المحاولة بعد ١٥ دقيقة.");}}
export async function signIn(username:unknown,password:unknown){
 if(typeof username!=="string"||typeof password!=="string"||password.length>200)return false;
 const hash=process.env.ALYA_ADMIN_PASSWORD_HASH; if(!hash)throw new Error("تسجيل الدخول غير متاح حاليًا.");const [salt,expected]=hash.split(":");
 const actual=await scrypt(password,salt,64) as Buffer;const target=Buffer.from(expected,"hex");
 if(target.length!==actual.length||!timingSafeEqual(actual,target)||username.trim()!=="admin")return false;
 const id=randomUUID();const expires=Date.now()+age*1000;await writeRecord(`sessions/${id}.json`,{expires,revoked:false});
 const token=await new SignJWT({role:"admin",nonce:randomBytes(16).toString("hex")}).setProtectedHeader({alg:"HS256"}).setSubject("admin").setJti(id).setIssuedAt().setExpirationTime(Math.floor(expires/1000)).setIssuer("alya-control-center").setAudience("alya-admin").sign(key());
 (await cookies()).set(SESSION_COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:age});return true;
}
export async function signOut(){
 const jar=await cookies();const token=jar.get(SESSION_COOKIE)?.value;
 if(token){let id:string|undefined;try{const {payload}=await jwtVerify(token,key(),{algorithms:["HS256"],issuer:"alya-control-center",audience:"alya-admin"});id=typeof payload.jti==="string"?payload.jti:undefined;}catch{}
  if(id){const r=await readRecord<{expires:number;revoked:boolean}>(`sessions/${id}.json`);if(r)await writeRecord(`sessions/${id}.json`,{...r.value,revoked:true},r.version);}}
 jar.delete(SESSION_COOKIE);
}
