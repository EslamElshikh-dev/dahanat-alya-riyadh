import { NextResponse } from "next/server";
import { AuthError, RateError } from "./auth";
import { StoreConflict } from "./storage";
export function adminJson(data:unknown,status=200){return NextResponse.json(data,{status,headers:{"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"}});}
export function adminError(error:unknown){const status=error instanceof AuthError?401:error instanceof StoreConflict?409:error instanceof RateError?429:400;return adminJson({error:error instanceof Error?error.message:"تعذّر إكمال الطلب."},status);}
export async function bodyJson(request:Request){if(Number(request.headers.get("content-length")||0)>1000000)throw new Error("الملف أكبر من الحد المسموح.");const text=await request.text();if(text.length>1000000)throw new Error("الملف أكبر من الحد المسموح.");return JSON.parse(text) as Record<string,unknown>;}
