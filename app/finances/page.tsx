import type { Metadata } from "next";
import { FactTable, LinkTile, MoreLink, PageHeader, SectionLayout, SideNav } from "@/components/ui/primitives";
import { finances, sectionPages } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Finances",
  description: "Notation financière, chiffre d’affaires et comptes du Port Autonome de Douala.",
};

const documents = [
  { title: "Résultats de l’exercice 2025", text: "États financiers approuvés par l’Assemblée générale le 5 juin 2026.", href: "/actualites/resultats-exercice-2025" },
  { title: "États financiers 2022", text: "Rapport général du commissaire aux comptes sur le PAD, ses succursales et filiales.", href: "/actualites/etats-financiers-2022" },
  { title: "Comptes 2022 approuvés", text: "L’Assemblée générale approuve le rapport de gestion et les comptes.", href: "/actualites/assemblee-generale-comptes-2022" },
  { title: "Comptes consolidés du groupe", text: "Comptes du PAD et de ses filiales pour l’exercice 2022.", href: "/actualites/groupe-pad-performant-nouvelle-filiale" },
];

export default function FinancesPage() {
  const { rating, bloomfield, dapc, group2022 } = finances;
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Le port", href: "/infrastructures" }, { label: "Finances" }]}
        title="Finances"
        lead="Une signature notée « investissement » par l’agence panafricaine Bloomfield et des comptes approuvés chaque année par l’Assemblée générale."
      />
      <SectionLayout nav={<SideNav title="Le port" items={sectionPages("Le port")} current="/finances" />}>
        <div className="space-y-14">
          <section aria-labelledby="notation">
            <h2 id="notation" className="text-2xl font-bold">
              Notation financière
            </h2>
            <p className="mt-3 max-w-[70ch] text-text">
              Pour sa première notation, {rating.agency} a attribué au PAD des notes d’investissement, avec une perspective {rating.outlook} :
              une qualité de crédit élevée sur le long terme et des ratios de liquidité sains sur le court terme.
            </p>
            <div className="mt-6 max-w-2xl">
              <FactTable
                facts={[
                  { label: "Note à long terme", value: rating.longTerm },
                  { label: "Note à court terme", value: rating.shortTerm },
                  { label: "Perspective", value: "Stable" },
                ]}
              />
            </div>
            <div className="mt-4">
              <MoreLink href="/actualites/notation-bloomfield">Lire l’analyse de la notation</MoreLink>
            </div>
          </section>

          <section aria-labelledby="ca">
            <h2 id="ca" className="text-2xl font-bold">
              Chiffre d’affaires
            </h2>
            <div className="mt-4 grid max-w-3xl gap-8 md:grid-cols-2">
              <FactTable
                caption="Indicateurs cités dans l’analyse de Bloomfield."
                facts={[
                  { label: bloomfield.from.year, value: bloomfield.from.value },
                  { label: bloomfield.to.year, value: bloomfield.to.value },
                ]}
              />
              <FactTable
                caption="Analyse des performances 2022 (DAPC, PAD)."
                facts={[
                  { label: dapc.previous.year, value: dapc.previous.value },
                  { label: dapc.current.year, value: dapc.current.value },
                ]}
              />
            </div>
          </section>

          <section aria-labelledby="groupe">
            <h2 id="groupe" className="text-2xl font-bold">
              Comptes consolidés 2022 du groupe PAD
            </h2>
            <div className="mt-4 max-w-2xl">
              <FactTable
                facts={[
                  { label: "Chiffre d’affaires consolidé", value: group2022.revenue },
                  { label: "Résultat net consolidé", value: group2022.net },
                  { label: "Total bilan", value: group2022.total },
                ]}
              />
            </div>
          </section>

          <section aria-labelledby="documents">
            <h2 id="documents" className="text-2xl font-bold">
              Documents financiers
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {documents.map((doc) => (
                <li key={doc.href}>
                  <LinkTile href={doc.href} title={doc.title} text={doc.text} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </SectionLayout>
    </>
  );
}
