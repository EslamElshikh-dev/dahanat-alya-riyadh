import Link from "next/link";

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="دهانات عليا - الرئيسية">
      <span className="relative grid size-11 place-items-center overflow-hidden rounded-[14px] bg-[#b78a45] shadow-[0_8px_24px_rgba(183,138,69,.22)] transition-transform duration-300 group-hover:-rotate-2">
        <span className="absolute inset-x-0 bottom-0 h-3 bg-[#8f642b]" />
        <span className="relative text-xl font-black text-white">ع</span>
      </span>
      <span className="leading-tight">
        <span className={`block text-[1.05rem] font-black ${inverse ? "text-white" : "text-[#171714]"}`}>
          دهانات عليا
        </span>
        <span className={`block text-[.72rem] font-semibold tracking-[.08em] ${inverse ? "text-white/55" : "text-[#79684f]"}`}>
          ALYA PAINTS
        </span>
      </span>
    </Link>
  );
}
