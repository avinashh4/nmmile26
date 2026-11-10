"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Reason = { n: string; title: string; body: string; photo: string; alt: string };

/**
 * Desktop: the photo column stays pinned while the reasons scroll past,
 * crossfading to the photo for whichever reason is in the middle of the screen.
 * Mobile: each reason simply carries its own photo.
 */
export function ReasonsScroller({ reasons }: { reasons: Reason[] }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
      {/* pinned photo stack */}
      <div className="hidden lg:block">
        <div className="sticky top-24 aspect-[4/5] overflow-hidden rounded-[20px] bg-paper-3">
          {reasons.map((r, i) => (
            <Image
              key={r.photo}
              src={r.photo}
              alt={r.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 0px"
              className={`object-cover transition-[opacity,transform,filter] duration-[1100ms] ease-out-soft ${
                i === active ? "scale-100 opacity-100 blur-0" : "scale-110 opacity-0 blur-sm"
              }`}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/60 to-transparent" />
          <div className="absolute bottom-5 left-6 flex items-end gap-4 text-paper">
            <span key={active} className="display fade-up text-7xl leading-none text-gold">
              {reasons[active].n}
            </span>
            <span className="pb-2 text-sm font-medium text-paper/80">NMMUN 2023</span>
          </div>
          {/* progress ticks */}
          <div className="absolute top-5 right-5 flex gap-1.5">
            {reasons.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full bg-paper transition-all duration-500 ${i === active ? "w-8 opacity-100" : "w-3 opacity-50"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* reasons */}
      <div>
        {reasons.map((r, i) => (
          <div
            key={r.n}
            ref={(el) => {
              items.current[i] = el;
            }}
            data-idx={i}
            className="flex flex-col justify-center border-t-2 hairline py-12 lg:min-h-[78vh] lg:py-0"
          >
            <div className="relative mb-8 aspect-[3/2] overflow-hidden rounded-2xl lg:hidden">
              <Image src={r.photo} alt={r.alt} fill sizes="100vw" className="object-cover" />
            </div>
            <span
              className={`display text-5xl transition-colors duration-500 ${i === active ? "text-laurel" : "text-ink/20"}`}
            >
              {r.n}
            </span>
            <h3
              className={`display mt-4 text-[clamp(2.6rem,4.6vw,4.4rem)] transition-[opacity,transform] duration-700 ease-out-soft ${
                i === active ? "lg:opacity-100" : "lg:opacity-30"
              }`}
            >
              {r.title}
            </h3>
            <p className="mt-5 max-w-md text-xl leading-relaxed text-ink-2">{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
