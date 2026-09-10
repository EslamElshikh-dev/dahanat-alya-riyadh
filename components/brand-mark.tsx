import Link from "next/link";
import { PaintRoller } from "lucide-react";

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="brand-mark group inline-flex items-center gap-3" aria-label="دهانات عليا - الرئيسية">
      <span className="brand-symbol relative grid size-12 place-items-center overflow-hidden rounded-[16px] bg-[#d5a557] text-[#17201c] shadow-[0_12px_32px_rgba(180,128,45,.2)]">
        <span className="absolute inset-x-0 bottom-0 h-[7px] bg-[#b47b28]" />
        <span className="brand-symbol-icon relative grid size-8 place-items-center rounded-xl bg-white/82">
          <PaintRoller className="size-[18px]" strokeWidth={2.2} aria-hidden="true" />
        </span>
      </span>
      <span className="leading-[1.15]">
        <span className={`block text-[1.04rem] font-black tracking-[-.02em] ${inverse ? "text-white" : "text-[#17201c]"}`}>
          دهانات عليا
        </span>
        <span className={`mt-1 block text-[.66rem] font-bold tracking-[.15em] ${inverse ? "text-white/48" : "text-[#7c6b53]"}`}>
          ALYA PAINTS
        </span>
      </span>
    </Link>
  );
}
