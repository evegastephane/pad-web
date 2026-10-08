import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", children, ...rest }: { className?: string; children: ReactNode } & ComponentProps<"div">) {
  return (
    <div {...rest} className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

type ButtonProps = ComponentProps<typeof Link> & { variant?: "primary" | "secondary" };

const buttonStyles = {
  primary: "bg-navy text-paper border-navy hover:bg-navy-dark hover:border-navy-dark",
  secondary: "bg-paper text-navy border-navy hover:bg-alt",
};

/** Bouton-lien : rectangulaire, libellé en casse de phrase. */
export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <Link
      {...props}
      className={`inline-flex min-h-11 items-center justify-center gap-2 border px-5 py-2.5 font-medium transition-colors ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden className={`shrink-0 ${className}`}>
      <path d="M0 6h14M9.5 1.5L14 6l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** Lien textuel avec flèche, pour « voir tout ». */
export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 font-medium text-navy hover:underline">
      {children}
      <Arrow className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Fil d’Ariane">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-mute">
        <li>
          <Link href="/" className="underline hover:text-navy">
            Accueil
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.label} className="flex items-center gap-2">
            <svg width="6" height="10" viewBox="0 0 6 10" aria-hidden className="text-mute">
              <path d="M1 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            {crumb.href ? (
              <Link href={crumb.href} className="underline hover:text-navy">
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** En-tête de page intérieure : fil d’Ariane, titre, chapô. */
export function PageHeader({ title, lead, crumbs }: { title: string; lead?: string; crumbs: Crumb[] }) {
  return (
    <header className="border-b border-line">
      <Container className="pt-6 pb-10 md:pb-12">
        <Breadcrumb crumbs={crumbs} />
        <h1 className="mt-8 max-w-4xl text-[2rem] leading-tight font-bold text-ink md:text-[2.5rem]">{title}</h1>
        {lead && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-text md:text-xl">{lead}</p>}
      </Container>
    </header>
  );
}

export function SectionHeading({ title, action, id, className = "" }: { title: string; action?: ReactNode; id?: string; className?: string }) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-4 ${className}`}>
      <h2 id={id} className="text-2xl leading-tight font-bold text-ink md:text-[1.75rem]">
        {title}
      </h2>
      {action}
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="inline-block w-fit bg-navy-tint px-2 py-0.5 text-xs font-bold tracking-[0.02em] text-navy uppercase">{children}</span>;
}

/** Tableau de repères : libellé et valeur, filet entre chaque ligne. */
export function FactTable({ facts, caption }: { facts: { label: string; value: string }[]; caption?: string }) {
  return (
    <div>
      <dl className="border-t border-line">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-baseline justify-between gap-6 border-b border-line py-3">
            <dt className="text-text">{fact.label}</dt>
            <dd className="text-right font-bold text-ink tnum">{fact.value}</dd>
          </div>
        ))}
      </dl>
      {caption && <p className="mt-2 text-sm text-mute">{caption}</p>}
    </div>
  );
}

/** Photo avec légende et crédit, sans ornement. */
export function Figure({ src, alt, caption, ratio = "aspect-[3/2]", sizes = "100vw", priority = false }: { src: string; alt: string; caption?: string; ratio?: string; sizes?: string; priority?: boolean }) {
  return (
    <figure>
      <div className={`relative overflow-hidden bg-alt ${ratio}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      {caption && <figcaption className="mt-2 text-sm text-mute">{caption}</figcaption>}
    </figure>
  );
}

/** Tuile de lien : titre, description, flèche ; toute la tuile est cliquable. */
export function LinkTile({ href, title, text, external = false }: { href: string; title: string; text?: string; external?: boolean }) {
  const content = (
    <>
      <span className="block text-lg font-bold text-navy group-hover:underline">{title}</span>
      {text && <span className="mt-1.5 block text-text">{text}</span>}
      <span className="mt-auto flex justify-end pt-4 text-navy">
        {external ? (
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path d="M3.5 10.5l7-7M5 3.5h5.5V9" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        ) : (
          <Arrow />
        )}
      </span>
    </>
  );
  const className = "group flex h-full flex-col border border-line bg-paper p-6 transition-colors hover:bg-alt";
  return external ? (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {content}
      <span className="sr-only">(nouvel onglet)</span>
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

/** Menu latéral de rubrique. */
export function SideNav({ title, items, current }: { title: string; items: { label: string; href: string }[]; current: string }) {
  return (
    <nav aria-label={`Rubrique ${title}`} className="lg:sticky lg:top-6">
      <p className="border-b border-line pb-3 text-sm font-bold text-ink">{title}</p>
      <ul className="mt-2">
        {items.map((item) => {
          const active = item.href === current;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block border-l-2 py-2 pl-4 text-[0.95rem] ${
                  active ? "border-navy font-bold text-navy" : "border-transparent text-text hover:border-line hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Mise en page de rubrique : menu latéral à gauche, contenu à droite. */
export function SectionLayout({ nav, children }: { nav: ReactNode; children: ReactNode }) {
  return (
    <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-12">
      <aside className="lg:col-span-3">{nav}</aside>
      <div className="min-w-0 lg:col-span-9">{children}</div>
    </Container>
  );
}
