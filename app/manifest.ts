import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ALYA CHEMICAL For Industry Ltd.",
    short_name: "ALYA CHEMICAL",
    description: "أنظمة العزل الحراري والمائي والدهانات والتكسيات المعمارية المتطورة.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4fafb",
    theme_color: "#071828",
    lang: "ar",
    dir: "rtl",
    icons: [{ src: "/alya-mark.png", sizes: "any", type: "image/png" }],
  };
}
