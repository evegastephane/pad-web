import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container, FactTable, Figure, MoreLink, PageHeader, SectionLayout, SideNav } from "@/components/ui/primitives";
import { sectionPages, services } from "@/content/data/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  return service ? { title: service.name, description: service.short } : {};
}

export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense
      fallback={
        <Container className="py-16" aria-busy="true">
          <div className="h-10 w-1/2 bg-alt" aria-hidden />
          <p className="sr-only">Chargement…</p>
        </Container>
      }
    >
      <Service params={params} />
    </Suspense>
  );
}

async function Service({ params }: { params: PageProps<"/services/[slug]">["params"] }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <PageHeader crumbs={[{ label: "Services", href: "/services" }, { label: service.name }]} title={service.name} lead={service.short} />
      <SectionLayout nav={<SideNav title="Services" items={sectionPages("Services")} current={`/services/${service.slug}`} />}>
        <div className="grid gap-10 xl:grid-cols-[1fr_20rem]">
          <div>
            <Figure src={service.image} alt={service.imageAlt} ratio="aspect-[16/9]" sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 70vw, 100vw" priority />
            <div className="prose-pad mt-8">
              {service.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <aside>
            <div className="bg-alt p-6">
              <h2 className="text-lg font-bold">Repères</h2>
              <div className="mt-4">
                <FactTable facts={service.facts} />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <MoreLink href="/contact">Contacter le PAD</MoreLink>
              <br />
              <MoreLink href="/infrastructures">Infrastructures du port</MoreLink>
            </div>
          </aside>
        </div>
      </SectionLayout>
    </>
  );
}
