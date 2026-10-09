import type { Metadata } from "next";
import Image from "next/image";
import { MoreLink, PageHeader, SectionLayout, SideNav } from "@/components/ui/primitives";
import { sectionPages } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Mot du Directeur général",
  description: "Performance, consolidation et croissance : le mot de Cyrus Ngo’o, Directeur général du Port Autonome de Douala.",
};

const message = [
  "La concurrence accrue entre les ports a engendré une réorganisation en profondeur de l’activité portuaire afin d’en améliorer la performance, l’attractivité et la compétitivité. Concomitamment, et compte tenu de mutations, il fallait implémenter de nouveaux paradigmes de gouvernance en phase avec les évolutions du secteur portuaire.",
  "Dans cette nouvelle organisation, le port n’est plus seulement cette étendue physique avec son débit portuaire et son rôle de plateforme de services logistiques. Par ses activités et ses missions, le port c’est désormais plusieurs fonctions : stratégique, économique, industrielle, logistique, sociale, environnementale.",
  "La multiplicité des acteurs (autorité portuaire, différentes administrations et entreprises) et la multiplicité des services offerts (manutention, pilotage, lamanage) font du port une organisation complexe et non homogène.",
  "Ce nouveau contexte, marqué également par l’ouverture des marchés internationaux et le commerce international, oblige toutes les entreprises portuaires à s’arrimer aux standards du secteur en améliorant les infrastructures et superstructures, les méthodes de gestion et les offres de service afin d’atteindre un niveau élevé de performance organisationnelle et inter-organisationnelle.",
  "Ces défis se sont imposés au Port Autonome de Douala depuis des années. La modernisation de sa plateforme portuaire de Douala-Bonabéri, instruite par le Chef de l’État, S.E. Paul Biya, le 6 octobre 2011 à Douala, était devenue un impératif absolu.",
  "Plusieurs facteurs, mis ensemble, ont permis en quelques années de transformer en profondeur ce poumon économique du Cameroun, pour en faire une entreprise performante, véritable catalyseur de l’économie nationale. Il s’agit entre autres du décret du 24 janvier 2019 réorganisant le Port Autonome de Douala, des soutiens déterminants tant du gouvernement de la République que du Conseil d’administration, couplés aux nouvelles stratégies de gestion et à la mobilisation de la communauté portuaire autour de la volonté présidentielle. Les bons résultats obtenus ont repositionné stratégiquement, économiquement et socialement le Port Autonome de Douala et sa plateforme portuaire, aussi bien au Cameroun que dans la sous-région Afrique centrale.",
  "L’enjeu aujourd’hui réside dans la consolidation de ces gains de performance retrouvés, une consolidation efficace des acquis étant un levier important de la croissance de l’entreprise.",
  "Afin de répondre aux défis de long terme du commerce maritime et de conserver son statut de port majeur de la côte ouest-africaine, le Port Autonome de Douala a mis en place une stratégie de croissance efficiente. Le schéma directeur de développement du port de Douala-Bonabéri prévoit à cet effet une extension vers un nouveau site portuaire en eau profonde sur l’île de Manoka, dans l’arrondissement de Douala VI.",
  "Ce site, il faut le préciser au moment où le PAD s’apprête à célébrer les 150 ans de sa plateforme portuaire, avait déjà été projeté pendant l’occupation allemande (1884-1916). Il s’agit concrètement d’anticiper la pression qui s’exerce sur ce que nous pouvons commencer à appeler « le vieux port », dont les capacités seront menacées de saturation dans les dix prochaines années.",
  "De plus, si le port de Douala-Bonabéri veut maintenir sa posture de leader dans le Golfe de Guinée, voire sur toute la côte ouest-africaine, et disposer d’un avantage concurrentiel ainsi que de perspectives d’évolution, l’Autorité portuaire doit mettre en œuvre une stratégie qui intègre la forte croissance de la taille des navires, laquelle exige des profondeurs plus importantes.",
  "De nombreux investisseurs se proposent déjà d’accompagner le Port Autonome de Douala dans cette grande réalisation. Le risque est à prendre, car les feux sont au vert, qu’il s’agisse des finances de l’entreprise ou du retour sur investissement pour ceux qui s’engageront dans la construction du nouveau port de Douala-Bonabéri.",
];

export default function MotDuDirecteurPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Le PAD", href: "/le-pad/presentation" }, { label: "Mot du Directeur général" }]}
        title="Performance, consolidation et croissance"
        lead="Le mot de Cyrus Ngo’o, Directeur général du Port Autonome de Douala."
      />
      <SectionLayout nav={<SideNav title="Le PAD" items={sectionPages("Le PAD")} current="/le-pad/mot-du-directeur" />}>
        <div className="grid gap-10 xl:grid-cols-[1fr_16rem]">
          <div className="prose-pad">
            {message.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <p className="pt-4 font-bold text-ink">
              Cyrus Ngo’o
              <br />
              <span className="font-normal text-mute">Directeur général du Port Autonome de Douala</span>
            </p>
          </div>
          <aside className="order-first xl:order-none">
            <figure className="w-48 xl:w-full">
              <div className="relative aspect-[4/5] overflow-hidden bg-alt">
                <Image src="/images/dg.png" alt="Portrait de Cyrus Ngo’o" fill sizes="16rem" className="object-cover object-top" />
              </div>
              <figcaption className="mt-2 text-sm text-mute">Cyrus Ngo’o, Directeur général depuis 2016.</figcaption>
            </figure>
            <div className="mt-6 space-y-3">
              <MoreLink href="/le-pad/gouvernance">Gouvernance</MoreLink>
              <br />
              <MoreLink href="/projets">Projets du port</MoreLink>
            </div>
          </aside>
        </div>
      </SectionLayout>
    </>
  );
}
