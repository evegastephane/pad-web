import Image from "next/image";
import Link from "next/link";
import { contact, navigation, socials } from "@/content/data/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-navy bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-4" aria-label="Port Autonome de Douala, retour à l’accueil">
              <Image src="/images/logo-pad.png" alt="" width={64} height={64} className="h-16 w-16" />
              <span className="border-l border-line pl-4">
                <span className="block text-lg leading-tight font-bold text-ink">Port Autonome de Douala</span>
                <span className="mt-0.5 block text-sm text-mute">Pôle de référence au cœur du Golfe de Guinée</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm text-text">
              Société à capital public de l’État du Cameroun, le PAD gère, promeut et développe le port de Douala-Bonabéri.
            </p>
            <address className="mt-6 space-y-1 text-sm not-italic">
              <p>{contact.postal}</p>
              <p>{contact.address}</p>
              <p>
                <a href={`tel:${contact.phones[0].replace(/\s/g, "")}`} className="text-navy tnum hover:underline">
                  {contact.phones[0]}
                </a>
                {" · "}
                <a href={`mailto:${contact.emails[0]}`} className="text-navy hover:underline">
                  {contact.emails[0]}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label="Plan du site" className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:pl-8">
            {navigation
              .filter((item) => item.children)
              .map((item) => (
                <div key={item.label}>
                  <h2 className="text-sm font-bold text-ink">{item.label}</h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {item.children!.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="text-text hover:text-navy hover:underline">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-6 text-sm text-mute md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/actualites" className="hover:text-navy hover:underline">
                Actualités
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-navy hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/liens-utiles" className="hover:text-navy hover:underline">
                Accès professionnels
              </Link>
            </li>
            {socials.map((social) => (
              <li key={social.href}>
                <a href={social.href} target="_blank" rel="noopener" className="hover:text-navy hover:underline">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p>© Port Autonome de Douala</p>
        </div>
      </div>
    </footer>
  );
}
