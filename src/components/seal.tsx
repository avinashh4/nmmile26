/** Wax-seal mark. A scalloped disc with an embossed monogram. */
export function Seal({
  size = 40,
  letter = "N",
  className = "",
  color = "var(--color-seal)",
}: {
  size?: number;
  letter?: string;
  className?: string;
  color?: string;
}) {
  const lobes = 14;
  const pts: string[] = [];
  for (let i = 0; i <= lobes * 8; i++) {
    const a = (i / (lobes * 8)) * Math.PI * 2;
    const r = 46 + Math.sin(a * lobes) * 2.6 + Math.sin(a * 3 + 1) * 0.8;
    pts.push(`${(50 + Math.cos(a) * r).toFixed(2)},${(50 + Math.sin(a) * r).toFixed(2)}`);
  }
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <polygon points={pts.join(" ")} fill={color} />
      <circle cx="50" cy="50" r="33" fill="none" stroke="rgb(0 0 0 / .22)" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="33" fill="none" stroke="rgb(255 255 255 / .18)" strokeWidth="1" transform="translate(-0.8 -0.8)" />
      <text
        x="50"
        y="51"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-instrument), serif"
        fontSize="46"
        fill="rgb(0 0 0 / .28)"
      >
        {letter}
      </text>
      <text
        x="49"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-instrument), serif"
        fontSize="46"
        fill="rgb(255 240 230 / .55)"
      >
        {letter}
      </text>
    </svg>
  );
}
