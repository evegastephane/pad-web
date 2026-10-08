"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, navigation, proLinks } from "@/content/data/site";

function isActive(pathname: string, href: string) {
  if (!pathname) return false;
  const root = "/" + href.split("/")[1];
  return pathname === href || pathname === root || pathname.startsWith(root + "/");
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" aria-hidden className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** En-tête lié à l’URL courante (états actifs de la navigation). */
export function Header() {
  return <HeaderView pathname={usePathname()} />;
}

/** En-tête sans dépendance à l’URL, utilisable comme repli pendant le pré-rendu. */
export function HeaderView({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cargoWeb = proLinks[0];

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    }
    function onClick(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpen(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  return (
    <header
      className="relative z-50 bg-paper"
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) {
          setOpen(null);
          setMobile(false);
        }
      }}
    >
      <div className="brand-band" aria-hidden />

      {/* Bloc institutionnel */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <Link href="/" className="flex items-center gap-4" aria-label="Port Autonome de Douala, retour à l’accueil">
          <Image src="/images/logo-pad.png" alt="" width={72} height={72} priority className="h-14 w-14 lg:h-[4.5rem] lg:w-[4.5rem]" />
          <span className="border-l border-line pl-4">
            <span className="block text-lg leading-tight font-bold text-ink lg:text-xl">Port Autonome de Douala</span>
            <span className="mt-0.5 hidden text-sm text-mute sm:block">Pôle de référence au cœur du Golfe de Guinée</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 text-sm lg:flex">
          <li>
            <a
              href={cargoWeb.href}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-3 py-2 font-medium text-navy hover:bg-alt hover:underline"
            >
              Cargo Web
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                <path d="M3.5 8.5l5-5M4.5 3.5h4v4" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              <span className="sr-only">(nouvel onglet)</span>
            </a>
          </li>
          <li>
            <Link href="/liens-utiles" className="inline-flex px-3 py-2 font-medium text-navy hover:bg-alt hover:underline">
              Accès professionnels
            </Link>
          </li>
          <li>
            <a href={`tel:${contact.phones[0].replace(/\s/g, "")}`} className="inline-flex px-3 py-2 font-medium text-navy tnum hover:bg-alt hover:underline">
              {contact.phones[0]}
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 border border-navy px-3 text-sm font-medium text-navy lg:hidden"
          aria-expanded={mobile}
          aria-controls="menu-mobile"
          onClick={() => setMobile((value) => !value)}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden>
            {mobile ? (
              <path d="M3 1l12 12M15 1L3 13" stroke="currentColor" strokeWidth="1.6" />
            ) : (
              <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.6" />
            )}
          </svg>
          {mobile ? "Fermer" : "Menu"}
        </button>
      </div>

      {/* Navigation principale */}
      <nav ref={navRef} aria-label="Navigation principale" className="hidden border-y border-line lg:block">
        <ul className="mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8">
          <li>
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className="flex h-14 items-center border-b-2 border-transparent px-4 font-medium text-ink hover:bg-alt aria-[current=page]:border-navy aria-[current=page]:text-navy"
            >
              Accueil
            </Link>
          </li>
          {navigation.map((item) => {
            const active = isActive(pathname, item.href);
            if (!item.children) {
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="flex h-14 items-center border-b-2 border-transparent px-4 font-medium text-ink hover:bg-alt aria-[current=page]:border-navy aria-[current=page]:text-navy"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }
            const expanded = open === item.label;
            return (
              <li key={item.label} className="relative">
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`menu-${item.href}`}
                  onClick={() => setOpen(expanded ? null : item.label)}
                  className={`flex h-14 items-center gap-2 border-b-2 px-4 font-medium hover:bg-alt ${
                    active ? "border-navy text-navy" : "border-transparent text-ink"
                  } ${expanded ? "bg-navy-tint text-navy" : ""}`}
                >
                  {item.label}
                  <Chevron open={expanded} />
                </button>
                <div
                  id={`menu-${item.href}`}
                  hidden={!expanded}
                  className="absolute top-full left-0 w-80 border border-line bg-paper py-2 shadow-[0_12px_28px_-10px_rgba(27,34,48,0.25)]"
                >
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={pathname === child.href ? "page" : undefined}
                          className="block px-5 py-2.5 hover:bg-alt aria-[current=page]:bg-navy-tint"
                        >
                          <span className="block font-medium text-navy">{child.label}</span>
                          {child.note && <span className="block text-sm text-mute">{child.note}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!mobile}
        className="fixed inset-x-0 top-[5.75rem] bottom-0 overflow-y-auto border-t border-line bg-paper px-4 pt-2 pb-12 sm:px-6 lg:hidden"
      >
        <nav aria-label="Navigation mobile">
          <ul>
            <li className="border-b border-line">
              <Link href="/" className="block py-4 text-lg font-medium text-ink">
                Accueil
              </Link>
            </li>
            {navigation.map((item) => (
              <li key={item.label} className="border-b border-line py-4">
                <Link href={item.href} className="text-lg font-medium text-ink">
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mt-2 space-y-1 border-l border-line pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="block py-1.5 text-navy">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="py-4">
              <Link href="/liens-utiles" className="font-medium text-navy underline">
                Accès professionnels et Cargo Web
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
