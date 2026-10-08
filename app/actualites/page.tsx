import type { Metadata } from "next";
import { NewsRow } from "@/components/news/NewsRow";
import { Container, PageHeader } from "@/components/ui/primitives";
import { getAllNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Avis, communiqués et actualités du Port Autonome de Douala et du port de Douala-Bonabéri.",
};

export default async function ActualitesPage() {
  const news = await getAllNews();
  const years = [...new Set(news.map((item) => item.date.slice(0, 4)))];

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Actualités" }]}
        title="Actualités"
        lead="Communiqués, avis aux usagers, vie de l’institution, projets et partenariats du Port Autonome de Douala."
      />
      <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-12">
        <nav aria-label="Archives par année" className="lg:col-span-3">
          <div className="lg:sticky lg:top-6">
            <p className="border-b border-line pb-3 text-sm font-bold text-ink">Archives</p>
            <ul className="mt-2 flex flex-wrap gap-2 lg:block">
              {years.map((year) => {
                const count = news.filter((item) => item.date.startsWith(year)).length;
                return (
                  <li key={year}>
                    <a
                      href={`#annee-${year}`}
                      className="flex items-center justify-between gap-4 border border-line px-3 py-2 text-text hover:text-navy hover:underline lg:border-0 lg:border-l-2 lg:border-transparent lg:py-2 lg:pl-4 lg:hover:border-line"
                    >
                      <span className="tnum">{year}</span>
                      <span className="text-sm text-mute tnum">{count}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        <div className="min-w-0 lg:col-span-9">
          {years.map((year) => (
            <section key={year} id={`annee-${year}`} aria-labelledby={`titre-${year}`} className="scroll-mt-6 pb-10">
              <h2 id={`titre-${year}`} className="border-b-2 border-navy pb-2 text-2xl font-bold tnum">
                {year}
              </h2>
              {news
                .filter((item) => item.date.startsWith(year))
                .map((item) => (
                  <NewsRow key={item.slug} item={item} />
                ))}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
