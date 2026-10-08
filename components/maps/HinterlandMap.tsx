import { douala, hinterland } from "@/content/data/site";

// Projection équirectangulaire : longitudes 4°E → 22°E, latitudes 15°N → 7°S.
const LON0 = 4;
const LON1 = 22;
const LAT0 = 15;
const LAT1 = -7;
const W = 720;
const H = 880;
const project = (lat: number, lon: number) => ({
  x: ((lon - LON0) / (LON1 - LON0)) * W,
  y: ((LAT0 - lat) / (LAT0 - LAT1)) * H,
});

const labelOffset: Record<string, { dx: number; dy: number; anchor: "start" | "end" }> = {
  "N’Djamena": { dx: 14, dy: -6, anchor: "start" },
  Bangui: { dx: 14, dy: 6, anchor: "start" },
  Brazzaville: { dx: -14, dy: -6, anchor: "end" },
  Kinshasa: { dx: 14, dy: 16, anchor: "start" },
  Libreville: { dx: -14, dy: 6, anchor: "end" },
  Malabo: { dx: -14, dy: 6, anchor: "end" },
  Abuja: { dx: -14, dy: -6, anchor: "end" },
};

const text = { fontFamily: "var(--font-sans)" };

/** Carte statique des liaisons entre Douala et les capitales de l’hinterland. */
export function HinterlandMap({ className = "" }: { className?: string }) {
  const origin = project(douala.lat, douala.lon);
  return (
    <svg
      viewBox={`-40 -20 ${W + 80} ${H + 40}`}
      role="img"
      aria-label="Carte des liaisons du port de Douala vers les capitales des sept pays de l’hinterland"
      className={`h-auto w-full ${className}`}
    >
      <rect x="-40" y="-20" width={W + 80} height={H + 40} fill="#f4f6fa" />
      <g stroke="#d9dde5" strokeWidth="1">
        {[5, 10, 15, 20].map((lon) => {
          const { x } = project(0, lon);
          return <line key={lon} x1={x} x2={x} y1={-20} y2={H + 20} />;
        })}
        {[15, 10, 5, 0, -5].map((lat) => {
          const { y } = project(lat, 0);
          return <line key={lat} y1={y} y2={y} x1={-40} x2={W + 40} />;
        })}
      </g>
      <g fill="#5d6678" fontSize="16" style={text}>
        {[5, 10, 15, 20].map((lon) => (
          <text key={lon} x={project(0, lon).x + 6} y={H + 12}>
            {lon}° E
          </text>
        ))}
        {[10, 5, 0, -5].map((lat) => (
          <text key={lat} x={-34} y={project(lat, 0).y - 6}>
            {lat === 0 ? "Équateur" : `${Math.abs(lat)}° ${lat > 0 ? "N" : "S"}`}
          </text>
        ))}
      </g>

      <g fill="none" stroke="#193c78" strokeWidth="2">
        {hinterland.map((place) => {
          const p = project(place.lat, place.lon);
          const mx = (origin.x + p.x) / 2;
          const my = (origin.y + p.y) / 2 - Math.hypot(p.x - origin.x, p.y - origin.y) * 0.18;
          return <path key={place.city} d={`M${origin.x} ${origin.y} Q${mx} ${my} ${p.x} ${p.y}`} />;
        })}
      </g>

      {hinterland.map((place) => {
        const p = project(place.lat, place.lon);
        const o = labelOffset[place.city];
        return (
          <g key={place.city}>
            <circle cx={p.x} cy={p.y} r="8" fill="#ffffff" stroke="#193c78" strokeWidth="2.5" />
            <text
              x={p.x + o.dx}
              y={p.y + o.dy}
              textAnchor={o.anchor}
              fill="#1b2230"
              stroke="#f4f6fa"
              strokeWidth="6"
              paintOrder="stroke"
              fontSize="24"
              fontWeight="700"
              style={text}
            >
              {place.city}
            </text>
          </g>
        );
      })}

      <circle cx={origin.x} cy={origin.y} r="11" fill="#193c78" />
      <text
        x={origin.x + 22}
        y={origin.y + 40}
        fill="#193c78"
        stroke="#f4f6fa"
        strokeWidth="7"
        paintOrder="stroke"
        fontSize="30"
        fontWeight="700"
        style={text}
      >
        Douala
      </text>
      <text x={project(-1.5, 5).x} y={project(-1.5, 5).y} fill="#0f6fb0" fontSize="24" style={{ ...text, fontStyle: "italic" }}>
        Océan Atlantique
      </text>
    </svg>
  );
}
