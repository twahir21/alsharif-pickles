import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AL-SHARRYF Pickles",
    short_name: "AL-SHARRYF",
    description: "Handmade pickles and chilli sauces from Tanzania.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf5e9",
    theme_color: "#14532d",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
