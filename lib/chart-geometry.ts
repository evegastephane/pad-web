// Géométrie de la carte schématique de l'estuaire du Wouri.
// Repère SVG 1600 × 1000 : la mer au sud-ouest (bas gauche), le port au nord-est (haut droite).

export type Point = { x: number; y: number };

export const VIEWBOX = { width: 1600, height: 1000 };

/** Points de contrôle du chenal, de la bouée Wouri (mer) aux quais de Douala. */
const CHANNEL_CONTROL: Point[] = [
  { x: 610, y: 985 },
  { x: 700, y: 880 },
  { x: 800, y: 790 },
  { x: 905, y: 700 },
  { x: 990, y: 615 },
  { x: 1060, y: 540 },
  { x: 1135, y: 450 },
  { x: 1205, y: 365 },
  { x: 1280, y: 285 },
  { x: 1350, y: 222 },
  { x: 1420, y: 175 },
];

function catmullRom(points: Point[], samplesPerSegment = 24): Point[] {
  const out: Point[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    for (let s = 0; s < samplesPerSegment; s++) {
      const t = s / samplesPerSegment;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

const SAMPLES = catmullRom(CHANNEL_CONTROL);
const CUMULATIVE: number[] = SAMPLES.reduce<number[]>((acc, point, index) => {
  if (index === 0) return [0];
  const prev = SAMPLES[index - 1];
  acc.push(acc[index - 1] + Math.hypot(point.x - prev.x, point.y - prev.y));
  return acc;
}, []);
const TOTAL = CUMULATIVE[CUMULATIVE.length - 1];

const round = (n: number) => Math.round(n * 10) / 10;

function toPath(points: Point[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${round(p.x)} ${round(p.y)}`).join(" ");
}

/** Point et direction (vecteur unitaire) à une fraction t ∈ [0, 1] du chenal. */
export function channelAt(t: number): { point: Point; dir: Point } {
  const target = Math.min(1, Math.max(0, t)) * TOTAL;
  let i = CUMULATIVE.findIndex((d) => d >= target);
  if (i <= 0) i = 1;
  const a = SAMPLES[i - 1];
  const b = SAMPLES[i];
  const span = CUMULATIVE[i] - CUMULATIVE[i - 1] || 1;
  const k = (target - CUMULATIVE[i - 1]) / span;
  const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  return {
    point: { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k },
    dir: { x: (b.x - a.x) / len, y: (b.y - a.y) / len },
  };
}

function slice(from: number, to: number): Point[] {
  const pts: Point[] = [channelAt(from).point];
  for (let i = 0; i < SAMPLES.length; i++) {
    const f = CUMULATIVE[i] / TOTAL;
    if (f > from && f < to) pts.push(SAMPLES[i]);
  }
  pts.push(channelAt(to).point);
  return pts;
}

/** Fraction du tracé où se trouve la bouée de base (fin du chenal extérieur). */
export const BASE_BUOY_AT = 0.5;

export const channelPath = toPath(SAMPLES);
export const outerChannelPath = toPath(slice(0, BASE_BUOY_AT));
export const innerChannelPath = toPath(slice(BASE_BUOY_AT, 1));

export type Buoy = { x: number; y: number; side: "port" | "starboard"; index: number; at: number };

/** 38 bouées latérales réparties de part et d'autre du chenal. */
export const buoys: Buoy[] = Array.from({ length: 38 }, (_, index) => {
  const pair = Math.floor(index / 2);
  const at = 0.03 + (pair / 18) * 0.94 + (index % 2) * 0.012;
  const { point, dir } = channelAt(at);
  const side = index % 2 === 0 ? "port" : "starboard";
  const halfWidth = at < BASE_BUOY_AT ? 26 : 19;
  // Bâbord à gauche en remontant le chenal.
  const normal = side === "port" ? { x: dir.y, y: -dir.x } : { x: -dir.y, y: dir.x };
  return { x: round(point.x + normal.x * halfWidth), y: round(point.y + normal.y * halfWidth), side, index, at };
});

/** Rive ouest : Bonabéri, Cap Cameroun. */
export const westLand =
  "M0 0 L1600 0 L1600 60 C1520 84 1430 104 1374 130 C1340 146 1322 160 1304 177 C1278 200 1256 218 1234 240 C1208 268 1184 294 1159 320 C1134 350 1112 378 1089 405 C1064 436 1040 466 1014 495 C990 522 968 548 944 570 C914 598 884 624 850 640 C806 660 760 656 716 664 C660 676 606 704 548 716 C478 730 404 718 336 738 C264 760 200 800 136 812 C84 822 40 812 0 822 Z";

/** Rive est : Douala, zones portuaires, jusqu'à Manoka. */
export const eastLand =
  "M1600 170 C1560 200 1530 228 1498 252 C1472 272 1450 284 1428 299 C1404 318 1380 340 1358 362 C1332 390 1306 416 1283 442 C1258 470 1234 498 1213 527 C1190 556 1160 588 1146 624 C1132 662 1140 704 1168 736 C1204 776 1268 800 1330 832 C1400 868 1470 920 1520 950 C1550 968 1576 976 1600 980 Z";

/** Îles de mangrove dans l'estuaire, dont Manoka. */
export const islands = [
  "M1006 742 C1040 718 1092 716 1118 744 C1140 770 1126 812 1090 828 C1052 844 1004 832 990 804 C980 784 986 758 1006 742 Z",
  "M1150 868 C1176 850 1218 856 1232 882 C1244 906 1222 932 1192 936 C1164 940 1138 924 1136 902 C1134 888 1140 876 1150 868 Z",
  "M906 862 C924 852 950 856 956 874 C962 890 948 904 928 904 C910 904 896 892 898 878 C899 870 902 866 906 862 Z",
];

/** Front de quais schématique de la rive est (port de commerce). */
export const quayLine = "M1534 222 C1504 246 1474 264 1446 284 C1416 306 1390 330 1366 352 C1338 380 1314 404 1294 428";

/** Quai de Bonabéri, rive ouest. */
export const bonaberiQuay = "M1392 122 C1366 134 1344 148 1326 162";

export const anchorage = (() => {
  const { point, dir } = channelAt(0.43);
  const normal = { x: -dir.y, y: dir.x };
  return { x: round(point.x + normal.x * 66), y: round(point.y + normal.y * 66), angle: round((Math.atan2(dir.y, dir.x) * 180) / Math.PI) };
})();

