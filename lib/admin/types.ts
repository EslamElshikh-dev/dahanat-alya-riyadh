import type { CatalogProduct } from "@/data/catalogs";
export type ProductStatus = "published" | "draft" | "deleted";
export type ManagedProduct = CatalogProduct & {
  id: string; slug: string; collection: string; category: string; price: number | null;
  availability: "unspecified" | "in-stock" | "out-of-stock" | "preorder";
  status: ProductStatus; featured: boolean; packshotKey?: string; customImage?: boolean;
  tone: string; accent: string; createdAt: string; updatedAt: string; deletedAt?: string;
};
export type Activity = { id: string; action: string; subject: string; at: string };
export type ProductStore = { products: ManagedProduct[]; activity: Activity[]; updatedAt: string };
export type AdsRow = {date:string; campaign:string; campaignId:string; impressions:number; clicks:number; spend:number; conversions:number; currency:string};
export type GbpRow = {date:string; views:number; calls:number; websiteClicks:number; directions:number};
export type ReportStore = {ads:AdsRow[]; gbp:GbpRow[]; adsAccount:string; gbpLocation:string; adsSource:string; gbpSource:string; adsUpdatedAt:string|null; gbpUpdatedAt:string|null};
export type IntegrationConfig = {windsorKey:string; adsAccount:string; gbpLocation:string; verifiedBusiness:string; updatedAt:string|null};
export type AdminSnapshot = {catalog:ProductStore; catalogVersion:string; reports:ReportStore; reportsVersion:string; integration:{configured:boolean; adsAccount:string; gbpLocation:string; updatedAt:string|null; keyPresent:boolean}; business:{name:string; phone:string; address:string; hours:string; mapsUrl:string}};
