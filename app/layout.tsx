import type { Metadata, Viewport } from "next";
import { Alexandria } from "next/font/google";
import { FloatingContact } from "@/components/floating-contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { site } from "@/data/site";
import "./globals.css";

const alexandria = Alexandria({
  subsets: ["arabic"],
  weight: "variable",
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "دهانات عليا Alya Paints | دهان وتشطيبات بالرياض",
    template: "%s | دهانات عليا",
  },
  description: site.description,
  applicationName: site.name,
  category: "Home Services",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: "a5AfDDI67VsUYxqSvx00gPy5bqSb1V9YoZ1DX8-GkxY",
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "/",
    siteName: site.name,
    title: "دهانات عليا Alya Paints | دهان وتشطيبات بالرياض",
    description: site.description,
    images: [{ url: "/hero-interior.webp", width: 1200, height: 630, alt: "دهانات عليا Alya Paints في الرياض" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "دهانات عليا Alya Paints | دهان وتشطيبات بالرياض",
    description: site.description,
    images: ["/hero-interior.webp"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171714",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={alexandria.variable}>
        <StructuredData />
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingContact />
      </body>
    </html>
  );
}
