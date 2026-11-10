import Image from "next/image";
import Link from "next/link";
import { HallMount as Hall } from "@/components/hall/hall-mount";
import { CouncilCard } from "@/components/council-card";
import { Countdown } from "@/components/countdown";
import { CountUp } from "@/components/count-up";
import { Letters, Reveal, Words } from "@/components/motion";
import { PlacardMaker } from "@/components/placard-maker";
import { ReasonsScroller } from "@/components/reasons-scroller";
import { RegisterButton } from "@/components/register-button";
import { Clause, Container } from "@/components/ui";
import { councils } from "@/content/councils";
import { faqs, photos, reasons, schedule, site, stats } from "@/content/site";

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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[52%] bg-gradient-to-b from-paper via-paper/70 to-transparent sm:h-56" />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[62%] bg-gradient-to-r from-paper via-paper/75 to-transparent lg:block" />
        <Container className="pointer-events-none relative pt-24 sm:pt-28">
          <div className="fade-up flex flex-wrap items-center gap-3 text-sm font-medium text-ink-2" style={{ ["--d" as string]: "0.1s" }}>
            <span className="stamp text-laurel">Bahrain {site.year}</span>
            <span>Model United Nations at {site.host.split(",")[0]}</span>
          </div>
          <h1 className="display mt-4 text-[clamp(4.5rem,15vw,13rem)] leading-[0.82]">
            <Letters text={site.shortName} />
            <Letters text={site.edition} offset={site.shortName.length + 1} className="text-laurel" />
          </h1>
          <p className="fade-up mt-3 max-w-md text-lg leading-snug text-ink-2 sm:text-xl" style={{ ["--d" as string]: "1s" }}>
            <span className="display text-2xl text-ink sm:text-3xl">{site.theme.title}.</span>
            <br />
            <Countdown to={site.startsAt} />
          </p>
        </Container>
        <div className="fade-up absolute right-4 bottom-6 hidden text-right text-sm text-ink-2 sm:right-8 lg:block" style={{ ["--d" as string]: "1.6s" }}>
          <p className="font-medium text-ink">Walk the floor.</p>
          <p>Every banner is a council.</p>
        </div>
        {/* scroll cue */}
        <div className="fade-up pointer-events-none absolute bottom-6 left-4 hidden items-center gap-3 text-sm font-medium text-ink-2 sm:left-8 lg:flex" style={{ ["--d" as string]: "1.8s" }}>
          <span className="relative block h-9 w-5 rounded-full border-2 border-ink/30">
            <span className="absolute top-1.5 left-1/2 h-2 w-[3px] -translate-x-1/2 animate-bounce rounded-full bg-laurel" />
          </span>
          Scroll for the brief
        </div>
      </section>

      {/* ─── Theme ─── */}
      <section className="py-28 sm:py-36">
        <Container className="grid gap-12 lg:grid-cols-[0.35fr_1fr]">
          <Reveal>
            <Clause n="1">This year&apos;s theme</Clause>
          </Reveal>
          <div>
            <p className="display text-[clamp(2.6rem,5.8vw,5.4rem)] leading-[0.98]">
              <Words text="The world's problems are argued at summits." />{" "}
              <Words text="They are solved on the street." className="text-laurel" />
            </p>
            <Reveal>
              <p className="mt-10 max-w-2xl text-xl leading-relaxed text-ink-2">{site.theme.lede}</p>
            </Reveal>
          </div>
        </Container>

        {/* wide photo that opens up as it scrolls in */}
        <Container className="mt-20">
          <figure>
            <div className="photo-open relative aspect-[16/9] overflow-hidden rounded-[20px] bg-paper-3 sm:aspect-[21/9]">
              <Image src={photos.theme.src} alt={photos.theme.alt} fill sizes="(min-width: 1400px) 1340px, 100vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 flex justify-between text-sm text-ink-3">
              <span>{photos.theme.caption}</span>
              <span>New Millennium School, Bahrain</span>
            </figcaption>
          </figure>
        </Container>

        <Container>
          <div className="mt-16 grid grid-cols-2 gap-y-10 border-t-2 hairline pt-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} i={i}>
                <CountUp value={s.value} className="display block text-7xl sm:text-8xl" />
                <p className="mt-1 font-medium text-ink-2">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Councils ─── */}
      <section className="bg-paper-2/50 py-28 sm:py-36">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <Clause n="2">The councils</Clause>
              </Reveal>
              <h2 className="display mt-5 text-[clamp(3rem,7vw,6.5rem)]">
                <Words text={`${councils.length} rooms.`} />
                <br />
                <Words text="Pick your side." className="text-laurel" />
              </h2>
            </div>
            <Reveal>
              <Link href="/councils" className="font-semibold underline decoration-laurel decoration-2 underline-offset-[6px]">
                Compare all councils
              </Link>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {councils.map((c, i) => (
              <Reveal key={c.slug} i={i % 4}>
                <CouncilCard council={c} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Why ─── */}
      <section className="py-28 sm:py-36">
        <Container>
          <Reveal>
            <Clause n="3">Why delegates come back</Clause>
          </Reveal>
          <h2 className="display mt-5 mb-12 text-[clamp(3rem,7vw,6.5rem)]">
            <Words text="Two days that" /> <Words text="change how you argue." className="text-laurel" />
          </h2>
          <ReasonsScroller reasons={reasons} />
        </Container>
      </section>

      {/* ─── In session: a filmstrip that slides sideways as you scroll down ─── */}
      <section className="strip-section relative h-[260vh] bg-ink text-paper" aria-label="Photos from NMMUN 2023">
        <div className="strip-sticky sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          <Container>
            <p className="flex items-center gap-3 text-[0.95rem] font-medium text-paper/60">
              <span className="display text-xl text-gold">4.</span>
              <span className="h-px w-8 bg-paper/25" />
              <span>In session</span>
            </p>
            <h2 className="display mt-5 text-[clamp(3rem,7vw,6.5rem)]">
              Last year, <span className="text-gold">on the floor.</span>
            </h2>
          </Container>
          <div className="strip-track mt-12 flex w-max gap-6 px-4 sm:px-8">
            {photos.inSession.map((p, i) => (
              <figure key={p.src} className="w-[78vw] shrink-0 snap-center sm:w-[46vw] lg:w-[34vw]">
                <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${i % 2 ? "lg:mt-16" : ""}`}>
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 34vw, 78vw" className="object-cover" />
                </div>
                <figcaption className="mt-3 flex items-baseline gap-3">
                  <span className="display text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-medium text-paper/80">{p.caption}</span>
                </figcaption>
              </figure>
            ))}
            <div className="flex w-[60vw] shrink-0 items-center sm:w-[34vw] lg:w-[26vw]">
              <p className="display text-[clamp(2.6rem,5vw,4.5rem)]">
                This year, <span className="text-gold">your turn.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Schedule preview ─── */}
      <section className="bg-ink pt-10 pb-28 text-paper sm:pb-36">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-3 text-[0.95rem] font-medium text-paper/60">
                <span className="display text-xl text-gold">5.</span>
                <span className="h-px w-8 bg-paper/25" />
                <span>Order of the day</span>
              </p>
              <h2 className="display mt-5 text-[clamp(3rem,7vw,6.5rem)]">
                <Words text="Two days," />
                <br />
                <Words text="one gavel." className="text-gold" />
              </h2>
            </div>
            <Link href="/schedule" className="font-semibold text-paper underline decoration-gold decoration-2 underline-offset-[6px]">
              Full schedule
            </Link>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {schedule.map((d, di) => (
              <div
                key={d.day}
                className={`${di % 2 ? "drift-right" : "drift-left"} relative rounded-2xl bg-paper p-7 text-ink sm:p-9`}
              >
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
          <div className="mb-14">
            <Reveal>
              <Clause n="6">Try it on</Clause>
            </Reveal>
            <h2 className="display mt-5 text-[clamp(3rem,7vw,6.5rem)]">
              <Words text="Your placard" /> <Words text="is waiting." className="text-laurel" />
            </h2>
          </div>
          <Reveal>
            <PlacardMaker />
          </Reveal>
        </Container>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-paper-2/50 py-28 sm:py-36">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal>
              <Clause n="7">Points of information</Clause>
            </Reveal>
            <h2 className="display mt-5 text-[clamp(3rem,6vw,5.5rem)]">
              <Words text="Questions," /> <Words text="answered." className="text-laurel" />
            </h2>
            <Reveal>
              <p className="mt-6 max-w-sm text-lg text-ink-2">
                Something missing? Write to{" "}
                <a href={`mailto:${site.email}`} className="font-semibold text-ink underline decoration-laurel decoration-2 underline-offset-4">
                  {site.email}
                </a>
                .
              </p>
            </Reveal>
          </div>
          <div className="border-t-2 hairline">
            {faqs.map((f, i) => (
              <Reveal key={f.q} i={i}>
                <details className="group border-b-2 hairline">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-medium transition-colors hover:text-laurel [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink/15 transition-[transform,background-color,border-color,color] duration-300 group-open:rotate-45 group-open:border-laurel group-open:bg-laurel group-open:text-paper">
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-7 text-lg leading-relaxed text-ink-2">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CTA over the closing ceremony ─── */}
      <section className="relative overflow-hidden py-36 text-paper sm:py-48">
        <Image src={photos.closing.src} alt={photos.closing.alt} fill sizes="100vw" className="settle object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink/90" />
        <Container className="relative text-center">
          <p className="display text-[clamp(3.4rem,11vw,10rem)]">
            <Words text="The floor" /> <Words text="recognises" className="text-gold" /> <Words text="you." />
          </p>
          <Reveal>
            <p className="mx-auto mt-6 max-w-lg text-xl text-paper/85">
              Applications for delegates, chairs and press open soon. Leave your details and we will write when they do.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <RegisterButton size="lg" />
              <Link
                href="/contact"
                className="inline-flex h-14 items-center rounded-full border-2 border-paper/30 px-7 text-lg font-semibold transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                Contact the secretariat
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
