import type { Metadata } from "next";
import { Container, PageHead } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Register" };

const roles = [
  { title: "Delegate", body: "Represent a member state in one of the councils.", key: "delegate" },
  { title: "Chair", body: "Run a committee. Prior MUN experience required.", key: "chair" },
  { title: "Press", body: "Report, photograph and publish the daily bulletin.", key: "press" },
  { title: "Volunteer", body: "Logistics, admin and keeping the day on time.", key: "volunteer" },
];

export default function RegisterPage() {
  const open = site.registrationOpen && site.registerUrl;
  return (
    <>
      <PageHead
        clause="Register"
        title={
          open ? (
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
          open
            ? "Pick the role you want to apply for. Forms take about five minutes."
            : "Tell us which role you are interested in and we will email you the moment applications open."
        }
      />
      <Container className="grid gap-5 sm:grid-cols-2">
        {roles.map((r, i) => {
          const href = open
            ? `${site.registerUrl}`
            : `mailto:${site.email}?subject=${encodeURIComponent(`${site.shortName} ${site.year}: ${r.title} interest`)}`;
          return (
            <a
              key={r.key}
              href={href}
              target={open ? "_blank" : undefined}
              rel="noreferrer"
              className="reveal group relative overflow-hidden rounded-3xl border-2 hairline p-8 transition-colors hover:border-ink sm:p-10"
            >
              <p className="display text-6xl text-laurel">{String(i + 1).padStart(2, "0")}</p>
              <p className="display mt-6 text-5xl">{r.title}</p>
              <p className="mt-3 max-w-sm text-lg text-ink-2">{r.body}</p>
              <p className="mt-8 font-semibold">
                {open ? "Apply" : "Notify me"}
                <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">→</span>
              </p>
            </a>
          );
        })}
      </Container>
    </>
  );
}
