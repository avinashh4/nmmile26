import type { Metadata } from "next";
import { formatDates } from "@/lib/dates";
import { Container, PageHead } from "@/components/ui";
import { registrationOpen, site } from "@/content/site";
import { registerLink, roles } from "@/lib/registration";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  const when = site.startsAt ? `${formatDates(site.startsAt, site.endsAt)} at ${site.venue}.` : "";
  return (
    <>
      <PageHead
        clause="Register"
        title={
          registrationOpen ? (
            <>
              Take your <span className="text-laurel">seat.</span>
            </>
          ) : (
            <>
              Applications <span className="text-laurel">open soon.</span>
            </>
          )
        }
        lede={
          registrationOpen
            ? `${when} Pick the role you want to apply for. Forms take about five minutes.`
            : `${when} Tell us which role you are interested in and we will email you the moment applications open.`
        }
      />
      <Container className="grid gap-5 sm:grid-cols-2">
        {roles.map((r, i) => {
          const link = registerLink(r.key);
          return (
            <a
              key={r.key}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel="noreferrer"
              className="reveal group relative overflow-hidden rounded-3xl border-2 hairline p-8 transition-colors hover:border-ink sm:p-10"
            >
              <p className="display text-6xl text-laurel">{String(i + 1).padStart(2, "0")}</p>
              <p className="display mt-6 text-5xl">{r.title}</p>
              <p className="mt-3 max-w-sm text-lg text-ink-2">{r.body}</p>
              <p className="mt-8 inline-flex items-center gap-2 font-semibold">
                <span className={link.open ? "rounded-full bg-laurel px-4 py-2 text-paper" : ""}>
                  {link.open ? "Register now" : "Notify me"}
                </span>
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </p>
            </a>
          );
        })}
      </Container>
    </>
  );
}
