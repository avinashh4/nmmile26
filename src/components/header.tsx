"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Seal } from "./seal";
import { RegisterButton } from "./register-button";

export function Header() {
  const pathname = usePathname();
  // the menu remembers which page it was opened on, so navigating closes it
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (fn: (o: boolean) => boolean) => setOpenOn(fn(open) ? pathname : null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    const raf = requestAnimationFrame(on);
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-paper/90 shadow-[0_1px_0_var(--rule)] backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.shortName} home`}>
          <Seal size={34} className="transition-transform duration-500 group-hover:rotate-[24deg]" />
          <span className="display text-[1.7rem] leading-none">
            {site.shortName}
            <span className="text-seal italic">{site.edition}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative rounded-full px-3.5 py-1.5 text-[0.95rem] font-medium transition-colors ${
                  active ? "text-ink" : "text-ink-2 hover:text-ink"
                }`}
              >
                {n.label}
                {active && (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-seal" />
                )}
              </Link>
            );
          })}
          <RegisterButton className="ml-3" size="sm" />
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink/15 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Menu"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 h-[2px] w-4 bg-ink transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-[2px] w-4 bg-ink transition-transform ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav className="border-t-2 hairline px-4 pt-2 pb-6 md:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="display block border-b hairline py-3 text-4xl"
            >
              {n.label}
            </Link>
          ))}
          <RegisterButton className="mt-5 w-full justify-center" />
        </nav>
      )}
    </header>
  );
}
