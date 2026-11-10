import Link from "next/link";
import { HallMount as Hall } from "@/components/hall/hall-mount";
import { CouncilCard } from "@/components/council-card";
import { Countdown } from "@/components/countdown";
import { PlacardMaker } from "@/components/placard-maker";
import { RegisterButton } from "@/components/register-button";
import { Clause, Container } from "@/components/ui";
import { councils } from "@/content/councils";
import { faqs, reasons, schedule, site, stats } from "@/content/site";

export default function Home() {
  return (
    <>
      {/* ─── Hero: the walkable assembly floor ─── */}
      <section className="relative -mt-16 h-[100svh] min-h-[640px] overflow-hidden">
        <Hall
          councils={councils}
          title={`${site.shortName} ${site.edition}`}
          ringText={`${site.fullName.toUpperCase()}  ·  ${site.host.toUpperCase()}`}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[52%] bg-gradient-to-b sm:h-56 from-paper via-paper/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[62%] bg-gradient-to-r from-paper via-paper/75 to-transparent lg:block" />
        <Container className="pointer-events-none relative pt-24 sm:pt-28">
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-ink-2">
            <span className="stamp text-laurel">Bahrain {site.year}</span>
            <span>Model United Nations at {site.host.split(",")[0]}</span>
          </div>
          <h1 className="display mt-4 text-[clamp(4.5rem,15vw,13rem)] leading-[0.82]">
            {site.shortName}
            <span className="text-laurel">{site.edition}</span>
          </h1>
          <p className="mt-3 max-w-md text-lg leading-snug text-ink-2 sm:text-xl">
            <span className="display text-2xl text-ink sm:text-3xl">{site.theme.title}.</span>
            <br />
            <Countdown to={site.startsAt} />
          </p>
        </Container>
        <div className="absolute right-4 bottom-6 hidden text-right text-sm text-ink-2 sm:right-8 lg:block">
          <p className="font-medium text-ink">Walk the floor.</p>
          <p>Every banner is a council.</p>
        </div>
      </section>

      {/* ─── Ticker ─── */}
      <div className="overflow-hidden border-y-2 hairline bg-paper-2/60 py-3" aria-hidden>
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-10">
              {[...councils, ...councils].map((c, i) => (
                <span key={`${k}-${i}`} className="display flex items-center gap-10 text-3xl">
                  <span>{c.abbr}</span>
                  <span className="inline-block h-2.5 w-2.5 rotate-45" style={{ background: c.color }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Theme ─── */}
      <section className="py-28 sm:py-36">
        <Container className="grid gap-12 lg:grid-cols-[0.35fr_1fr]">
          <div className="reveal">
            <Clause n="1">This year&apos;s theme</Clause>
          </div>
          <div className="reveal">
            <p className="display text-[clamp(2.4rem,5.4vw,5rem)] leading-[1.02]">
              The world&apos;s problems are argued at summits.{" "}
              <span className="text-laurel">They are solved on the street.</span>
            </p>
            <p className="mt-10 max-w-2xl text-xl leading-relaxed text-ink-2">{site.theme.lede}</p>
            <div className="mt-16 grid grid-cols-2 gap-y-10 border-t-2 hairline pt-10 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="display text-6xl sm:text-7xl">{s.value}</p>
                  <p className="mt-1 font-medium text-ink-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Councils ─── */}
      <section className="bg-paper-2/50 py-28 sm:py-36">
        <Container>
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <Clause n="2">The councils</Clause>
              <h2 className="display mt-5 text-[clamp(3rem,7vw,6.5rem)]">
                {councils.length} rooms.
                <br />
                <span className="text-laurel">Pick your side.</span>
              </h2>
            </div>
            <Link href="/councils" className="font-semibold underline decoration-laurel decoration-2 underline-offset-[6px]">
              Compare all councils
            </Link>
          </div>
          <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {councils.map((c, i) => (
              <div key={c.slug} className="reveal">
                <CouncilCard council={c} index={i} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Why ─── */}
      <section className="py-28 sm:py-36">
        <Container>
          <div className="reveal">
            <Clause n="3">Why delegates come back</Clause>
          </div>
          <div className="mt-12 grid border-t-2 hairline md:grid-cols-2">
            {reasons.map((r, i) => (
              <div
                key={r.n}
                className={`reveal group grid grid-cols-[4rem_1fr] gap-4 border-b-2 hairline py-10 md:py-14 ${
                  i % 2 === 0 ? "md:border-r-2 md:pr-10" : "md:pl-10"
                }`}
              >
                <span className="display text-4xl text-laurel transition-transform duration-500 group-hover:-rotate-6">
                  {r.n}
                </span>
                <div>
                  <h3 className="display text-4xl sm:text-5xl">{r.title}</h3>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-2">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Schedule preview ─── */}
      <section className="bg-ink py-28 text-paper sm:py-36">
        <Container>
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-3 text-[0.95rem] font-medium text-paper/60">
                <span className="display text-xl text-gold">4.</span>
                <span className="h-px w-8 bg-paper/25" />
                <span>Order of the day</span>
              </p>
              <h2 className="display mt-5 text-[clamp(3rem,7vw,6.5rem)]">
                Two days,
                <br />
                <span className="text-gold">one gavel.</span>
              </h2>
            </div>
            <Link href="/schedule" className="font-semibold text-paper underline decoration-gold decoration-2 underline-offset-[6px]">
              Full schedule
            </Link>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {schedule.map((d, di) => (
              <div key={d.day} className="reveal relative rounded-2xl bg-paper p-7 text-ink sm:p-9">
                <div className="flex items-baseline justify-between border-b-2 border-dashed hairline pb-5">
                  <p className="display text-4xl">{d.day}</p>
                  <p className="display text-5xl text-laurel">{String(di + 1).padStart(2, "0")}</p>
                </div>
                <ul className="mt-4">
                  {d.items.map((it) => (
                    <li key={it.time} className="grid grid-cols-[5rem_1fr] border-b hairline py-3 last:border-0">
                      <span className="font-semibold tabular-nums text-ink-3">{it.time}</span>
                      <span className="font-medium">{it.what}</span>
                    </li>
                  ))}
                </ul>
                {/* ticket notches */}
                <span className="absolute top-[6.2rem] -left-3 h-6 w-6 rounded-full bg-ink" />
                <span className="absolute top-[6.2rem] -right-3 h-6 w-6 rounded-full bg-ink" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Placard ─── */}
      <section className="py-28 sm:py-36">
        <Container>
          <div className="reveal mb-14">
            <Clause n="5">Try it on</Clause>
            <h2 className="display mt-5 text-[clamp(3rem,7vw,6.5rem)]">
              Your placard <span className="text-laurel">is waiting.</span>
            </h2>
          </div>
          <div className="reveal">
            <PlacardMaker />
          </div>
        </Container>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-paper-2/50 py-28 sm:py-36">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal">
            <Clause n="6">Points of information</Clause>
            <h2 className="display mt-5 text-[clamp(3rem,6vw,5.5rem)]">
              Questions, <span className="text-laurel">answered.</span>
            </h2>
            <p className="mt-6 max-w-sm text-lg text-ink-2">
              Something missing? Write to{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-ink underline decoration-laurel decoration-2 underline-offset-4">
                {site.email}
              </a>
              .
            </p>
          </div>
          <div className="reveal border-t-2 hairline">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b-2 hairline">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink/15 transition-transform duration-300 group-open:rotate-45 group-open:border-laurel group-open:bg-laurel group-open:text-paper">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 text-lg leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 sm:py-40">
        <Container className="reveal text-center">
          <p className="display text-[clamp(3.4rem,11vw,10rem)]">
            The floor <span className="text-laurel">recognises</span> you.
          </p>
          <p className="mx-auto mt-6 max-w-lg text-xl text-ink-2">
            Applications for delegates, chairs and press open soon. Leave your details and we will write when they do.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <RegisterButton size="lg" />
            <Link
              href="/contact"
              className="inline-flex h-14 items-center rounded-full border-2 border-ink/15 px-7 text-lg font-semibold transition-colors hover:border-ink"
            >
              Contact the secretariat
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
