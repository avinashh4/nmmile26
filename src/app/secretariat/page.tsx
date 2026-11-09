import type { Metadata } from "next";
import Image from "next/image";
import { Clause, Container, PageHead } from "@/components/ui";
import { advisors, secretariat, type Member } from "@/content/secretariat";

export const metadata: Metadata = { title: "Secretariat" };

function Card({ m, i }: { m: Member; i: number }) {
  const tba = m.name === "To be announced";
  return (
    <div className="reveal group">
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-2 transition-transform duration-500 ease-out-soft group-hover:-rotate-1"
        style={{ transform: `rotate(${i % 2 ? 0.6 : -0.6}deg)` }}
      >
        {m.photo ? (
          <Image src={m.photo} alt={m.name} fill className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0" />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="display text-[9rem] text-ink/10">{tba ? "?" : m.name[0]}</span>
          </div>
        )}
        <span className="stamp absolute top-4 left-4 bg-paper/70 text-seal">{tba ? "Pending" : "Confirmed"}</span>
      </div>
      <p className="display mt-5 text-3xl">{m.name}</p>
      <p className="text-ink-2">{m.role}</p>
    </div>
  );
}

export default function SecretariatPage() {
  return (
    <>
      <PageHead
        clause="Secretariat"
        title={
          <>
            The people <span className="text-seal italic">behind the gavel.</span>
          </>
        }
        lede="Students who run the conference: allocations, agendas, logistics and the hundred small things between."
      />
      <Container>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {secretariat.map((m, i) => (
            <Card key={`${m.role}-${i}`} m={m} i={i} />
          ))}
        </div>
        <div className="mt-24">
          <Clause n="2">Faculty</Clause>
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {advisors.map((m, i) => (
              <Card key={`${m.role}-${i}`} m={m} i={i} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
