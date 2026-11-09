import type { Metadata } from "next";
import Link from "next/link";
import { CouncilCard } from "@/components/council-card";
import { Container, PageHead } from "@/components/ui";
import { councils, type Level } from "@/content/councils";

export const metadata: Metadata = { title: "Councils" };

const levels: Level[] = ["Beginner", "Intermediate", "Advanced"];

export default function CouncilsPage() {
  return (
    <>
      <PageHead
        clause="Councils"
        title={
          <>
            Choose your <span className="text-seal italic">room.</span>
          </>
        }
        lede="Every council runs on the same rules of procedure. What changes is the pace, the stakes and how much reading you will do the night before."
      />

      <Container>
        <div className="mb-16 grid gap-4 sm:grid-cols-3">
          {levels.map((l) => (
            <div key={l} className="rounded-2xl border-2 hairline p-5">
              <p className="display text-3xl">{l}</p>
              <p className="mt-1 text-ink-2">
                {councils.filter((c) => c.level === l).map((c) => c.abbr).join(", ") || "None yet"}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {councils.map((c, i) => (
            <div key={c.slug} className="reveal">
              <CouncilCard council={c} index={i} />
            </div>
          ))}
        </div>

        <p className="mt-20 text-ink-2">
          Study guides are released with the agenda.{" "}
          <Link href="/contact" className="font-semibold text-ink underline decoration-seal decoration-2 underline-offset-4">
            Ask the secretariat
          </Link>{" "}
          if you need help choosing.
        </p>
      </Container>
    </>
  );
}
