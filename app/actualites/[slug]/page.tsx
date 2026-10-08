import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { NewsRow } from "@/components/news/NewsRow";
import { Badge, Breadcrumb, Container, MoreLink } from "@/components/ui/primitives";
import { categoryLabels, formatDate, getAllNews, getNews } from "@/lib/news";

export async function generateStaticParams() {
  return (await getAllNews()).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/actualites/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNews(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: { type: "article", publishedTime: item.date, images: item.image ? [item.image] : undefined },
  };
}

export default function ArticlePage({ params }: PageProps<"/actualites/[slug]">) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <Article params={params} />
    </Suspense>
  );
}

function ArticleSkeleton() {
  return (
    <Container className="py-6 md:py-8" aria-busy="true">
      <Breadcrumb crumbs={[{ label: "Actualités", href: "/actualites" }]} />
      <div className="mt-8 max-w-3xl space-y-4" aria-hidden>
        <div className="h-5 w-40 bg-alt" />
        <div className="h-10 w-full bg-alt" />
        <div className="h-10 w-2/3 bg-alt" />
        <div className="mt-8 aspect-[16/9] w-full bg-alt" />
      </div>
      <p className="sr-only">Chargement de l’article…</p>
    </Container>
  );
}

async function Article({ params }: { params: PageProps<"/actualites/[slug]">["params"] }) {
  const { slug } = await params;
  const item = await getNews(slug);
  if (!item) notFound();
  const related = (await getAllNews()).filter((other) => other.slug !== item.slug && other.category === item.category).slice(0, 4);

  return (
    <Container className="py-6 md:py-8">
      <Breadcrumb crumbs={[{ label: "Actualités", href: "/actualites" }, { label: item.title }]} />
      <div className="mt-8 grid gap-12 lg:grid-cols-12">
        <article className="lg:col-span-8">
          <header>
            <p className="flex flex-wrap items-center gap-3 text-sm text-mute">
              <Badge>{categoryLabels[item.category]}</Badge>
              <span>
                Publié le <time dateTime={item.date}>{formatDate(item.date)}</time>
              </span>
            </p>
            <h1 className="mt-4 text-[1.875rem] leading-tight font-bold md:text-[2.375rem]">{item.title}</h1>
          </header>
          {item.image && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-alt">
              <Image src={item.image} alt="" fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            </div>
          )}
          <div className="prose-pad mt-8">
            {item.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {item.gallery.length > 0 && (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {item.gallery.map((src, index) => (
                <li key={src} className="border border-line">
                  <a href={src} target="_blank" rel="noopener" className="relative block aspect-[3/4] bg-paper">
                    <Image src={src} alt={`États financiers, page ${index + 1}`} fill sizes="(min-width: 640px) 30vw, 100vw" className="object-contain" />
                    <span className="sr-only">(ouvrir l’image en grand, nouvel onglet)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          {item.documents.length > 0 && (
            <ul className="mt-8 space-y-3">
              {item.documents.map((doc) => (
                <li key={doc}>
                  <a
                    href={doc}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex min-h-11 items-center gap-2 border border-navy px-5 py-2.5 font-medium text-navy hover:bg-alt"
                  >
                    Télécharger le document
                    <span className="text-sm text-mute">(PDF, nouvel onglet)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-12 border-t border-line pt-6">
            <MoreLink href="/actualites">Retour aux actualités</MoreLink>
          </div>
        </article>

        {related.length > 0 && (
          <aside className="lg:col-span-4">
            <h2 className="border-b border-line pb-3 text-sm font-bold">Dans la même rubrique</h2>
            <div>
              {related.map((other) => (
                <NewsRow key={other.slug} item={other} compact />
              ))}
            </div>
          </aside>
        )}
      </div>
    </Container>
  );
}
