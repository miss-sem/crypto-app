export default function Sparkline({ prices, positive, width = 80, height = 32 }) {
  if (!prices || prices.length < 2) return null;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  const pts = prices
    .map((p, i) =>
      `${(i / (prices.length - 1)) * width},${height - ((p - min) / range) * (height - 4) - 2}`
    )
    .join(" ");

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <polyline
        points={pts}
        fill="none"
        stroke={positive ? "#16a34a" : "#dc2626"}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
