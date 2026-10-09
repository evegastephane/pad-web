import type { MetadataRoute } from "next";
import { services } from "@/content/data/site";
import { getAllNews } from "@/lib/news";

const BASE = "https://www.pad.cm";

const pages = [
  "",
  "/le-pad/presentation",
  "/le-pad/mot-du-directeur",
  "/le-pad/histoire",
  "/le-pad/gouvernance",
  "/le-pad/certifications",
  "/le-pad/filiales",
  "/infrastructures",
  "/hinterland",
  "/projets",
  "/finances",
  "/services",
  "/actualites",
  "/contact",
  "/liens-utiles",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getAllNews();
  return [
    ...pages.map((path) => ({ url: `${BASE}${path}` })),
    ...services.map((service) => ({ url: `${BASE}/services/${service.slug}` })),
    ...news.map((item) => ({ url: `${BASE}/actualites/${item.slug}`, lastModified: item.date })),
  ];
}
