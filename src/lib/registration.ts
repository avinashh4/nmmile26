import { site } from "@/content/site";

export type Role = keyof typeof site.registration;

export const roles: { key: Role; title: string; body: string }[] = [
  { key: "delegate", title: "Delegate", body: "Represent a company in one of the councils." },
  { key: "chair", title: "Chair", body: "Run a council. Prior conference experience required." },
  { key: "press", title: "VERITAS", body: "Join the press team: report, photograph and publish the daily bulletin." },
  { key: "volunteer", title: "Volunteer", body: "Logistics, admin and keeping the day on time." },
];

/** Where a role's register button should go: its form if linked, otherwise a pre-filled email. */
export function registerLink(role: Role) {
  const url = site.registration[role];
  if (url) return { href: url, external: true, open: true };
  const title = roles.find((r) => r.key === role)?.title ?? role;
  return {
    href: `mailto:${site.email}?subject=${encodeURIComponent(`${site.shortName} ${site.year}: ${title} interest`)}`,
    external: false,
    open: false,
  };
}
