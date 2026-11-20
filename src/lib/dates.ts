const TZ = "Asia/Bahrain";
const part = (d: Date, o: Intl.DateTimeFormatOptions) => d.toLocaleDateString("en-GB", { timeZone: TZ, ...o });

/** "11 and 12 December 2026", or a single date if there is no end. */
export function formatDates(from: string, to?: string | null) {
  const a = new Date(from);
  if (!to) return part(a, { day: "numeric", month: "long", year: "numeric" });
  const b = new Date(to);
  const sameMonth = part(a, { month: "long", year: "numeric" }) === part(b, { month: "long", year: "numeric" });
  if (sameMonth) return `${part(a, { day: "numeric" })} and ${part(b, { day: "numeric", month: "long", year: "numeric" })}`;
  return `${part(a, { day: "numeric", month: "long" })} to ${part(b, { day: "numeric", month: "long", year: "numeric" })}`;
}
