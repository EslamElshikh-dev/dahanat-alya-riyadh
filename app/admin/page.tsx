import { redirect } from "next/navigation";
import { validSession } from "@/lib/admin/auth";
import { AdminLogin } from "@/components/admin/login";
export const dynamic="force-dynamic";
export default async function AdminPage(){if(await validSession())redirect("/dashboard");return <AdminLogin/>;}
