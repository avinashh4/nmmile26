import type { Metadata } from "next";
import Link from "next/link";
import { CouncilCard } from "@/components/council-card";
import { Container, PageHead } from "@/components/ui";
import { councils } from "@/content/councils";

export const metadata: Metadata = { title: "Councils" };

export default function CouncilsPage() {
  return (
    <>
      <PageHead
        clause="Councils"
        title={
          <>
            Choose your <span className="text-laurel">room.</span>
          </>
        }
        lede={`${councils.length} councils this year. Agendas and study guides are released together.`}
      />

      <Container>
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {councils.map((c, i) => (
            <div key={c.slug} className="reveal">
              <CouncilCard council={c} index={i} />
            </div>
          ))}
        </div>

        <p className="mt-20 text-ink-2">
          Study guides are released with the agenda.{" "}
          <Link href="/contact" className="font-semibold text-ink underline decoration-laurel decoration-2 underline-offset-4">
            Ask the secretariat
          </Link>{" "}
          if you need help choosing.
        </p>
      </Container>
    </>
  );
}
