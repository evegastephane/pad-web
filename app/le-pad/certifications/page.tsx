import type { Metadata } from "next";
import Image from "next/image";
import { MoreLink, PageHeader, SectionLayout, SideNav } from "@/components/ui/primitives";
import { sectionPages } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Qualité, responsabilité sociétale et archivage : les engagements certifiés et distingués du Port Autonome de Douala.",
};

const items = [
  {
    title: "ISO 9001 : management de la qualité",
    text: "La norme ISO 9001 définit les exigences applicables aux systèmes de management de la qualité. Elle repose sur l’orientation client, l’engagement de la direction, l’approche processus et l’amélioration continue. Le PAD est certifié selon cette norme.",
  },
  {
    title: "ISO 26000 : responsabilité sociétale",
    text: "Le PAD se présente comme le premier port africain certifié ISO 26000, la norme de responsabilité sociétale des organisations. En décembre 2022, ses administrateurs et directeurs ont suivi une formation dédiée à la RSE.",
    link: { href: "/actualites/pad-ecole-rse", label: "Le PAD à l’école de la RSE" },
  },
  {
    title: "Archivage : Best Practices Archiving Awards",
    text: "En septembre 2023, le PAD a reçu le prix Best Practices Archiving Awards, premier de sa catégorie. Plus de 8 500 mètres linéaires d’archives, de l’ex-ONPC au PAD, ont été collectés, traités et indexés.",
    link: { href: "/actualites/archivage-pad-premier", label: "Archivage : le PAD premier de sa catégorie" },
  },
];

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Le PAD", href: "/le-pad/presentation" }, { label: "Certifications" }]}
        title="Certifications et distinctions"
        lead="La mondialisation des échanges impose aux ports des règles communes. Le PAD inscrit sa gestion dans des normes internationales de qualité et de responsabilité."
      />
      <SectionLayout nav={<SideNav title="Le PAD" items={sectionPages("Le PAD")} current="/le-pad/certifications" />}>
        <ul className="border-t border-line">
          {items.map((item) => (
            <li key={item.title} className="border-b border-line py-8">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="mt-3 max-w-[70ch] text-text">{item.text}</p>
              {item.link && (
                <div className="mt-3">
                  <MoreLink href={item.link.href}>{item.link.label}</MoreLink>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-10 w-56 border border-line p-4">
          <Image src="/images/iso.png" alt="Logo de certification ISO" width={330} height={153} className="h-auto w-full" />
        </div>
      </SectionLayout>
    </>
  );
}
