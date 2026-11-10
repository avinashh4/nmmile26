import type { Metadata } from "next";
import { Container, PageHead } from "@/components/ui";
import { schedule } from "@/content/site";

export const metadata: Metadata = { title: "Schedule" };

export default function SchedulePage() {
  return (
    <>
      <PageHead
        clause="Schedule"
        title={
          <>
            Order <span className="text-laurel">of the day.</span>
          </>
        }
        lede="Provisional timings. The final programme is emailed to every delegate the week before the conference."
      />
      <Container className="grid gap-16 lg:grid-cols-2">
        {schedule.map((d, di) => (
          <div key={d.day} className="reveal">
            <div className="flex items-baseline gap-4 border-b-2 hairline pb-4">
              <span className="display text-7xl text-laurel">{String(di + 1).padStart(2, "0")}</span>
              <span className="display text-5xl">{d.day}</span>
            </div>
            <ol className="relative mt-6 ml-3 border-l-2 border-dashed border-ink/20">
              {d.items.map((it) => (
                <li key={it.time} className="relative py-5 pl-8">
                  <span className="absolute top-7 -left-[7px] h-3 w-3 rounded-full bg-laurel ring-4 ring-paper" />
                  <p className="text-sm font-semibold tabular-nums text-ink-3">{it.time}</p>
                  <p className="display mt-1 text-3xl">{it.what}</p>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </Container>
    </>
  );
}
