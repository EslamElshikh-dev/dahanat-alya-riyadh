import type { Metadata, Viewport } from "next";
import { Alexandria, Manrope } from "next/font/google";
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

const manrope = Manrope({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-english",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "كيميا عليا | أنظمة العزل والدهانات المتطورة",
    template: "%s | ALYA CHEMICAL",
  },
  description: site.description,
  applicationName: site.name,
  category: "Construction Chemicals",
  alternates: {
    canonical: "/",
    languages: { "ar-SA": "/", "en-SA": "/en" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: site.brandName,
    title: "كيميا عليا | أنظمة العزل والدهانات المتطورة",
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: "كيميا عليا | أنظمة العزل والدهانات المتطورة",
    description: site.description,
  },
  icons: { icon: "/alya-mark.png", shortcut: "/alya-mark.png", apple: "/alya-mark.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071828",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${alexandria.variable} ${manrope.variable}`}>
        <StructuredData />
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingContact />
      </body>
    </html>
  );
}
