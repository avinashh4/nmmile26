"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to the number inside `value` the first time it scrolls into view.
 * Keeps any prefix/suffix and zero padding, so "200+" and "02" both work.
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const m = value.match(/^(\D*)(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, pre, num, post] = m;
    const target = parseInt(num, 10);
    const pad = num.length;
    const fmt = (n: number) => `${pre}${String(n).padStart(pad, "0")}${post}`;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - k, 4);
          setShown(fmt(Math.round(target * eased)));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        setShown(fmt(0));
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // value is static per render; m derives from it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {shown}
    </span>
  );
}
