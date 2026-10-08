import type { Metadata } from "next";
import { Container, LinkTile, PageHeader } from "@/components/ui/primitives";
import { proLinks, socials } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Accès professionnels",
  description: "Accès aux applications professionnelles du Port Autonome de Douala : Cargo Web, SIIPPI PAD, base documentaire, enquête de satisfaction.",
};

export default function LiensUtilesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accès professionnels" }]}
        title="Accès professionnels"
        lead="Les applications du PAD réservées aux usagers et aux agents. Elles s’ouvrent dans un nouvel onglet et peuvent demander une connexion."
      />
      <Container className="py-12 md:py-16">
        <ul className="grid gap-4 md:grid-cols-2">
          {proLinks.map((link) => (
            <li key={link.href}>
              <LinkTile href={link.href} title={link.name} text={link.text} external />
            </li>
          ))}
        </ul>
        <h2 className="mt-14 text-xl font-bold">Suivre le PAD</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {socials.map((social) => (
            <li key={social.href}>
              <a href={social.href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center border border-navy px-5 py-2.5 font-medium text-navy hover:bg-alt">
                {social.label}
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
