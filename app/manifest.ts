import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "دهانات عليا",
    short_name: "دهانات عليا",
    description: "دهانات وتشطيبات وديكورات في الرياض",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfaf7",
    theme_color: "#171714",
    lang: "ar",
    dir: "rtl",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
