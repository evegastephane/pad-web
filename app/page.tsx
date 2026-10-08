import Image from "next/image";
import Link from "next/link";
import { NewsCard } from "@/components/news/NewsRow";
import { Badge, Button, Container, Figure, LinkTile, MoreLink, SectionHeading } from "@/components/ui/primitives";
import { missions, partners, projects, proLinks, services } from "@/content/data/site";
import { getAllNews } from "@/lib/news";

const keyFigures = [
  { value: "50 km", label: "de chenal d’accès balisé, de la bouée Wouri aux quais" },
  { value: "11", label: "zones géographiques d’exploitation" },
  { value: "12,48 Mt", label: "de marchandises traitées en 2022" },
  { value: "1 999", label: "escales de navires en 2022" },
];

export default async function HomePage() {
  const news = (await getAllNews()).slice(0, 3);

  return (
    <>
      {/* Ouverture */}
      <section aria-labelledby="hero-title" className="relative">
        <div className="relative h-[16rem] sm:h-[24rem] lg:h-[32rem]">
          <Image
            src="/images/terminal-vue-aerienne.jpg"
            alt="Vue aérienne du terminal à conteneurs du port de Douala, l’estuaire du Wouri en arrière-plan"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <Container>
          <div className="relative -mt-12 max-w-3xl border-t-4 border-navy bg-paper p-6 shadow-[0_16px_40px_-20px_rgba(27,34,48,0.35)] sm:-mt-24 sm:p-10">
            <h1 id="hero-title" className="text-[2rem] leading-tight font-bold text-ink md:text-[2.75rem]">
              Pôle de référence au cœur du Golfe de Guinée
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-text">
              Le Port Autonome de Douala gère le port de Douala-Bonabéri, sur l’estuaire du Wouri, à 50 km de la mer. Environ deux tiers
              des échanges des pays de l’hinterland y transitent.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/le-pad/presentation">Découvrir le PAD</Button>
              <Button href="/actualites" variant="secondary">
                Consulter les actualités
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Accès rapides */}
      <section aria-labelledby="acces-title" className="py-14 md:py-16">
        <Container>
          <h2 id="acces-title" className="sr-only">
            Accès rapides
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <li>
              <LinkTile href="/actualites" title="Actualités et avis" text="Communiqués, avis aux usagers et vie de l’institution." />
            </li>
            <li>
              <LinkTile href="/services" title="Services du port" text="Pilotage, remorquage, manutention, entreposage." />
            </li>
            <li>
              <LinkTile href={proLinks[0].href} external title="Cargo Web" text="Application de gestion des escales de navires." />
            </li>
            <li>
              <LinkTile href="/contact" title="Nous contacter" text="Adresse, téléphones et formulaire de contact." />
            </li>
          </ul>
        </Container>
      </section>

      {/* Actualités */}
      <section aria-labelledby="actualites-title" className="border-t border-line bg-alt py-14 md:py-20">
        <Container>
          <SectionHeading id="actualites-title" title="Actualités" action={<MoreLink href="/actualites">Toutes les actualités</MoreLink>} />
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <li key={item.slug}>
                <NewsCard item={item} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Le PAD */}
      <section aria-labelledby="pad-title" className="py-14 md:py-20">
        <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="pad-title" className="text-2xl leading-tight font-bold text-ink md:text-[1.75rem]">
              Le Port Autonome de Douala
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-text">
              Société à capital public appartenant à l’État du Cameroun, dotée de la personnalité juridique et de l’autonomie
              financière, le PAD assure la gestion, la promotion et le développement du port de Douala-Bonabéri.
            </p>
            <h3 className="mt-8 font-bold text-ink">Ses principales missions</h3>
            <ul className="mt-3 space-y-2">
              {missions.slice(0, 5).map((mission) => (
                <li key={mission} className="flex gap-3 text-text">
                  <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-navy" />
                  {mission}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <MoreLink href="/le-pad/presentation">Présentation du PAD</MoreLink>
              <MoreLink href="/le-pad/gouvernance">Gouvernance</MoreLink>
            </div>
          </div>
          <Figure
            src="/images/quai.jpg"
            alt="Navires à quai le long du Wouri, la ville de Douala en arrière-plan"
            caption="Les quais du port de Douala, rive gauche du Wouri."
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </Container>
      </section>

      {/* Chiffres clés */}
      <section aria-labelledby="chiffres-title" className="border-y border-line bg-alt py-14 md:py-16">
        <Container>
          <SectionHeading id="chiffres-title" title="Le port en chiffres" action={<MoreLink href="/infrastructures">Infrastructures</MoreLink>} />
          <dl className="mt-8 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {keyFigures.map((figure) => (
              <div key={figure.label} className="border-b border-line py-6 sm:pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
                <dt className="sr-only">{figure.label}</dt>
                <dd>
                  <span className="block text-[2rem] leading-none font-bold text-navy tnum">{figure.value}</span>
                  <span className="mt-2 block text-text">{figure.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-mute">Sources : Port Autonome de Douala ; analyse des performances 2022 de la DAPC.</p>
        </Container>
      </section>

      {/* Services */}
      <section aria-labelledby="services-title" className="py-14 md:py-20">
        <Container>
          <SectionHeading id="services-title" title="Services aux navires et aux marchandises" action={<MoreLink href="/services">Tous les services</MoreLink>} />
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <article className="group relative flex h-full flex-col border border-line transition-colors hover:bg-alt">
                  <div className="relative aspect-[16/9] overflow-hidden bg-alt">
                    <Image src={service.image} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-ink">
                      <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 group-hover:text-navy group-hover:underline">
                        {service.name}
                      </Link>
                    </h3>
                    <p className="mt-2 text-text">{service.short}</p>
                  </div>
                </article>
              </li>
            ))}
            <li>
              <LinkTile href="/infrastructures" title="Infrastructures du port" text="Le chenal de 50 km, les 11 zones d’exploitation et les capacités de stockage." />
            </li>
          </ul>
        </Container>
      </section>

      {/* Projets */}
      <section aria-labelledby="projets-title" className="border-t border-line py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="projets-title" className="text-2xl leading-tight font-bold text-ink md:text-[1.75rem]">
              Projets structurants
            </h2>
            <p className="mt-4 text-text">
              Rénovation, modernisation et développement : le PAD investit pour exploiter au mieux le site actuel et préparer l’extension
              en eau profonde à Manoka.
            </p>
            <div className="mt-6">
              <MoreLink href="/projets">Tous les projets</MoreLink>
            </div>
          </div>
          <ul className="border-t border-line lg:col-span-8">
            {projects.slice(0, 5).map((project) => (
              <li key={project.title} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                <div>
                  <h3 className="font-bold text-ink">{project.title}</h3>
                  <p className="mt-1 text-text">{project.text}</p>
                </div>
                <div className="sm:pt-0.5">
                  <Badge>{project.status}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Partenaires */}
      <section aria-labelledby="partenaires-title" className="border-t border-line bg-alt py-12">
        <Container>
          <h2 id="partenaires-title" className="text-lg font-bold text-ink">
            Partenaires de la place portuaire
          </h2>
          <ul className="mt-6 grid grid-cols-3 gap-px border border-line bg-line sm:grid-cols-5 lg:grid-cols-9">
            {partners.map((partner) => (
              <li key={partner.name} className="grid h-20 place-items-center bg-paper p-3">
                <Image src={partner.logo} alt={partner.name} width={110} height={55} className="max-h-10 w-auto object-contain" />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
