import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RegisterButton } from "@/components/register-button";
import { Clause, Container } from "@/components/ui";
import { councils, getCouncil } from "@/content/councils";

export function generateStaticParams() {
  return councils.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/councils/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCouncil(slug);
  return c ? { title: `${c.abbr}: ${c.name}`, description: c.blurb } : {};
}

export default async function CouncilPage({ params }: PageProps<"/councils/[slug]">) {
  const { slug } = await params;
  const c = getCouncil(slug);
  if (!c) notFound();
  const i = councils.indexOf(c);
  const prev = councils[(i - 1 + councils.length) % councils.length];
  const next = councils[(i + 1) % councils.length];

  return (
    <>
      <section className="relative overflow-hidden text-paper" style={{ background: c.color }}>
        <div
          className="pointer-events-none absolute -right-[8vw] -bottom-[6vw] display text-[38vw] leading-none text-paper/10 select-none"
          aria-hidden
        >
          {c.abbr}
        </div>
        <Container className="relative pt-14 pb-24 sm:pt-20 sm:pb-32">
          <Link href="/councils" className="text-sm font-medium text-paper/70 hover:text-paper">
            ← All councils
          </Link>
          <p className="mt-10 font-medium text-paper/70">
            Council {String(i + 1).padStart(2, "0")} · {c.level}
          </p>
          <h1 className="display mt-3 text-[clamp(3.4rem,10vw,9rem)]">{c.name}</h1>
          <p className="mt-6 max-w-xl text-xl text-paper/85">{c.blurb}</p>
        </Container>
      </section>
      <div className="perforated -mt-2" style={{ background: c.color }} />

      <Container className="grid gap-16 py-20 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <Clause n="1">Agenda</Clause>
          {c.agenda.length ? (
            <ol className="mt-8 space-y-6">
              {c.agenda.map((a, k) => (
                <li key={a} className="grid grid-cols-[3rem_1fr] gap-4 border-b-2 hairline pb-6">
                  <span className="display text-4xl italic" style={{ color: c.color }}>
                    {String.fromCharCode(65 + k)}.
                  </span>
                  <span className="display text-3xl sm:text-4xl">{a}</span>
                </li>
              ))}
            </ol>
          ) : (
            <div className="mt-8 rounded-2xl border-2 border-dashed hairline p-10">
              <span className="stamp text-seal">Under embargo</span>
              <p className="display mt-6 text-4xl sm:text-5xl">Topics will be released with the study guide.</p>
              <p className="mt-4 text-lg text-ink-2">Follow us on Instagram to hear first.</p>
            </div>
          )}

          <div className="mt-16">
            <Clause n="2">Study guide</Clause>
            {c.guideUrl ? (
              <a
                href={c.guideUrl}
                className="mt-6 inline-flex h-12 items-center rounded-full bg-ink px-6 font-semibold text-paper hover:bg-seal"
              >
                Download the study guide (PDF)
              </a>
            ) : (
              <p className="mt-6 text-lg text-ink-2">Not yet published.</p>
            )}
          </div>
        </div>

        <aside>
          <Clause n="3">Your chairs</Clause>
          <div className="mt-8 space-y-4">
            {(c.chairs.length ? c.chairs : [{ name: "To be announced", role: "Chair" }, { name: "To be announced", role: "Co-chair" }]).map(
              (ch, k) => (
                <div key={k} className="flex items-center gap-4 rounded-2xl bg-paper-2/70 p-4">
                  <div className="display grid h-14 w-14 place-items-center rounded-full text-2xl text-paper" style={{ background: c.color }}>
                    {ch.name === "To be announced" ? "?" : ch.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{ch.name}</p>
                    <p className="text-sm text-ink-2">{ch.role}</p>
                  </div>
                </div>
              ),
            )}
          </div>
          <RegisterButton className="mt-10" />
        </aside>
      </Container>

      <Container>
        <div className="grid gap-4 border-t-2 hairline pt-8 sm:grid-cols-2">
          <Link href={`/councils/${prev.slug}`} className="group">
            <p className="text-sm text-ink-3">Previous council</p>
            <p className="display text-4xl transition-colors group-hover:text-seal">← {prev.abbr}</p>
          </Link>
          <Link href={`/councils/${next.slug}`} className="group sm:text-right">
            <p className="text-sm text-ink-3">Next council</p>
            <p className="display text-4xl transition-colors group-hover:text-seal">{next.abbr} →</p>
          </Link>
        </div>
      </Container>
    </>
  );
}
