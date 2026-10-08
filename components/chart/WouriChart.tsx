import {
  BASE_BUOY_AT,
  VIEWBOX,
  anchorage,
  bonaberiQuay,
  buoys,
  channelAt,
  channelPath,
  eastLand,
  innerChannelPath,
  islands,
  outerChannelPath,
  quayLine,
  westLand,
} from "@/lib/chart-geometry";

const c = {
  sea: "#ffffff",
  shoal: "#e3eef8",
  land: "#eef0f3",
  landEdge: "#b8c0cc",
  ink: "#1b2230",
  navy: "#193c78",
  lime: "#ccd404",
  water: "#0f6fb0",
};

const label = { fontFamily: "var(--font-sans)", fontWeight: 700 };

/** Schéma statique de l’estuaire du Wouri : rives, chenal balisé, mouillage, quais. */
export function WouriChart({ className }: { className?: string }) {
  const base = channelAt(BASE_BUOY_AT).point;
  const landfall = channelAt(0).point;

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Schéma de l’estuaire du Wouri : le chenal de 50 km relie la bouée Wouri, en mer, aux quais de Douala-Bonabéri."
    >
      <rect width={VIEWBOX.width} height={VIEWBOX.height} fill={c.sea} />

      <g strokeLinejoin="round" fill="none">
        {[westLand, eastLand, ...islands].map((d, i) => (
          <path key={i} d={d} stroke={c.shoal} strokeWidth="90" />
        ))}
      </g>
      <g fill={c.land} stroke={c.landEdge} strokeWidth="1.5">
        <path d={westLand} />
        <path d={eastLand} />
        {islands.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      <g fill="none" stroke={c.navy} strokeWidth="5">
        <path d={quayLine} />
        <path d={bonaberiQuay} />
      </g>

      <g fill="none">
        <path d={outerChannelPath} stroke={c.navy} strokeWidth="40" strokeDasharray="8 6" />
        <path d={outerChannelPath} stroke={c.sea} strokeWidth="37" />
        <path d={innerChannelPath} stroke={c.navy} strokeWidth="28" strokeDasharray="8 6" />
        <path d={innerChannelPath} stroke={c.sea} strokeWidth="25" />
        <path d={channelPath} stroke={c.navy} strokeWidth="2" />
      </g>

      <g transform={`translate(${anchorage.x} ${anchorage.y}) rotate(${anchorage.angle})`}>
        <rect x="-34" y="-24" width="68" height="48" fill="none" stroke={c.water} strokeWidth="1.5" strokeDasharray="6 4" />
      </g>

      <g>
        {buoys.map((b) =>
          b.side === "port" ? (
            <rect key={b.index} x={b.x - 4} y={b.y - 4} width="8" height="8" fill={c.navy} />
          ) : (
            <path key={b.index} d={`M${b.x} ${b.y - 5.5} L${b.x + 5} ${b.y + 4} L${b.x - 5} ${b.y + 4} Z`} fill={c.lime} stroke={c.navy} strokeWidth="1" />
          ),
        )}
      </g>

      <g fill="none" stroke={c.ink} strokeWidth="1.5">
        <circle cx={landfall.x} cy={landfall.y} r="10" />
        <circle cx={base.x} cy={base.y} r="10" />
      </g>

      <g fill={c.ink} style={label}>
        <text x="1440" y="430" textAnchor="middle" fontSize="28">Douala</text>
        <text x="1250" y="96" textAnchor="middle" fontSize="28">Bonabéri</text>
        <text x="1062" y="788" textAnchor="middle" fontSize="18">Manoka</text>
        <text x="420" y="690" textAnchor="middle" fontSize="20">Cap Cameroun</text>
        <text x={landfall.x + 20} y={landfall.y - 8} fontSize="18">Bouée Wouri</text>
        <text x={base.x + 20} y={base.y + 28} fontSize="18">Bouée de base</text>
        <text x={anchorage.x + 46} y={anchorage.y - 14} fontSize="18">Zone de mouillage</text>
      </g>
      <g fill={c.water} style={{ fontFamily: "var(--font-sans)", fontStyle: "italic" }}>
        <text x="190" y="935" fontSize="38">Golfe de Guinée</text>
        <text fontSize="24" transform="translate(1215 470) rotate(-48)" textAnchor="middle">
          Estuaire du Wouri
        </text>
      </g>
    </svg>
  );
}
