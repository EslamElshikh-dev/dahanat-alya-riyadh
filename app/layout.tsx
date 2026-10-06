import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Tajawal } from "next/font/google";
import { FloatingContact } from "@/components/floating-contact";
import { SiteFooter } from "@/components/site-footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { site } from "@/data/site";
import "./globals.css";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const heading = Tajawal({
  subsets: ["arabic"],
  weight: ["500", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "دهانات عليا Alya Paints | متجر دهانات بالرياض",
    template: "%s | دهانات عليا",
  },
  description: site.description,
  applicationName: site.name,
  category: site.category,
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
    title: "دهانات عليا Alya Paints | متجر دهانات بالرياض",
    description: site.description,
    images: [{ url: "/hero-color-story.webp", width: 1536, height: 1024, alt: "دهانات عليا Alya Paints في الرياض" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "دهانات عليا Alya Paints | متجر دهانات بالرياض",
    description: site.description,
    images: ["/hero-color-story.webp"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#235d71",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${arabic.variable} ${heading.variable}`}>
        <StructuredData />
        <SiteHeader />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <SiteFooter />
        <FloatingContact />
        <ScrollReveal />
      </body>
    </html>
  );
}

