// Données institutionnelles du PAD, reprises et nettoyées depuis pad.cm.

export const contact = {
  name: "Port Autonome de Douala",
  postal: "BP 4020 Douala, Cameroun",
  address: "Centre des affaires maritimes, Bonanjo, Douala",
  phones: ["+237 233 435 500", "+237 233 420 133"],
  emails: ["contact@pad.cm", "info@pad.cm"],
  hours: "Du lundi au vendredi, 7 h 30 – 17 h 30",
  coordinates: "4° 03′ N · 9° 42′ E",
};

export const socials = [
  { label: "Facebook", href: "https://fr-fr.facebook.com/PADofficiel/" },
  { label: "LinkedIn", href: "https://cm.linkedin.com/in/port-authority-of-douala-15307b1b7" },
];

/** Applications professionnelles du PAD (accès réservé). */
export const proLinks = [
  {
    name: "Cargo Web",
    text: "Application de gestion des escales de navires.",
    href: "https://escalenavire.pad.cm:804/cargo?c=WCPAD",
  },
  {
    name: "SIIPPI PAD",
    text: "Préparation, programmation et budgétisation des projets du PAD.",
    href: "https://projet.pad.cm:915/",
  },
  {
    name: "Base documentaire du CDA/PAD",
    text: "Plateforme d’archivage du Centre de documentation et des archives.",
    href: "https://nas-archives.pad.cm:2301/#/signin",
  },
  {
    name: "Enquête de satisfaction",
    text: "Questionnaire de mesure de la satisfaction des clients du port.",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSdNRvDl240C-_kXzMq8JI7eicQGbHId6VTaO6Ph0-sixr1Eyg/viewform?usp=sf_link",
  },
];

export const missions = [
  "La coordination générale des activités portuaires",
  "L’assistance et l’accueil des navires",
  "La création et l’aménagement des zones industrielles portuaires",
  "La promotion de la place portuaire",
  "La sécurité et la police des opérations d’exploitation portuaire",
  "La gestion, la maintenance et le renouvellement des équipements portuaires",
  "La maîtrise d’ouvrage des travaux confiés aux entreprises spécialisées, y compris le dragage",
  "Les travaux d’équipement, d’extension et d’entretien du port",
];

export const values = ["Travail", "Honnêteté", "Responsabilité"];

export const axes = [
  { name: "Performance", text: "Un chiffre d’affaires passé de 64 à 74,4 milliards de FCFA HT entre 2021 et 2022, et une attente des porte-conteneurs ramenée de 87 h à 37 h." },
  { name: "Attractivité", text: "Des délégations d’investisseurs japonais, qataris et émiriens reçues en 2023, et un partenariat renouvelé avec le port d’Anvers-Bruges." },
  { name: "Compétitivité", text: "La transformation des régies en filiales et succursales : RTC, RDR, RDD et DPS." },
];

export type NavItem = { label: string; href: string; children?: { label: string; href: string; note?: string }[] };

