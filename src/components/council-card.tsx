import Link from "next/link";
import type { Council } from "@/content/councils";

/** A council as a hanging pennant. Hover lifts it off the wall. */
export function CouncilCard({ council, index }: { council: Council; index: number }) {
  return (
    <Link
      href={`/councils/${council.slug}`}
      className="group relative block focus-visible:outline-none"
      style={{ ["--c" as string]: council.color }}
    >
      <div className="relative h-[340px] origin-top transition-transform duration-500 ease-out-soft group-hover:-rotate-1 group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5">
        <div
          className="absolute inset-0 flex flex-col p-6 text-paper shadow-[0_24px_40px_-26px_rgb(27_26_23/.6)]"
          style={{
            background: council.color,
            clipPath: "polygon(0 0,100% 0,100% 100%,50% 90%,0 100%)",
          }}
        >
          <div className="flex items-center justify-between text-sm font-medium text-paper/70">
            <span>Council {String(index + 1).padStart(2, "0")}</span>
          </div>
          <p className={`display mt-auto break-words ${council.abbr.length > 7 ? "text-[clamp(2.4rem,3.4vw,3rem)]" : "text-[clamp(3.2rem,5vw,4.6rem)]"}`}>{council.abbr}</p>
          <p className="mt-2 min-h-[2.6em] pb-10 text-[1.05rem] leading-snug font-medium text-paper/90">{council.name && council.name !== council.abbr ? council.name : ""}</p>
        </div>
        {/* inner frame line */}
        <div
          className="pointer-events-none absolute inset-3 border border-paper/30"
          style={{ clipPath: "polygon(0 0,100% 0,100% 100%,50% 90%,0 100%)" }}
        />
      </div>
      {council.blurb && <p className="mt-4 text-ink-2 transition-colors group-hover:text-ink">{council.blurb}</p>}
      <p className="mt-4 text-sm font-semibold text-ink">
        {council.agenda.length ? `${council.agenda.length} agenda items` : "Agenda to be announced"}
        <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
      </p>
    </Link>
  );
}
