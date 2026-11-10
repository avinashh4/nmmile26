import type { CSSProperties, ReactNode } from "react";

const idx = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

/** Splits a line into words that rise in one by one as it scrolls into view. */
export function Words({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={`words ${className}`}>
      {words.map((w, i) => (
        <span key={i} style={idx(i)}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

/** Letters that drop in on page load (used for the hero headline). */
export function Letters({ text, offset = 0, className = "" }: { text: string; offset?: number; className?: string }) {
  return (
    <span className={`letters ${className}`} aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} style={idx(i + offset)} aria-hidden>
          {ch}
        </span>
      ))}
    </span>
  );
}

/** Staggered scroll reveal for a list item. */
export function Reveal({ i = 0, className = "", children }: { i?: number; className?: string; children: ReactNode }) {
  return (
    <div className={`reveal ${className}`} style={idx(i)}>
      {children}
    </div>
  );
}
