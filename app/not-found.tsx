import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="soft-grid grid min-h-[70svh] place-items-center bg-[#f3ede3] px-5 py-20 text-center">
      <div><p className="text-sm font-black text-[#a27638]">404</p><h1 className="mt-3 text-4xl font-black">الصفحة غير موجودة</h1><p className="mt-4 text-[#6d6357]">يمكنك العودة للرئيسية أو استعراض جميع خدمات دهانات عليا.</p><Button asChild size="lg" className="mt-7 h-12 rounded-full px-7"><Link href="/">العودة للرئيسية <ArrowLeft /></Link></Button></div>
    </main>
  );
}
