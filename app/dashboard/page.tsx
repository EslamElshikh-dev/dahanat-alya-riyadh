import { requireSession } from "@/lib/admin/auth";
import { readCatalog } from "@/lib/admin/catalog";
import { readReports, readIntegration, integrationSummary } from "@/lib/admin/reports";
import { site,businessLocation } from "@/data/site";
import { AdminDashboard } from "@/components/admin/dashboard";
export const dynamic="force-dynamic";
export default async function DashboardPage({searchParams}:{searchParams:Promise<{view?:string}>}){
 await requireSession();const [{value:catalog,version:catalogVersion},{value:reports,version:reportsVersion},{value:integration},params]=await Promise.all([readCatalog(),readReports(),readIntegration(),searchParams]);
 return <AdminDashboard initialView={params.view||"overview"} initial={{catalog,catalogVersion,reports,reportsVersion,integration:integrationSummary(integration),business:{name:site.name,phone:site.phoneRaw,address:businessLocation.address,hours:businessLocation.hours.shortDisplay,mapsUrl:businessLocation.mapsUrl}}}/>;
}
