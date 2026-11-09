import Link from "next/link";
import { nav, site } from "@/content/site";
import { Seal } from "./seal";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="perforated rotate-180 bg-ink" />
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 pt-16 pb-10 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-[clamp(3.5rem,9vw,7.5rem)]">
            See you on
            <br />
            <span className="text-brass italic">the floor.</span>
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-paper/50">Pages</p>
          <ul className="space-y-2">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/register", label: "Register" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-lg text-paper/85 transition-colors hover:text-brass">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-paper/50">Reach the secretariat</p>
          <a href={`mailto:${site.email}`} className="block text-lg text-paper/85 hover:text-brass">
            {site.email}
          </a>
          <a href={site.instagram} target="_blank" rel="noreferrer" className="mt-2 block text-lg text-paper/85 hover:text-brass">
            Instagram
          </a>
          <p className="mt-6 text-paper/60">{site.venue}</p>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 border-t border-paper/10 px-4 py-6 text-sm text-paper/50 sm:px-8">
        <div className="flex items-center gap-3">
          <Seal size={26} />
          <span>
            {site.shortName} {site.year}. Hosted by {site.host}.
          </span>
        </div>
        <span>Made by the {site.shortName} IT team.</span>
      </div>
    </footer>
  );
}
