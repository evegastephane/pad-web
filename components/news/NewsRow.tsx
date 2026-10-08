import Image from "next/image";
import Link from "next/link";
import { Arrow, Badge } from "@/components/ui/primitives";
import { categoryLabels, formatDate, type NewsItem } from "@/lib/news";

/** Image de repli pour les communiqués publiés sans photo. */
const FALLBACK_IMAGE = "/images/terminal-conteneurs.jpg";

/** Carte d’actualité : image, rubrique, titre, date. */
export function NewsCard({ item, headingLevel = "h3" }: { item: NewsItem; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col border border-line bg-paper transition-colors hover:bg-alt">
      <div className="relative aspect-[16/9] overflow-hidden bg-alt">
        <Image src={item.image || FALLBACK_IMAGE} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Badge>{categoryLabels[item.category]}</Badge>
        <Heading className="mt-3 text-lg leading-snug font-bold text-ink">
          <Link href={`/actualites/${item.slug}`} className="after:absolute after:inset-0 group-hover:text-navy group-hover:underline">
            {item.title}
          </Link>
        </Heading>
        <p className="mt-auto flex items-center justify-between pt-5 text-sm text-mute">
          <time dateTime={item.date}>{formatDate(item.date)}</time>
          <Arrow className="text-navy" />
        </p>
      </div>
    </article>
  );
}

/** Actualité en liste : date, rubrique, titre, résumé, vignette. */
export function NewsRow({ item, headingLevel = "h3", compact = false }: { item: NewsItem; headingLevel?: "h2" | "h3"; compact?: boolean }) {
  const Heading = headingLevel;
  if (compact) {
    return (
      <article className="group relative border-b border-line py-4">
        <time dateTime={item.date} className="text-sm text-mute">
          {formatDate(item.date)}
        </time>
        <Heading className="mt-1 leading-snug font-bold text-ink">
          <Link href={`/actualites/${item.slug}`} className="after:absolute after:inset-0 group-hover:text-navy group-hover:underline">
            {item.title}
          </Link>
        </Heading>
      </article>
    );
  }
  return (
    <article className="group relative grid gap-4 border-b border-line py-6 sm:grid-cols-[1fr_10rem] sm:gap-8">
      <div>
        <p className="flex flex-wrap items-center gap-3 text-sm text-mute">
          <Badge>{categoryLabels[item.category]}</Badge>
          <time dateTime={item.date}>{formatDate(item.date)}</time>
        </p>
        <Heading className="mt-2 text-lg leading-snug font-bold text-ink md:text-xl">
          <Link href={`/actualites/${item.slug}`} className="after:absolute after:inset-0 group-hover:text-navy group-hover:underline">
            {item.title}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-2 max-w-[70ch] text-text">{item.excerpt}</p>
      </div>
      <div className="relative hidden aspect-[4/3] overflow-hidden bg-alt sm:block">
        <Image src={item.image || FALLBACK_IMAGE} alt="" fill sizes="160px" className="object-cover" />
      </div>
    </article>
  );
}
