import type { Metadata } from "next";
import { Badge, FactTable, MoreLink, PageHeader, SectionLayout, SideNav } from "@/components/ui/primitives";
import { sectionPages, subsidiaries } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Filiales",
  description: "RTC, RDR, RDD, DPS et RPI : les filiales et succursales du Port Autonome de Douala.",
};

const reading = [
  { href: "/actualites/pad-conforte-creation-rtc", label: "Le PAD conforté dans la création de la RTC" },
  { href: "/actualites/regie-remorquage-performante", label: "La Régie de remorquage performante" },
  { href: "/actualites/deux-remorqueurs-neufs", label: "Deux remorqueurs neufs pour la Régie du remorquage" },
  { href: "/actualites/groupe-pad-performant-nouvelle-filiale", label: "Groupe PAD : de plus en plus performant" },
];

export default function FilialesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Le PAD", href: "/le-pad/presentation" }, { label: "Filiales" }]}
        title="Filiales et succursales"
        lead="Le 30 décembre 2022, quatre régies du PAD changent de statut, dans le respect des textes OHADA : la RTC et la RDR deviennent des sociétés anonymes filiales, la RDD et la DPS des succursales."
      />
      <SectionLayout nav={<SideNav title="Le PAD" items={sectionPages("Le PAD")} current="/le-pad/filiales" />}>
        <ul className="border-t border-line">
          {subsidiaries.map((sub) => (
            <li key={sub.code} className="grid gap-3 border-b border-line py-7 md:grid-cols-[8rem_1fr] md:gap-8">
              <p className="text-2xl font-bold text-navy">{sub.code}</p>
              <div>
                <h2 className="flex flex-wrap items-center gap-3 text-lg font-bold">
                  {sub.name}
                  <Badge>{sub.kind}</Badge>
                </h2>
                <p className="mt-2 max-w-[70ch] text-text">{sub.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 text-2xl font-bold">Le groupe PAD en 2022</h2>
        <div className="mt-4 max-w-2xl">
          <FactTable
            caption="Comptes consolidés adoptés par le Conseil d’administration le 30 mai 2023."
            facts={[
              { label: "Chiffre d’affaires consolidé", value: "131,5 Md FCFA" },
              { label: "Résultat net consolidé", value: "16,1 Md FCFA" },
              { label: "Total bilan", value: "411 Md FCFA" },
              { label: "Conteneurs traités par la RTC", value: "340 000 EVP" },
            ]}
          />
        </div>

        <h2 className="mt-14 text-xl font-bold">À lire aussi</h2>
        <ul className="mt-4 space-y-3">
          {reading.map((link) => (
            <li key={link.href}>
              <MoreLink href={link.href}>{link.label}</MoreLink>
            </li>
          ))}
        </ul>
      </SectionLayout>
    </>
  );
}
