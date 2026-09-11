import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="soft-grid grid min-h-[70svh] place-items-center bg-[#f4fafb] px-5 py-20 text-center">
      <div><p className="text-sm font-black text-[#0b789e]">404</p><h1 className="mt-3 text-4xl font-black text-[#071828]">الصفحة غير موجودة</h1><p className="mt-4 text-[#617884]">يمكنك العودة للرئيسية أو استعراض منتجات كيميا عليا.</p><Button asChild size="lg" className="mt-7 h-12 rounded-full bg-[#071828] px-7"><Link href="/">العودة للرئيسية <ArrowLeft /></Link></Button></div>
    </main>
  );
}
