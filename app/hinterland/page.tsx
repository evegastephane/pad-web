import type { Metadata } from "next";
import { HinterlandMap } from "@/components/maps/HinterlandMap";
import { MoreLink, PageHeader, SectionLayout, SideNav } from "@/components/ui/primitives";
import { hinterland, sectionPages } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Hinterland",
  description: "Le port de Douala, plateforme logistique de l’Afrique centrale : environ deux tiers des échanges des pays de l’hinterland y transitent.",
};

const links = [
  { href: "/projets", label: "Système de transit et zone de stationnement sécurisée pour les camions" },
  { href: "/actualites/zone-logistique-parking-camions-sapro", label: "Zone logistique et parking d’attente : convention avec SAPRO Logistics Cameroun" },
  { href: "/actualites/pad-pak-partenariat", label: "Le PAD et le Port Autonome de Kribi renouvellent leur partenariat" },
];

export default function HinterlandPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Le port", href: "/infrastructures" }, { label: "Hinterland" }]}
        title="Le port de l’hinterland"
        lead="Situé dans un pays au dynamisme reconnu, le port de Douala est une véritable plateforme logistique : environ deux tiers des échanges des pays de l’hinterland y transitent."
      />
      <SectionLayout nav={<SideNav title="Le port" items={sectionPages("Le port")} current="/hinterland" />}>
        <div className="grid gap-10 xl:grid-cols-[1fr_20rem]">
          <figure>
            <div className="border border-line">
              <HinterlandMap />
            </div>
            <figcaption className="mt-2 text-sm text-mute">Liaisons entre Douala et les capitales des pays desservis.</figcaption>
          </figure>
          <div>
            <h2 className="text-xl font-bold">Pays desservis</h2>
            <table className="mt-3 w-full border-collapse text-left">
              <caption className="sr-only">Pays de l’hinterland et capitales</caption>
              <thead>
                <tr className="border-b-2 border-navy">
                  <th scope="col" className="py-2 pr-4 text-sm font-bold">
                    Pays
                  </th>
                  <th scope="col" className="py-2 text-sm font-bold">
                    Capitale
                  </th>
                </tr>
              </thead>
              <tbody>
                {hinterland.map((place) => (
                  <tr key={place.country} className="border-b border-line">
                    <th scope="row" className="py-3 pr-4 font-medium text-ink">
                      {place.country}
                    </th>
                    <td className="py-3 text-text">{place.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <section aria-labelledby="cabotage" className="mt-12">
          <h2 id="cabotage" className="text-2xl font-bold">
            Cabotage et transit
          </h2>
          <p className="mt-3 max-w-[70ch] text-text">
            Le quai Boscam est le centre d’une activité de cabotage international : il accueille un trafic important à destination des
            pays d’Afrique de l’Ouest et du Centre. Pour faciliter le transit routier vers les pays enclavés, le PAD aménage des zones
            logistiques et des parkings d’attente pour les camions.
          </p>
          <ul className="mt-6 space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <MoreLink href={link.href}>{link.label}</MoreLink>
              </li>
            ))}
          </ul>
        </section>
      </SectionLayout>
    </>
  );
}
