"use client";

import { useSyncExternalStore } from "react";

// a clock that ticks once a minute; null on the server so markup matches on hydration
const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 30_000);
  return () => window.clearInterval(id);
};
const getNow = () => Math.floor(Date.now() / 60_000) * 60_000;
const getServerNow = () => null;

export function Countdown({ to }: { to: string | null }) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);

  if (!to) return <span>Dates announced soon</span>;
  const target = new Date(to);
  const date = target.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  if (now === null || target.getTime() < now) return <span>{date}</span>;

  const s = Math.floor((target.getTime() - now) / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  return (
    <span>
      {date}. Gavel in {d}d {h}h {m}m
    </span>
  );
}
