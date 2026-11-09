"use client";

import { useState } from "react";

/**
 * Type a country, get your placard. A small CSS-3D folded card that tilts
 * with the pointer. Purely for fun on the landing page.
 */
export function PlacardMaker() {
  const [country, setCountry] = useState("");
  const [tilt, setTilt] = useState({ x: -8, y: 14 });
  const [raised, setRaised] = useState(false);
  const label = country.trim() || "Your Country";

  return (
    <div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
      <div>
        <label htmlFor="country" className="mb-3 block text-sm font-medium text-ink-3">
          Which delegation are you hoping for?
        </label>
        <input
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value.slice(0, 28))}
          placeholder="Republic of Korea"
          className="display w-full border-b-2 border-ink/20 bg-transparent pb-2 text-4xl outline-none placeholder:text-ink/25 focus:border-seal sm:text-5xl"
          autoComplete="off"
        />
        <button
          onClick={() => {
            setRaised(true);
            window.setTimeout(() => setRaised(false), 1100);
          }}
          className="mt-6 inline-flex h-11 items-center rounded-full border-2 border-ink/15 px-5 font-semibold transition-colors hover:border-ink"
        >
          Raise placard
        </button>
        <p className="mt-4 max-w-sm text-ink-2">
          Raising your placard is how you ask to speak. You will do it a lot.
        </p>
      </div>

      <div
        className="relative grid h-72 place-items-center [perspective:900px] sm:h-80"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          setTilt({ x: -8 - py * 16, y: px * 40 });
        }}
        onPointerLeave={() => setTilt({ x: -8, y: 14 })}
      >
        <div
          className="relative transition-transform duration-500 ease-out-soft [transform-style:preserve-3d]"
          style={{
            transform: `translateY(${raised ? -70 : 0}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotateZ(${raised ? -6 : 0}deg)`,
          }}
        >
          {/* the card */}
          <div className="relative flex h-32 w-[min(78vw,420px)] flex-col items-center justify-center overflow-hidden rounded-[3px] bg-[#fbf8f1] shadow-[0_30px_40px_-25px_rgb(27_26_23/.55)] sm:h-36">
            <span className="absolute inset-x-0 top-0 h-2 bg-seal" />
            <span className="display px-6 text-center text-[clamp(2rem,6vw,3.4rem)] leading-none">{label}</span>
            <span className="mt-2 text-xs font-medium text-ink-3">NMMILE 2026</span>
          </div>
          {/* folded foot the card stands on */}
          <div
            className="absolute inset-x-0 top-full h-8 origin-top rounded-b-[3px] bg-gradient-to-b from-[#d9cfb8] to-[#ece4d2]"
            style={{ transform: "rotateX(-80deg)" }}
          />
        </div>
        <div className="absolute bottom-6 h-3 w-64 rounded-[50%] bg-ink/15 blur-md" />
      </div>
    </div>
  );
}
