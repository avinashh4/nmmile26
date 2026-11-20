"use client";

import { useSyncExternalStore } from "react";
import { formatDates } from "@/lib/dates";

// a clock that ticks once a minute; null on the server so markup matches on hydration
const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 30_000);
  return () => window.clearInterval(id);
};
const getNow = () => Math.floor(Date.now() / 60_000) * 60_000;
const getServerNow = () => null;

export function Countdown({ from, to }: { from: string | null; to?: string | null }) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);

  if (!from) return <span>Dates announced soon</span>;
  const dates = formatDates(from, to);
  const start = new Date(from).getTime();
  const end = to ? new Date(to).getTime() : start;
  if (now === null) return <span>{dates}</span>;
  if (now >= start && now <= end) return <span>{dates}. In session now.</span>;
  if (now > end) return <span>{dates}</span>;

  const s = Math.floor((start - now) / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  return (
    <span>
      {dates}. Gavel in {d}d {h}h {m}m
    </span>
  );
}
