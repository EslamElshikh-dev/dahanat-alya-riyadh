"use client";

import { useState } from "react";
import { BookOpen, ExternalLink } from "lucide-react";

export function CatalogViewer({ file, title }: { file: string; title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#17201c]/10 bg-[#f4f2eb]">
      {open ? (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#17201c]/10 bg-white px-5 py-4">
            <p className="text-sm font-black text-[#17201c]">{title}</p>
            <a href={file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#946a2c]">فتح بحجم كامل<ExternalLink className="size-4" aria-hidden="true" /></a>
          </div>
          <iframe src={`${file}#view=FitH`} title={`معاينة ${title}`} className="catalog-reader block w-full border-0" />
          <p className="bg-white px-5 py-4 text-sm leading-7 text-[#647068]">إذا لم تظهر المعاينة على جهازك، استخدم <a href={file} target="_blank" rel="noopener noreferrer" className="font-black text-[#946a2c] underline underline-offset-4">فتح ملف PDF</a> أو زر التحميل.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center px-6 py-12 text-center sm:py-16">
          <span className="grid size-16 place-items-center rounded-2xl bg-[#17201c] text-[#dfb877]"><BookOpen className="size-7" aria-hidden="true" /></span>
          <h3 className="mt-5 text-xl font-black text-[#17201c]">تصفح الكتالوج هنا</h3>
          <p className="mt-3 max-w-md text-sm leading-7 text-[#647068]">اطلع على صفحات الكتالوج والمواصفات، أو افتح الملف في قارئ PDF على جهازك.</p>
          <button type="button" onClick={() => setOpen(true)} className="mt-6 min-h-12 rounded-xl bg-[#17201c] px-7 text-sm font-black text-white hover:bg-[#2b3b30]" aria-expanded={open}>ابدأ المعاينة</button>
        </div>
      )}
    </div>
  );
}
