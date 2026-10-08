import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader, SectionLayout, SideNav } from "@/components/ui/primitives";
import { sectionPages, services } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Pilotage, remorquage, manutention, entreposage et réparation navale au port de Douala-Bonabéri.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Services" }]}
        title="Services aux navires et aux marchandises"
        lead="Le port de Douala accueille les navires 24 h/24. Le PAD assure le pilotage ; les autres services sont confiés à ses filiales et à des opérateurs spécialisés."
      />
      <SectionLayout nav={<SideNav title="Services" items={sectionPages("Services")} current="/services" />}>
        <ul className="border-t border-line">
          {services.map((service) => (
            <li key={service.slug}>
              <article className="group relative grid gap-5 border-b border-line py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <div className="relative aspect-[3/2] overflow-hidden bg-alt">
                  <Image src={service.image} alt="" fill sizes="(min-width: 640px) 224px, 100vw" className="object-cover" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 group-hover:text-navy group-hover:underline">
                      {service.name}
                    </Link>
                  </h2>
                  <p className="mt-2 max-w-[65ch] text-text">{service.short}</p>
                  <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                    {service.facts.slice(0, 2).map((fact) => (
                      <div key={fact.label}>
                        <dt className="text-mute">{fact.label}</dt>
                        <dd className="font-bold text-ink">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </SectionLayout>
    </>
  );
}