export const navigation: NavItem[] = [
  {
    label: "Le PAD",
    href: "/le-pad/presentation",
    children: [
      { label: "Présentation", href: "/le-pad/presentation", note: "Missions, vision, valeurs" },
      { label: "Mot du Directeur général", href: "/le-pad/mot-du-directeur", note: "Cyrus Ngo’o" },
      { label: "Histoire", href: "/le-pad/histoire", note: "De 1881 à aujourd’hui" },
      { label: "Gouvernance", href: "/le-pad/gouvernance", note: "Direction et conseil" },
      { label: "Certifications", href: "/le-pad/certifications", note: "ISO 9001, ISO 26000" },
      { label: "Filiales", href: "/le-pad/filiales", note: "RTC, RDR, RDD, DPS, RPI" },
    ],
  },
  {
    label: "Le port",
    href: "/infrastructures",
    children: [
      { label: "Infrastructures", href: "/infrastructures", note: "Chenal et 11 zones" },
      { label: "Hinterland", href: "/hinterland", note: "Sept pays desservis" },
      { label: "Projets", href: "/projets", note: "Chantiers et réalisations" },
      { label: "Finances", href: "/finances", note: "Résultats et notation" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Pilotage", href: "/services/pilotage", note: "Obligatoire dès 200 TJB" },
      { label: "Remorquage et lamanage", href: "/services/remorquage", note: "Obligatoire dès 600 TJB" },
      { label: "Manutention", href: "/services/manutention", note: "GPAC, ASSA, RTC" },
      { label: "Entreposage", href: "/services/entreposage", note: "66 000 m² de magasins" },
      { label: "Réparation navale", href: "/services/reparation-navale", note: "CNIC, docks flottants" },
    ],
  },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

/** Pages d’une rubrique de la navigation, pour le menu latéral. */
export function sectionPages(label: string) {
  return navigation.find((item) => item.label === label)?.children ?? [];
}

/** Faits du chenal, source : page « Qui sommes-nous » du PAD. */
export const channel = {
  length: "50 km",
  buoys: 38,
  outer: { length: "25 km", width: "250 m" },
  inner: { length: "25 km", width: "150 m" },
  depth: "−7,00 m",
  depthSince: "21 juillet 2014",
  draft: "9,00 m",
  radar: "80 km",
  pilots: 10,
  pilotBoats: 3,
};

export const legend = [
  { value: "50", unit: "km", label: "de chenal, de la bouée Wouri aux quais" },
  { value: "38", unit: "bouées", label: "lumineuses, système AISM" },
  { value: "9,00", unit: "m", label: "de tirant d’eau offert aux navires" },
  { value: "11", unit: "zones", label: "géographiques d’exploitation" },
  { value: "2/3", unit: "", label: "des échanges des pays de l’hinterland" },
];

export type ChannelStep = { id: string; at: number; km: string; title: string; place: string; text: string; facts: string[] };

/** Étapes du parcours d’un navire, positionnées en fraction du tracé du chenal. */
export const channelSteps: ChannelStep[] = [
  {
    id: "atterrissage",
    at: 0,
    km: "km 0",
    place: "Bouée Wouri",
    title: "L’atterrissage",
    text: "Le navire arrive du Golfe de Guinée et prend la bouée d’atterrissage, entrée du chenal extérieur.",
    facts: ["Surveillance radar du plan d’eau : 80 km de portée", "Phares côtiers et veille radio permanente"],
  },
  {
    id: "exterieur",
    at: 0.25,
    km: "km 0 – 25",
    place: "Chenal extérieur",
    title: "25 km sur 250 m de large",
    text: "La partie extérieure mène de la bouée Wouri à la bouée de base, balisée par des bouées latérales lumineuses.",
    facts: ["38 bouées et deux balises radio à réflecteur radar", "Baliseur Nyong pour l’entretien du balisage"],
  },
  {
    id: "mouillage",
    at: 0.43,
    km: "Entre les deux chenaux",
    place: "Zone de mouillage",
    title: "L’attente au mouillage",
    text: "Entre les deux parties du chenal, une zone d’environ 1,5 mille de côté accueille les navires en attente d’un quai.",
    facts: ["Attente moyenne des porte-conteneurs : 37 h en 2022", "Contre 87 h en 2021 (analyse DAPC)"],
  },
  {
    id: "base",
    at: 0.5,
    km: "km 25",
    place: "Bouée de base",
    title: "Le pilote monte à bord",
    text: "À partir de la bouée de base, tout navire de 200 tonneaux de jauge brute ou plus est accompagné par un pilote du PAD, 24 h/24.",
    facts: ["10 pilotes et 3 pilotines", "Remorquage obligatoire dès 600 TJB"],
  },
  {
    id: "interieur",
    at: 0.75,
    km: "km 25 – 50",
    place: "Chenal intérieur",
    title: "25 km dragués en permanence",
    text: "La partie intérieure, large de 150 m, subit une sédimentation régulière. Le PAD la drague pour garantir l’accès aux quais.",
    facts: ["Cote officielle −7,00 m depuis le 21 juillet 2014", "Tirant d’eau de 9,00 m avec le marnage"],
  },
  {
    id: "quais",
    at: 1,
    km: "km 50",
    place: "Douala-Bonabéri",
    title: "À quai",
    text: "Le navire accoste dans l’une des 11 zones du port : terminal à conteneurs, terminaux spécialisés, port de pêche ou réparation navale.",
    facts: ["1 999 escales en 2022", "12,48 millions de tonnes de trafic en 2022"],
  },
];

export type Zone = { id: string; name: string; text: string };

export const zones: Zone[] = [
  { id: "vieux-port", name: "Port à marchandises diverses", text: "Il occupe l’emplacement de ce que l’on appelle aujourd’hui « le vieux port »." },
  { id: "conteneurs", name: "Terminal à conteneurs", text: "Modernisé, il reçoit le trafic des conteneurs et des véhicules importés, sur les postes 14 à 17." },
  { id: "bois", name: "Terminal bois", text: "Dédié au traitement du bois." },
  { id: "fruitier", name: "Terminal fruitier", text: "Trafic conventionnel et trafic des fruits : banane, ananas, et céréales." },
  { id: "mineralier", name: "Terminal minéralier", text: "Alumine à l’import, aluminium à l’export." },
  { id: "petrolier", name: "Terminal pétrolier", text: "Un duc d’Albe pour l’accostage des pétroliers, à 200 m de la rive gauche du Wouri." },
  { id: "peche", name: "Port de pêche", text: "Organisé autour de la darse amont, en cours de modernisation." },
  { id: "reparation", name: "Réparation navale", text: "Zone gérée par le Chantier Naval et Industriel du Cameroun (CNIC)." },
  { id: "hinterland", name: "Logistique hinterland", text: "Zones de support logistique au trafic des pays de l’hinterland." },
  { id: "petrole", name: "Logistique pétrolière", text: "Zones de support logistique à la recherche pétrolière." },
  { id: "entreposage", name: "Entreposage longue durée", text: "Magasins en amont et en aval du port de commerce." },
];

export const capacities = [
  { value: "66 000 m²", label: "de magasins banalisés" },
  { value: "15 Mt", label: "de capacité de stockage" },
  { value: "80 000 m²", label: "de surface pour le trafic conventionnel" },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  image: string;
  imageAlt: string;
  body: string[];
  facts: { label: string; value: string }[];
};

export const services: Service[] = [
  {
    slug: "pilotage",
    name: "Pilotage",
    short: "Un pilote du PAD assiste le capitaine à l’entrée et à la sortie du port.",
    image: "/images/capitaine.jpg",
    imageAlt: "Un capitaine et son équipage à la passerelle d’un navire",
    body: [
      "Le pilotage est l’assistance apportée au capitaine d’un navire par un pilote du PAD lors des manœuvres d’entrée et de sortie du port.",
      "Le port de Douala accueille les navires 24 h/24. Tout navire de 200 tonneaux de jauge brute ou plus, entrant ou sortant, doit être accompagné par un pilote du PAD à partir de la bouée de base du chenal du Wouri.",
      "En port d’estuaire, cette assistance garantit la sécurité des navires de grand jaugeage sur les 25 km du chenal intérieur.",
    ],
    facts: [
      { label: "Seuil obligatoire", value: "200 TJB" },
      { label: "Disponibilité", value: "24 h/24" },
      { label: "Pilotes", value: "10" },
      { label: "Pilotines", value: "3" },
    ],
  },
  {
    slug: "remorquage",
    name: "Remorquage et lamanage",
    short: "Remorquage obligatoire dès 600 TJB, assuré par la Régie du remorquage.",
    image: "/images/remorquage.png",
    imageAlt: "Remorqueur du port de Douala",
    body: [
      "Le remorquage est obligatoire pour tout navire de 600 tonneaux de jauge brute ou plus. Le lamanage consiste à maintenir un navire à quai à l’aide d’amarres.",
      "Concédées au secteur privé depuis 2005, ces activités ont été reprises en régie par le PAD le 2 janvier 2021, après le départ du concessionnaire Boluda. La Régie du remorquage, devenue filiale (RDR), a réalisé un chiffre d’affaires de 5 milliards de FCFA en 2022.",
      "Deux remorqueurs neufs ASD 2811 de 60 tonnes de traction ont été commandés au chantier Damen Shipyards Gorinchem pour renouveler la flotte.",
    ],
    facts: [
      { label: "Seuil obligatoire", value: "600 TJB" },
      { label: "Reprise en régie", value: "2 janvier 2021" },
      { label: "CA 2022 de la RDR", value: "5 Md FCFA" },
      { label: "Remorqueurs commandés", value: "2 × ASD 2811" },
    ],
  },
  {
    slug: "manutention",
    name: "Manutention",
    short: "Concédée à des sociétés privées regroupées en syndicats : GPAC, ASSA, RTC.",
    image: "/images/manutention.jpg",
    imageAlt: "Portique sur parc à conteneurs au terminal de Douala",
    body: [
      "La manutention au port de Douala est concédée à des sociétés privées expérimentées, regroupées en syndicats. Le plus important est le GPAC, Groupement professionnel des acconiers du Cameroun.",
      "Les principales sociétés chargées des opérations de manutention sont ASSA et la Régie du terminal à conteneurs (RTC), qui a traité 340 000 EVP en 2022.",
    ],
    facts: [
      { label: "Syndicat principal", value: "GPAC" },
      { label: "Opérateurs", value: "ASSA, RTC" },
      { label: "Conteneurs RTC 2022", value: "340 000 EVP" },
    ],
  },
  {
    slug: "entreposage",
    name: "Entreposage",
    short: "66 000 m² de magasins et 15 millions de tonnes de capacité de stockage.",
    image: "/images/port-vue.jpg",
    imageAlt: "Vue d’artiste des nouveaux magasins du port, le long du quai",
    body: [
      "Le PAD met à la disposition des opérateurs privés 66 000 m² de magasins banalisés, 15 millions de tonnes de capacité de stockage et 80 000 m² de surface pour le trafic conventionnel.",
      "Des zones d’entreposage longue durée existent en amont et en aval du port de commerce. Les anciens magasins sont progressivement reconstruits aux standards internationaux par l’entreprise Erdem, avec 50 % de capacité de stockage en plus.",
    ],
    facts: [
      { label: "Magasins banalisés", value: "66 000 m²" },
      { label: "Capacité de stockage", value: "15 Mt" },
      { label: "Trafic conventionnel", value: "80 000 m²" },
    ],
  },
  {
    slug: "reparation-navale",
    name: "Réparation navale",
    short: "Le CNIC dispose d’un atelier et de trois docks flottants de 500 et 1 000 tonnes.",
    image: "/images/maintenance-navale.png",
    imageAlt: "Navire en maintenance au chantier naval de Douala",
    body: [
      "La réparation navale apporte des solutions aux problèmes des navires à quai.",
      "Elle est assurée par le Chantier Naval et Industriel du Cameroun (CNIC), installé au port de Douala, qui dispose d’un atelier équipé de machines-outils et de trois docks flottants de 500 et 1 000 tonnes pour le carénage des navires.",
    ],
    facts: [
      { label: "Opérateur", value: "CNIC" },
      { label: "Docks flottants", value: "3" },
      { label: "Capacités", value: "500 et 1 000 t" },
    ],
  },
];

export const leadership = [
  { name: "Shey Jones Yembe", role: "Président du Conseil d’administration", image: "/images/pca.jpg" },
  { name: "Cyrus Ngo’o", role: "Directeur général, depuis 2016", image: "/images/dg.png" },
  { name: "Charles Michaux Moukoko Njoh", role: "Directeur général adjoint", image: "/images/dga.jpg" },
];

export const subsidiaries = [
  {
    code: "RTC",
    name: "Régie du Terminal à Conteneurs S.A.",
    kind: "Filiale",
    text: "Exploite le terminal à conteneurs depuis le 31 décembre 2019. En 2022 : 340 000 EVP et 54 milliards de FCFA de chiffre d’affaires. Capital initial de 100 millions de FCFA. Sa création par le PAD a été confirmée par la CCJA d’Abidjan le 30 novembre 2023.",
  },
  {
    code: "RDR",
    name: "Régie du Remorquage S.A.",
    kind: "Filiale",
    text: "Reprise en régie le 2 janvier 2021 avec une flotte ancienne, elle a renoué avec la croissance : 5 milliards de FCFA de chiffre d’affaires en 2022. Capital initial de 10 millions de FCFA. Deux remorqueurs neufs sont en commande.",
  },
  {
    code: "RDD",
    name: "Régie déléguée de Dragage",
    kind: "Succursale",
    text: "Créée en décembre 2018, elle assure le dragage du chenal et des plans d’eau, indispensable pour maintenir la cote de −7,00 m du chenal intérieur.",
  },
  {
    code: "DPS",
    name: "Douala Port Security",
    kind: "Succursale",
    text: "Créée en janvier 2020 comme régie déléguée de police et de sécurité du port de Douala-Bonabéri.",
  },
  {
    code: "RPI",
    name: "Régie du Patrimoine Immobilier",
    kind: "Créée en 2023",
    text: "Créée par le Conseil d’administration en mai 2023 pour gérer le patrimoine immobilier du PAD : 23 propriétés immatriculées, dont 22 bâties à Douala, sur 20 ha 77 a.",
  },
];

export const history = [
  { year: "XIXᵉ s.", text: "L’estuaire du Wouri, à 50 km de la mer, est une zone d’échanges entre les habitants des côtes et les commerçants de Hambourg et de Brême." },
  { year: "1881", text: "Selon certaines sources, la compagnie de navigation allemande Woermann-Linie développe le site pour la première fois." },
  { year: "1914", text: "Le port reçoit des navires de 4 m de tirant d’eau : un quai de 60 m, sept quais privés, un quai de 100 m à Bonabéri et un quai flottant de 900 tonnes. Capacité : 100 000 tonnes par an." },
  { year: "1922", text: "Fin des travaux d’extension sous administration française, qui prolonge aussi le chemin de fer." },
  { year: "1960", text: "À l’indépendance, la structure devient la Direction des ports et voies navigables du ministère des Transports." },
  { year: "1971", text: "Une loi fédérale crée l’Office national des ports du Cameroun (ONPC)." },
  { year: "1977", text: "Une table ronde réunit les acteurs portuaires et prépare la réforme du secteur." },
  { year: "1988", text: "La loi du 24 décembre 1988 fixe les nouveaux défis du secteur portuaire." },
  { year: "1999", text: "Le PAD ouvre les activités portuaires à la concurrence : manutention, gestion du terminal à conteneurs." },
  { year: "2016", text: "Cyrus Ngo’o est nommé Directeur général." },
  { year: "2019", text: "Décret du 24 janvier 2019 de réorganisation du PAD ; la RTC reprend le terminal à conteneurs le 31 décembre." },
  { year: "2021", text: "Le PAD reprend en régie le remorquage le 2 janvier." },
  { year: "2022", text: "Le 30 décembre, la RTC et la RDR deviennent des filiales ; la RDD et la DPS, des succursales." },
  { year: "2023", text: "Création de la Régie du Patrimoine Immobilier (RPI)." },
];

export const projects = [
  {
    title: "Dragage et approfondissement du chenal",
    status: "En cours",
    text: "Maintenir et approfondir le chenal d’accès de 50 km pour accueillir des navires plus grands.",
  },
  {
    title: "Enlèvement des épaves",
    status: "En cours",
    text: "Première phase d’environ 10 milliards de FCFA ; la seconde, d’environ 9 milliards, concerne le quai de servitude et le port de pêche.",
  },
  {
    title: "Reconstruction des magasins",
    status: "En cours",
    text: "L’entreprise turque Erdem remplace les anciens magasins par des bâtiments aux standards internationaux, avec 50 % de stockage en plus.",
  },
  {
    title: "Silos à céréales",
    status: "En cours",
    text: "Projet conjoint PAD – Africa Food Industry d’environ 5 milliards de FCFA, à la place de l’ancien magasin 10.",
  },
  {
    title: "Voies de contournement et parking camions",
    status: "En cours",
    text: "Voies de contournement, dessertes et parking de 2 hectares en zone aval.",
  },
  {
    title: "Zone logistique et parking d’attente",
    status: "Convention signée",
    text: "Convention du 21 décembre 2023 avec SAPRO Logistics Cameroun pour la zone aval.",
  },
  {
    title: "Modernisation du port de pêche",
    status: "Convention signée",
    text: "Convention signée avec Douala Port Fishing Terminal en juillet 2023.",
  },
  {
    title: "Renouvellement de la flotte de remorquage",
    status: "Commande passée",
    text: "Deux remorqueurs ASD 2811 commandés à Damen Shipyards pour 11,66 milliards de FCFA TTC.",
  },
  {
    title: "Système d’information portuaire",
    status: "En service",
    text: "Système d’information et de gestion automatique du fret portuaire.",
  },
  {
    title: "Sûreté et sécurité",
    status: "En cours",
    text: "Patrouilleurs rapides, radars, caméras de surveillance et rénovation de l’éclairage.",
  },
  {
    title: "Extension en eau profonde à Manoka",
    status: "À l’étude",
    text: "Projet d’extension du port vers l’île de Manoka, à l’embouchure de l’estuaire.",
  },
];

/** Pays de l’hinterland et capitales, coordonnées réelles (lat, lon). */
export const hinterland = [
  { country: "Tchad", city: "N’Djamena", lat: 12.13, lon: 15.06 },
  { country: "République centrafricaine", city: "Bangui", lat: 4.39, lon: 18.56 },
  { country: "Congo", city: "Brazzaville", lat: -4.27, lon: 15.28 },
  { country: "RD Congo", city: "Kinshasa", lat: -4.32, lon: 15.31 },
  { country: "Gabon", city: "Libreville", lat: 0.39, lon: 9.45 },
  { country: "Guinée équatoriale", city: "Malabo", lat: 3.75, lon: 8.78 },
  { country: "Nigéria", city: "Abuja", lat: 9.07, lon: 7.4 },
];

export const douala = { lat: 4.05, lon: 9.7 };

export const finances = {
  rating: { longTerm: "A", shortTerm: "A2", outlook: "stable", agency: "Bloomfield Investment Corporation" },
  bloomfield: { from: { year: "2017", value: "38,0 Md FCFA" }, to: { year: "2021", value: "65,5 Md FCFA" } },
  dapc: { previous: { year: "2021", value: "64,0 Md FCFA HT" }, current: { year: "2022", value: "74,4 Md FCFA HT" } },
  group2022: { revenue: "131,5 Md FCFA", net: "16,1 Md FCFA", total: "411 Md FCFA" },
};

export const partners = [
  { name: "Alucam", logo: "/images/partners/alucam-logo.jpg" },
  { name: "Cimencam", logo: "/images/partners/cimencam.png" },
  { name: "Dangote Cement", logo: "/images/partners/dangote-cement.jpg" },
  { name: "Cimaf", logo: "/images/partners/logo-cimaf-retina.jpg" },
  { name: "SGMC", logo: "/images/partners/logo-sgmc.jpg" },
  { name: "SCDP", logo: "/images/partners/scdpcam-sa_3.jpg" },
  { name: "TAC", logo: "/images/partners/tac.jpg" },
  { name: "Schlumberger", logo: "/images/partners/schlumberger.jpeg" },
  { name: "TotalEnergies", logo: "/images/partners/total.jpeg" },
];
