import type {Metadata} from "next";
import { redirect } from "next/navigation";
import { validSession } from "@/lib/admin/auth";
import "@/app/admin/admin.css";
export const metadata:Metadata={title:"لوحة قيادة عليا",robots:{index:false,follow:false},alternates:{canonical:"/dashboard"}};
export default async function DashboardLayout({children}:{children:React.ReactNode}){if(!await validSession())redirect("/admin");return <>{children}</>;}
