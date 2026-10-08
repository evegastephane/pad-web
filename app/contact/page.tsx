import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container, PageHeader } from "@/components/ui/primitives";
import { contact, socials } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Coordonnées du Port Autonome de Douala : adresse, téléphones, e-mail et formulaire de contact.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contact" }]}
        title="Nous contacter"
        lead="Une question sur le port, une demande de la presse ou un partenariat : écrivez-nous ou appelez nos services."
      />
      <Container className="grid gap-12 py-12 md:py-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-2xl font-bold">Formulaire de contact</h2>
          <p className="mt-2 text-text">Tous les champs sont obligatoires.</p>
          <div className="relative mt-6">
            <ContactForm />
          </div>
        </div>
        <aside className="space-y-8 lg:col-span-4 lg:col-start-9">
          <address className="bg-alt p-6 not-italic">
            <h2 className="text-lg font-bold">{contact.name}</h2>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="text-sm font-bold text-ink">Adresse</dt>
                <dd className="mt-1 text-text">
                  {contact.postal}
                  <br />
                  {contact.address}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold text-ink">Téléphone</dt>
                {contact.phones.map((phone) => (
                  <dd key={phone} className="mt-1">
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-navy tnum underline">
                      {phone}
                    </a>
                  </dd>
                ))}
              </div>
              <div>
                <dt className="text-sm font-bold text-ink">E-mail</dt>
                {contact.emails.map((email) => (
                  <dd key={email} className="mt-1">
                    <a href={`mailto:${email}`} className="text-navy underline">
                      {email}
                    </a>
                  </dd>
                ))}
              </div>
              <div>
                <dt className="text-sm font-bold text-ink">Horaires</dt>
                <dd className="mt-1 text-text">{contact.hours}</dd>
              </div>
              <div>
                <dt className="text-sm font-bold text-ink">Réseaux sociaux</dt>
                <dd className="mt-1 flex gap-4">
                  {socials.map((social) => (
                    <a key={social.href} href={social.href} target="_blank" rel="noopener" className="text-navy underline">
                      {social.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </address>
          <figure>
            <iframe
              title="Plan d’accès : Bonanjo, Douala"
              src="https://www.openstreetmap.org/export/embed.html?bbox=9.6780%2C4.0300%2C9.7130%2C4.0560&layer=mapnik&marker=4.0430%2C9.6950"
              className="block aspect-[4/3] w-full border border-line"
              loading="lazy"
            />
            <figcaption className="mt-2 text-sm text-mute">Plan d’accès : Bonanjo, Douala.</figcaption>
          </figure>
        </aside>
      </Container>
    </>
  );
}
