import Link from "next/link";
export function BrandSymbol({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true"><path d="M7 52 26 14C29 8 33 7 37 11L42 19 24 52C21 57 11 58 7 52Z" fill="#235D71"/><path d="m35 12 22 37c4 7-2 11-9 8L30 27l5-15Z" fill="#DB684E"/><path d="M25 39c8-5 15-5 22 0l5 9c-10-5-21-4-33 2l6-11Z" fill="#F2C978"/></svg>;
}
export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return <Link href="/" className={`brand-mark ${inverse ? "brand-inverse" : ""}`} aria-label="دهانات عليا - الرئيسية"><span className="brand-symbol-wrap"><BrandSymbol className="brand-symbol"/></span><span className="brand-wordmark"><strong>دهانات عليا</strong><span dir="ltr">ALYA PAINTS</span></span></Link>;
}
