import type { Metadata } from "next";
import { Figure, PageHeader, SectionLayout, SideNav } from "@/components/ui/primitives";
import { history, sectionPages } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Histoire",
  description: "Brève histoire du port de Douala et du Port Autonome de Douala, du XIXᵉ siècle à aujourd’hui.",
};

export default function HistoirePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Le PAD", href: "/le-pad/presentation" }, { label: "Histoire" }]}
        title="Brève histoire du port"
        lead="Douala est installée dans l’estuaire du Wouri, à 50 km de la mer. Depuis le XIXᵉ siècle, la ville commerce par le fleuve ; son port est devenu la porte d’entrée du Cameroun et de l’Afrique centrale."
      />
      <SectionLayout nav={<SideNav title="Le PAD" items={sectionPages("Le PAD")} current="/le-pad/histoire" />}>
        <Figure
          src="/images/quai.jpg"
          alt="Navires à quai le long du Wouri, la ville de Douala en arrière-plan"
          caption="Les quais du Wouri, rive gauche."
          ratio="aspect-[21/9]"
          sizes="(min-width: 1024px) 70vw, 100vw"
          priority
        />
        <h2 className="mt-12 text-2xl font-bold">Chronologie</h2>
        <table className="mt-4 w-full border-collapse text-left">
          <caption className="sr-only">Principales dates de l’histoire du port de Douala</caption>
          <thead>
            <tr className="border-b-2 border-navy">
              <th scope="col" className="w-28 py-3 pr-6 text-sm font-bold text-ink">
                Date
              </th>
              <th scope="col" className="py-3 text-sm font-bold text-ink">
                Événement
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((event) => (
              <tr key={event.year} className="border-b border-line align-top">
                <th scope="row" className="py-4 pr-6 font-bold text-navy tnum">
                  {event.year}
                </th>
                <td className="py-4 text-text">{event.text}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <section aria-labelledby="reforme" className="mt-12 bg-alt p-6 md:p-8">
          <h2 id="reforme" className="text-xl font-bold">
            La réforme portuaire
          </h2>
          <p className="mt-3 max-w-[70ch] text-text">
            Issue de la table ronde de 1977 et des recommandations du Comité FAL, la loi du 24 décembre 1988 et ses huit décrets
            d’application redéfinissent les ports camerounais. Une Autorité portuaire nationale veille aux normes de sécurité ; Douala,
            Kribi, Limbé et Garoua deviennent des autorités portuaires chargées de la gestion et de la promotion de leurs services.
          </p>
        </section>
      </SectionLayout>
    </>
  );
}
