import type { Metadata } from "next";
import { Figure, MoreLink, PageHeader, SectionLayout, SideNav } from "@/components/ui/primitives";
import { axes, missions, sectionPages, values } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Présentation",
  description: "Missions, vision et valeurs du Port Autonome de Douala, gestionnaire du port de Douala-Bonabéri.",
};

export default function PresentationPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Le PAD", href: "/le-pad/presentation" }, { label: "Présentation" }]}
        title="Présentation du Port Autonome de Douala"
        lead="Société à capital public appartenant à l’État du Cameroun, dotée de la personnalité juridique et de l’autonomie financière, le PAD assure la gestion, la promotion et le développement du port de Douala-Bonabéri."
      />
      <SectionLayout nav={<SideNav title="Le PAD" items={sectionPages("Le PAD")} current="/le-pad/presentation" />}>
        <div className="space-y-14">
          <Figure
            src="/images/terminal-conteneurs.jpg"
            alt="Portiques aux couleurs du PAD le long d’un porte-conteneurs à quai"
            caption="Portiques du terminal à conteneurs, port de Douala-Bonabéri."
            ratio="aspect-[21/9]"
            sizes="(min-width: 1024px) 70vw, 100vw"
            priority
          />

          <section aria-labelledby="missions">
            <h2 id="missions" className="text-2xl font-bold">
              Missions
            </h2>
            <p className="mt-3 max-w-[70ch] text-text">Le PAD administre le combinat portuaire de Douala. Ses principales missions sont les suivantes.</p>
            <ul className="mt-4 space-y-2">
              {missions.map((mission) => (
                <li key={mission} className="flex gap-3 text-text">
                  <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-navy" />
                  {mission}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="vision">
            <h2 id="vision" className="text-2xl font-bold">
              Vision
            </h2>
            <p className="mt-3 max-w-[70ch] text-lg text-text">
              Faire du Port Autonome de Douala un port attractif, compétitif et performant : un pôle de référence au cœur du Golfe de
              Guinée. La stratégie de la Direction générale repose sur trois axes.
            </p>
            <ul className="mt-6 grid gap-px border border-line bg-line md:grid-cols-3">
              {axes.map((axis) => (
                <li key={axis.name} className="bg-paper p-6">
                  <h3 className="text-lg font-bold text-navy">{axis.name}</h3>
                  <p className="mt-2 text-text">{axis.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="valeurs">
            <h2 id="valeurs" className="text-2xl font-bold">
              Valeurs
            </h2>
            <p className="mt-3 text-lg text-text">{values.join(" · ")}</p>
          </section>

          <section aria-labelledby="publics">
            <h2 id="publics" className="text-2xl font-bold">
              Publics
            </h2>
            <div className="mt-4 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-bold">Au Cameroun</h3>
                <p className="mt-2 text-text">
                  Le grand public, le personnel, l’administration et l’État, les partenaires, le GICAM et les importateurs.
                </p>
              </div>
              <div>
                <h3 className="font-bold">À l’international</h3>
                <p className="mt-2 text-text">
                  Les armateurs, les opérateurs économiques des pays enclavés, les ports de destination et de provenance.
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-[70ch] text-text">
              Le port de Douala abrite plus de 80 % des industries camerounaises, installées pour la plupart dans le domaine portuaire et
              ses environs : Bonabéri, zone aval et zone amont.
            </p>
          </section>

          <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
            <MoreLink href="/le-pad/histoire">Histoire</MoreLink>
            <MoreLink href="/le-pad/gouvernance">Gouvernance</MoreLink>
            <MoreLink href="/contact">Contacter le PAD</MoreLink>
          </div>
        </div>
      </SectionLayout>
    </>
  );
}
