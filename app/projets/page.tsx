import type { Metadata } from "next";
import { NewsRow } from "@/components/news/NewsRow";
import { Badge, Figure, MoreLink, PageHeader, SectionLayout, SideNav } from "@/components/ui/primitives";
import { projects, sectionPages } from "@/content/data/site";
import { getAllNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "Projets",
  description: "Dragage, enlèvement des épaves, nouveaux magasins, silos, voies de contournement, Manoka : les projets du port de Douala-Bonabéri.",
};

export default async function ProjetsPage() {
  const news = (await getAllNews()).filter((item) => item.category === "projets").slice(0, 5);
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Le port", href: "/infrastructures" }, { label: "Projets" }]}
        title="Projets du port"
        lead="Le premier programme du schéma directeur de développement du port consiste à exploiter au maximum le site actuel. L’extension en eau profonde à Manoka prépare la suite."
      />
      <SectionLayout nav={<SideNav title="Le port" items={sectionPages("Le port")} current="/projets" />}>
        <Figure
          src="/images/dragueuse.jpg"
          alt="Drague au travail dans l’estuaire du Wouri"
          caption="Dragage dans l’estuaire du Wouri."
          ratio="aspect-[21/9]"
          sizes="(min-width: 1024px) 70vw, 100vw"
          priority
        />
        <h2 className="mt-12 text-2xl font-bold">Liste des projets</h2>
        <ul className="mt-4 border-t border-line">
          {projects.map((project) => (
            <li key={project.title} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
              <div>
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="mt-1 max-w-[70ch] text-text">{project.text}</p>
              </div>
              <div>
                <Badge>{project.status}</Badge>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Actualités des projets</h2>
          <MoreLink href="/actualites">Toutes les actualités</MoreLink>
        </div>
        <div className="mt-4 border-t border-line">
          {news.map((item) => (
            <NewsRow key={item.slug} item={item} />
          ))}
        </div>
      </SectionLayout>
    </>
  );
}
