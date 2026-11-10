import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1400px] px-4 sm:px-8 ${className}`}>{children}</div>;
}

/** Section label: a numbered clause marker, the way resolutions number their paragraphs. */
export function Clause({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[0.95rem] font-medium text-ink-2">
      <span className="display text-xl text-laurel">{n}.</span>
      <span className="h-px w-8 bg-ink/25" />
      <span>{children}</span>
    </p>
  );
}

export function PageHead({
  clause,
  title,
  lede,
}: {
  clause: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <Container className="pt-12 pb-14 sm:pt-20">
      <div className="fade-up">
        <Clause n="§">{clause}</Clause>
      </div>
      <h1 className="display fade-up mt-6 text-[clamp(3.4rem,10vw,9rem)]" style={{ ["--d" as string]: "0.12s" }}>
        {title}
      </h1>
      {lede && (
        <p className="fade-up mt-6 max-w-2xl text-xl leading-relaxed text-ink-2" style={{ ["--d" as string]: "0.3s" }}>
          {lede}
        </p>
      )}
    </Container>
  );
}
