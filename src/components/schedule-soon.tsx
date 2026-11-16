/** Shown in place of the programme until `schedule` in src/content/site.ts is filled in. */
export function ScheduleSoon({ card = "bg-paper", notch = "bg-ink" }: { card?: string; notch?: string }) {
  return (
    <div className={`relative mx-auto max-w-3xl rounded-2xl ${card} p-8 text-center text-ink sm:p-14`}>
      <span className="stamp text-laurel">To be announced</span>
      <p className="display mt-8 text-[clamp(3rem,8vw,6rem)]">
        Schedule <span className="text-laurel">coming soon.</span>
      </p>
      <div className="mx-auto mt-8 max-w-md border-t-2 border-dashed hairline pt-6">
        <p className="text-lg leading-relaxed text-ink-2">
          The full order of the day will be published here once the dates are confirmed.
        </p>
      </div>
      {/* ticket notches */}
      <span className={`absolute top-1/2 -left-3 h-6 w-6 -translate-y-1/2 rounded-full ${notch}`} />
      <span className={`absolute top-1/2 -right-3 h-6 w-6 -translate-y-1/2 rounded-full ${notch}`} />
    </div>
  );
}
