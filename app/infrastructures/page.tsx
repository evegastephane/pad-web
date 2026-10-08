import type { Metadata } from "next";
import { WouriChart } from "@/components/chart/WouriChart";
import { FactTable, Figure, MoreLink, PageHeader, SectionLayout, SideNav } from "@/components/ui/primitives";
import { capacities, channel, sectionPages, zones } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Infrastructures",
  description: "Le chenal d’accès de 50 km, les 11 zones d’exploitation et les capacités de stockage du port de Douala-Bonabéri.",
};

const aids = [
  {
    title: "Balisage",
    text: "38 bouées lumineuses latérales du système AISM et deux balises radio à réflecteur radar permettent aux navires de connaître leur position dans le chenal. Un baliseur entretient le dispositif.",
  },
  {
    title: "Surveillance",
    text: "Phares côtiers, veille radio permanente et surveillance radar du plan d’eau d’une portée d’environ 80 km, conformément aux normes de l’AISM.",
  },
  {
    title: "Hydrographie",
    text: "Le chenal et les plans d’eau (pieds de quai, darses, zone d’évitage) font l’objet de levés bathymétriques réguliers par la vedette hydrographique du PAD.",
  },
  {
    title: "Dragage",
    text: "Le chenal intérieur est dragué en permanence ; les darses, pieds de quai et zone d’évitage font l’objet d’un dragage périodique.",
  },
];

export default function InfrastructuresPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Le port", href: "/infrastructures" }, { label: "Infrastructures" }]}
        title="Infrastructures du port de Douala-Bonabéri"
        lead="Un port d’estuaire, à 50 km de la mer, organisé en 11 zones géographiques d’exploitation. Ses infrastructures résultent de programmes d’investissement successifs, dont la modernisation du terminal à conteneurs."
      />
      <SectionLayout nav={<SideNav title="Le port" items={sectionPages("Le port")} current="/infrastructures" />}>
        <div className="space-y-14">
          <section aria-labelledby="chenal">
            <h2 id="chenal" className="text-2xl font-bold">
              Le chenal d’accès
            </h2>
            <p className="mt-3 max-w-[70ch] text-text">
              Les navires accèdent au port par un chenal de 50 km, divisé en deux parties. Entre les deux, une zone de mouillage
              rectangulaire d’environ 1,5 mille marin de côté accueille les navires en attente d’un quai. À partir de la bouée de base,
              le pilotage est obligatoire pour les navires de 200 tonneaux de jauge brute et plus.
            </p>
            <figure className="mt-6">
              <div className="relative aspect-[16/10] overflow-hidden border border-line">
                <WouriChart className="absolute inset-0 h-full w-full" />
              </div>
              <figcaption className="mt-2 text-sm text-mute">
                Schéma de principe du chenal du Wouri, sans échelle. Ne pas utiliser pour la navigation.
              </figcaption>
            </figure>
            <div className="mt-8 max-w-2xl">
              <FactTable
                facts={[
                  { label: "Longueur totale", value: channel.length },
                  { label: "Chenal extérieur", value: `${channel.outer.length} × ${channel.outer.width}` },
                  { label: "Chenal intérieur", value: `${channel.inner.length} × ${channel.inner.width}` },
                  { label: `Cote officielle (depuis le ${channel.depthSince})`, value: channel.depth },
                  { label: "Tirant d’eau offert", value: channel.draft },
                  { label: "Bouées lumineuses", value: String(channel.buoys) },
                  { label: "Portée de la surveillance radar", value: channel.radar },
                  { label: "Pilotes / pilotines", value: `${channel.pilots} / ${channel.pilotBoats}` },
                ]}
              />
            </div>
          </section>

          <section aria-labelledby="aides">
            <h2 id="aides" className="text-2xl font-bold">
              Aides à la navigation
            </h2>
            <ul className="mt-6 grid gap-px border border-line bg-line md:grid-cols-2">
              {aids.map((aid) => (
                <li key={aid.title} className="bg-paper p-6">
                  <h3 className="text-lg font-bold">{aid.title}</h3>
                  <p className="mt-2 text-text">{aid.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="zones">
            <h2 id="zones" className="text-2xl font-bold">
              Les 11 zones d’exploitation
            </h2>
            <table className="mt-4 w-full border-collapse text-left">
              <caption className="sr-only">Zones géographiques d’exploitation du port de Douala</caption>
              <thead>
                <tr className="border-b-2 border-navy">
                  <th scope="col" className="py-3 pr-6 text-sm font-bold text-ink">
                    Zone
                  </th>
                  <th scope="col" className="py-3 text-sm font-bold text-ink">
                    Vocation
                  </th>
                </tr>
              </thead>
              <tbody>
                {zones.map((zone) => (
                  <tr key={zone.id} className="border-b border-line align-top">
                    <th scope="row" className="w-1/3 py-4 pr-6 font-bold text-ink">
                      {zone.name}
                    </th>
                    <td className="py-4 text-text">{zone.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section aria-labelledby="capacites" className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 id="capacites" className="text-2xl font-bold">
                Capacités de stockage
              </h2>
              <div className="mt-4">
                <FactTable facts={capacities.map((c) => ({ label: c.label.charAt(0).toUpperCase() + c.label.slice(1), value: c.value }))} />
              </div>
              <p className="mt-4 text-text">Des zones d’entreposage longue durée complètent l’offre, en amont et en aval du port de commerce.</p>
            </div>
            <Figure src="/images/bureaux.png" alt="Vue aérienne des magasins et zones d’entreposage du port" caption="Magasins et zones d’entreposage." sizes="(min-width: 1024px) 35vw, 100vw" />
          </section>

          <section aria-labelledby="activite">
            <h2 id="activite" className="text-2xl font-bold">
              L’activité en 2022
            </h2>
            <div className="mt-4 max-w-2xl">
              <FactTable
                caption="Source : analyse des performances commerciales, opérationnelles et économiques 2022 (DAPC, PAD)."
                facts={[
                  { label: "Trafic de marchandises", value: "12,48 Mt" },
                  { label: "Escales, toute navigation confondue", value: "1 999" },
                  { label: "Attente moyenne des porte-conteneurs à la bouée de base", value: "37 h" },
                  { label: "Porte-conteneurs ayant attendu moins de 48 h", value: "85 %" },
                  { label: "Séjour moyen des navires à quai", value: "4,6 jours" },
                ]}
              />
            </div>
          </section>

          <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
            <MoreLink href="/services">Services du port</MoreLink>
            <MoreLink href="/projets">Projets en cours</MoreLink>
          </div>
        </div>
      </SectionLayout>
    </>
  );
}
