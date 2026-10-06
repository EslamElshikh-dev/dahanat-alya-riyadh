import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "دهانات عليا Alya Paints",
    short_name: "دهانات عليا",
    description: "متجر دهانات عليا في الرياض",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f7f3",
    theme_color: "#235d71",
    lang: "ar",
    dir: "rtl",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

