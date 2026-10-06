import "server-only";
import { cache } from "react";
import { randomUUID } from "node:crypto";
import { products, getProductTheme } from "@/data/products";
import { productAnchor } from "@/data/product-display";
import { ensureRecord, writeRecord, StoreConflict } from "./storage";
import type { ManagedProduct, ProductStore } from "./types";
const epoch="2026-10-06T12:38:09.000Z";
export const initialCatalog:ProductStore={products:products.map((p,i)=>({...p,id:`catalog-${p.slug}`,price:null,availability:"unspecified",status:"published",featured:[4,5,9,10].includes(i),packshotKey:p.name,customImage:false,...getProductTheme(p.name),createdAt:epoch,updatedAt:epoch})),activity:[],updatedAt:epoch};
export const readCatalog=cache(async()=>ensureRecord<ProductStore>("catalog.json",initialCatalog));
export const publicProducts=cache(async()=>{const {value}=await readCatalog();return value.products.filter(p=>p.status==="published");});
export async function publicProduct(slug:string){return (await publicProducts()).find(p=>p.slug===slug);}
function cleanText(input:unknown,label:string,min:number,max:number){if(typeof input!=="string")throw new Error(`${label} غير صالح.`);const value=input.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,"");if(value.length<min||value.length>max)throw new Error(`${label} يجب أن يكون بين ${min} و${max} حرف.`);return value;}
export function validateProduct(input:Record<string,unknown>,existing?:ManagedProduct):ManagedProduct{
  const title=cleanText(input.title,"اسم المنتج",2,120); const name=cleanText(input.name||title,"الاسم الإنجليزي",2,120);
  const use=cleanText(input.use,"الاستخدام المختصر",2,240); const description=cleanText(input.description,"وصف المنتج",10,3000);
  const image=cleanText(input.image,"صورة المنتج",1,600);
  const local=/^\/(catalog-previews|product-originals)\/[a-z0-9-]+\.(webp|png|jpg)$/.test(image);
  const mediaHost=process.env.ALYA_MEDIA_HOST;
  if(!local){let url;try{url=new URL(image);}catch{throw new Error("ارفع صورة للمنتج من اللوحة.");}if(url.protocol!=="https:"||url.hostname!==mediaHost||!url.pathname.startsWith("/alya-products/"))throw new Error("الصورة يجب أن تكون مرفوعة من لوحة عليا.");}
  let price:number|null=null;if(input.price!==""&&input.price!==null&&input.price!==undefined){price=Number(input.price);if(!Number.isFinite(price)||price<0||price>1000000||Math.round(price*100)/100!==price)throw new Error("السعر غير صالح. استخدم رقمًا حتى منزلتين عشريتين.");}
  const collection=input.collection==="Alya Thermal"?"Alya Thermal":"Alya Paints";
  if(!["published","draft"].includes(String(input.status)))throw new Error("حالة المنتج غير صالحة.");
  const availability=["unspecified","in-stock","out-of-stock","preorder"].includes(String(input.availability))?input.availability as ManagedProduct["availability"]:"unspecified";
  const now=new Date().toISOString(); const palette=getProductTheme(existing?.packshotKey||name);
  return {id:existing?.id||randomUUID(),slug:existing?.slug||`${productAnchor(name)||"alya-product"}-${randomUUID().slice(0,8)}`,name,title,use,description,image,page:existing?.page||0,collection,category:collection==="Alya Thermal"?"الطلاءات والحماية":"الدهانات والتأسيس",price,availability,status:input.status as "published"|"draft",featured:input.featured===true,packshotKey:existing?.packshotKey,customImage:!local||existing?.customImage===true,tone:existing?.tone||palette.tone,accent:existing?.accent||palette.accent,createdAt:existing?.createdAt||now,updatedAt:now};
}
export async function mutateCatalog(action:string,input:Record<string,unknown>,version:string){
  const current=await ensureRecord<ProductStore>("catalog.json",initialCatalog);if(current.version!==version)throw new StoreConflict();
  const store=structuredClone(current.value);const existing=store.products.find(p=>p.id===input.id);let subject="";
  if(action==="create"){const p=validateProduct(input);if(store.products.length>=500)throw new Error("وصلت إلى الحد الأقصى للمنتجات.");store.products.push(p);subject=p.title;}
  else {if(!existing)throw new Error("المنتج غير موجود.");subject=existing.title;
    if(action==="update"){if(existing.status==="deleted")throw new Error("استرجع المنتج أولًا.");store.products[store.products.indexOf(existing)]=validateProduct(input,existing);}
    else if(action==="delete"){existing.status="deleted";existing.deletedAt=new Date().toISOString();existing.updatedAt=existing.deletedAt;}
    else if(action==="restore"){existing.status="draft";delete existing.deletedAt;existing.updatedAt=new Date().toISOString();}
    else throw new Error("الإجراء غير صالح.");
  }
  store.updatedAt=new Date().toISOString();store.activity.unshift({id:randomUUID(),action:({create:"أُضيف منتج",update:"عُدّل منتج",delete:"نُقل إلى المحذوفات",restore:"استُرجع كمسودة"} as Record<string,string>)[action],subject,at:store.updatedAt});store.activity=store.activity.slice(0,100);
  const nextVersion=await writeRecord("catalog.json",store,current.version);return{catalog:store,catalogVersion:nextVersion};
}
