import type { Metadata } from "next";
import Image from "next/image";
import { MoreLink, PageHeader, SectionLayout, SideNav } from "@/components/ui/primitives";
import { leadership, sectionPages } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Gouvernance",
  description: "Le Conseil d’administration et la Direction générale du Port Autonome de Douala.",
};

const bodies = [
  {
    name: "Assemblée générale",
    text: "Elle approuve chaque année les comptes du PAD. Lors de sa 30ᵉ session, le 5 juin 2026, elle a approuvé les états financiers de l’exercice 2025.",
    link: { href: "/actualites/resultats-exercice-2025", label: "Résultats de l’exercice 2025" },
  },
  {
    name: "Conseil d’administration",
    text: "Présidé par Shey Jones Yembe, il examine et décide des dossiers soumis par la Direction générale, dont les nominations aux postes de responsabilité.",
    link: { href: "/actualites/conseil-administration-mai-2023", label: "Session de mai 2023" },
  },
  {
    name: "Direction générale",
    text: "Le Directeur général, Cyrus Ngo’o, assisté du Directeur général adjoint, conduit la stratégie de rénovation, de modernisation et de développement du port.",
    link: { href: "/actualites/installation-responsables-30-juin", label: "Installation des responsables nommés" },
  },
];

export default function GouvernancePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Le PAD", href: "/le-pad/presentation" }, { label: "Gouvernance" }]}
        title="Gouvernance"
        lead="Réorganisé par le décret du 24 janvier 2019, le PAD est une société à capital public. Ses organes de gouvernance rendent compte à l’État, son actionnaire."
      />
      <SectionLayout nav={<SideNav title="Le PAD" items={sectionPages("Le PAD")} current="/le-pad/gouvernance" />}>
        <h2 className="text-2xl font-bold">Équipe dirigeante</h2>
        <ul className="mt-6 grid gap-8 sm:grid-cols-3">
          {leadership.map((person) => (
            <li key={person.name}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden bg-alt">
                  <Image src={person.image} alt={`Portrait de ${person.name}`} fill sizes="(min-width: 640px) 22vw, 100vw" className="object-cover object-top" />
                </div>
                <figcaption className="mt-4">
                  <span className="block text-lg font-bold text-ink">{person.name}</span>
                  <span className="mt-0.5 block text-text">{person.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 text-2xl font-bold">Organes</h2>
        <ul className="mt-4 border-t border-line">
          {bodies.map((body) => (
            <li key={body.name} className="grid gap-3 border-b border-line py-6 md:grid-cols-[14rem_1fr] md:gap-8">
              <h3 className="text-lg font-bold">{body.name}</h3>
              <div>
                <p className="max-w-[65ch] text-text">{body.text}</p>
                <div className="mt-3">
                  <MoreLink href={body.link.href}>{body.link.label}</MoreLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </SectionLayout>
    </>
  );
}
