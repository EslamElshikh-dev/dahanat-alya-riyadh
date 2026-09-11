import Image from "next/image";
import Link from "next/link";

export function BrandMark({ inverse = false, href = "/" }: { inverse?: boolean; href?: string }) {
  return (
    <Link
      href={href}
      className={`brand-mark inline-flex shrink-0 items-center rounded-2xl px-2.5 py-2 transition-transform duration-300 hover:-translate-y-0.5 ${inverse ? "bg-white" : "bg-white/92"}`}
      aria-label="ALYA CHEMICAL - Home"
    >
      <Image
        src="/brand/alya-chemical.webp"
        alt="ALYA CHEMICAL For Industry Ltd."
        width={456}
        height={129}
        priority
        className="h-auto w-[154px] sm:w-[180px]"
      />
    </Link>
  );
}
