import type {Metadata} from "next";
import "@/app/admin/admin.css";
export const metadata:Metadata={title:"تسجيل الدخول | لوحة عليا",robots:{index:false,follow:false},alternates:{canonical:"/admin"}};
export default function AdminLayout({children}:{children:React.ReactNode}){return <>{children}</>;}
