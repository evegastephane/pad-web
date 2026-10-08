import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

export type NewsCategory = "institution" | "projets" | "partenariats" | "vie-du-pad" | "rse" | "avis";

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: NewsCategory;
  image: string;
  excerpt: string;
  source: string;
  documents: string[];
  gallery: string[];
  body: string[];
};

export const categoryLabels: Record<NewsCategory, string> = {
  institution: "Institution",
  projets: "Projets",
  partenariats: "Partenariats",
  "vie-du-pad": "Vie du PAD",
  rse: "Engagement",
  avis: "Avis",
};

const NEWS_DIR = path.join(process.cwd(), "content", "news");

function parseValue(raw: string): unknown {
  const value = raw.trim();
  if (value.startsWith('"') || value.startsWith("[")) return JSON.parse(value);
  return value;
}

function parse(slug: string, source: string): NewsItem {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Front matter manquant : ${slug}`);
  const meta: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const index = line.indexOf(":");
    if (index > 0) meta[line.slice(0, index)] = parseValue(line.slice(index + 1));
  }
  return {
    slug,
    title: String(meta.title),
    date: String(meta.date),
    category: meta.category as NewsCategory,
    image: String(meta.image ?? ""),
    excerpt: String(meta.excerpt ?? ""),
    source: String(meta.source ?? ""),
    documents: (meta.documents as string[] | undefined) ?? [],
    gallery: (meta.gallery as string[] | undefined) ?? [],
    body: match[2]
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean),
  };
}

export async function getAllNews(): Promise<NewsItem[]> {
  "use cache";
  const files = (await readdir(NEWS_DIR)).filter((file) => file.endsWith(".md"));
  const items = await Promise.all(
    files.map(async (file) => parse(file.replace(/\.md$/, ""), (await readFile(path.join(NEWS_DIR, file), "utf8")).replace(/\r\n/g, "\n"))),
  );
  return items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
}

export async function getNews(slug: string): Promise<NewsItem | undefined> {
  "use cache";
  return (await getAllNews()).find((item) => item.slug === slug);
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const shortFormat = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" });

export function formatDate(iso: string, short = false) {
  return (short ? shortFormat : dateFormat).format(new Date(`${iso}T00:00:00Z`));
}
