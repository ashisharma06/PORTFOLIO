import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Evaluated once at build time so /sitemap.xml can be statically cached.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
