"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Council } from "@/content/councils";
import Scene from "./scene";

// Only rendered client side (see hall-mount.tsx), so reading `window` during init is safe.
function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function Hall({
  councils,
  title,
  ringText,
}: {
  councils: Council[];
  title: string;
  ringText: string;
}) {
  const router = useRouter();
  const wrap = useRef<HTMLDivElement>(null);
  const enterRef = useRef<(() => void) | null>(null);
  const [gl] = useState(hasWebGL);
  const [touch] = useState(() => window.matchMedia("(pointer: coarse)").matches);
  const [lowPower] = useState(
    () => touch || (navigator.hardwareConcurrency ?? 8) <= 4 || window.innerWidth < 720,
  );
  const [fontsReady, setFontsReady] = useState(false);
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(true);
  const [near, setNear] = useState<Council | null>(null);
  const [moved, setMoved] = useState(false);
  const state = !gl ? "nogl" : fontsReady ? "ok" : "boot";

  useEffect(() => {
    // wait for webfonts so canvas-drawn banners use the right typefaces
    let live = true;
    const go = () => live && setFontsReady(true);
    const t = window.setTimeout(go, 2500); // never block on a slow font
    document.fonts.ready.then(go, go);
    return () => {
      live = false;
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.02 });
    io.observe(el);
    const vis = () => setRunning(document.visibilityState === "visible" && isOnScreen(el));
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  const onEnter = useCallback((c: Council) => router.push(`/councils/${c.slug}`), [router]);
  useEffect(() => {
    for (const c of councils) router.prefetch(`/councils/${c.slug}`);
  }, [councils, router]);

  return (
    <div ref={wrap} className="absolute inset-0">
      {state === "ok" && (
        <div className={`absolute inset-0 transition-opacity duration-[1400ms] ${ready ? "opacity-100" : "opacity-0"}`}>
          <Scene
            councils={councils}
            title={title}
            ringText={ringText}
            running={running}
            lowPower={lowPower}
            onNear={setNear}
            onReady={() => setReady(true)}
            onFirstMove={() => setMoved(true)}
            enterRef={enterRef}
            onEnter={onEnter}
          />
        </div>
      )}

      {state === "nogl" && <StaticFallback councils={councils} />}

      {/* controls hint */}
      {state === "ok" && (
        <div
          className={`pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-700 ${
            moved || near ? "translate-y-4 opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex w-max max-w-[92vw] items-center gap-3 rounded-full bg-paper/85 px-4 py-2.5 text-sm font-medium text-ink-2 shadow-[0_1px_0_var(--rule),0_10px_30px_-12px_rgb(27_26_23/.35)] backdrop-blur">
            {touch || window.innerWidth < 640 ? (
              <span>Tap the floor to walk. Tap a banner to enter.</span>
            ) : (
              <>
                <span className="flex gap-1">
                  {["W", "A", "S", "D"].map((k) => (
                    <kbd key={k} className="grid h-6 w-6 place-items-center rounded-md border-2 border-ink/15 bg-paper text-xs text-ink">
                      {k}
                    </kbd>
                  ))}
                </span>
                <span>or click the floor to walk. Space to wave.</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* council prompt */}
      <div
        className={`absolute bottom-6 left-1/2 w-[min(92vw,420px)] -translate-x-1/2 transition-all duration-500 ease-out-soft ${
          near ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
        aria-live="polite"
      >
        {near && (
          <div className="relative overflow-hidden rounded-2xl bg-paper shadow-[0_1px_0_var(--rule),0_24px_50px_-20px_rgb(27_26_23/.5)]">
            <div className="h-1.5" style={{ background: near.color }} />
            <div className="flex items-center gap-4 p-4">
              <div
                className="display grid h-14 w-14 shrink-0 place-items-center rounded-xl text-2xl text-paper"
                style={{ background: near.color }}
              >
                {near.abbr.slice(0, 4)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-ink-3">You have reached</p>
                <p className="truncate text-lg leading-tight font-semibold">{near.name}</p>
              </div>
              <Link
                href={`/councils/${near.slug}`}
                className="shrink-0 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-seal"
              >
                Enter{!touch && <span className="ml-1.5 text-paper/50">E</span>}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function isOnScreen(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
}

function StaticFallback({ councils }: { councils: Council[] }) {
  return (
    <div className="absolute inset-0 flex items-end justify-center overflow-hidden pb-24">
      <div className="flex flex-wrap justify-center gap-3 px-6">
        {councils.map((c, i) => (
          <Link
            key={c.slug}
            href={`/councils/${c.slug}`}
            className="display grid h-36 w-20 place-items-center text-2xl text-paper transition-transform hover:-translate-y-2"
            style={{
              background: c.color,
              clipPath: "polygon(0 0,100% 0,100% 100%,50% 88%,0 100%)",
              transform: `rotate(${(i % 2 ? 1 : -1) * 2}deg)`,
            }}
          >
            {c.abbr}
          </Link>
        ))}
      </div>
    </div>
  );
}
