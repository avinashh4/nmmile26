// Everything the organising team is likely to edit lives in /src/content.
// Change copy here; the pages pick it up automatically.

import { councils } from "./councils";

export const site = {
  shortName: "NMMILE",
  edition: "'26",
  year: 2026,
  // ILE: Initiative, Leadership and Excellence
  fullName: "New Millennium Model of Initiative, Leadership and Excellence",
  pillars: ["Initiative", "Leadership", "Excellence"],
  host: "New Millennium School, Bahrain",
  venue: "New Millennium School, Bahrain",
  // Conference dates (Bahrain time). The hero shows these with a live countdown.
  startsAt: "2026-12-11T08:00:00+03:00" as string | null,
  endsAt: "2026-12-12T17:00:00+03:00" as string | null,
  days: 2,
  // Registration form for each role (Google Form, Tally, etc.).
  // Leave a link empty and its button says "Notify me" and opens an email instead.
  registration: {
    delegate: "https://docs.google.com/forms/d/e/1FAIpQLSdNZCMgQXXJmXL3BAZxzq_R9HO6uUn2i1AEm3H24NOdfNdqXQ/viewform" as string,
    chair: "https://docs.google.com/forms/d/e/1FAIpQLSeI1S3UPMHhS8uUT7IrtgLQU4vd3QAHV8wwdCgp9fXdVUSPWw/viewform" as string,
    security: "https://docs.google.com/forms/d/e/1FAIpQLSdUjdXkSXu2BWAzB0M0qI24vFjSQbOVNx12qmWXt1v8H1C7FA/viewform" as string,
    runner: "https://docs.google.com/forms/d/e/1FAIpQLSdzzCLUm9aaAFv5DYyIuTFieK22UZ4IpiMlz3p7AeNvRw176A/viewform" as string,
  },
  email: "nmmile.bh@gmail.com",
  instagram: "https://www.instagram.com/nmmile.bh/",
  theme: {
    title: "Ante Cras",
    translation: "Before Tomorrow",
    lede:
      "Ante cras is Latin for \"before tomorrow\". The money, machines, media and laws that will shape the next decade are being argued over right now. This year delegates step in before tomorrow arrives, and decide what it looks like.",
  },
} as const;

/** True once at least one registration form is linked. */
export const registrationOpen = Object.values(site.registration).some(Boolean);

export const stats = [
  { value: String(councils.length).padStart(2, "0"), label: "Councils" },
  { value: "200+", label: "Delegates" },
  { value: "02", label: "Days of debate" },
  { value: "01", label: "Closing ceremony" },
];

export const reasons = [
  {
    n: "01",
    title: "Learn how the world negotiates",
    photo: "/photos/lobbying.webp",
    alt: "Delegates lobbying with draft papers between sessions",
    body: "Step into a company you have never worked for and defend its interests under pressure, in its own logic.",
  },
  {
    n: "02",
    title: "Speak, then speak better",
    photo: "/photos/speaking.webp",
    alt: "A delegate holding the floor in committee",
    body: "Opening speeches, moderated caucuses, points of order. By the second day you will notice the difference.",
  },
  {
    n: "03",
    title: "Meet the people across the aisle",
    photo: "/photos/delegates.webp",
    alt: "Delegates posing together with their badges",
    body: "Delegates from schools across Bahrain, working the same problem from opposite sides of the room.",
  },
  {
    n: "04",
    title: "Leave with something on paper",
    photo: "/photos/drafting.webp",
    alt: "Delegates huddled over a draft resolution",
    body: "A resolution with your clauses in it, an award if you earn it, and a certificate either way.",
  },
];

// The programme. While this list is empty the site shows "Schedule coming soon".
// Fill it in like this when timings are confirmed:
//   { day: "Day one", items: [{ time: "08:00", what: "Opening ceremony" }, ...] },
export const schedule: { day: string; items: { time: string; what: string }[] }[] = [];

// Photos from NMMUN 2023 used across the homepage. Swap files in /public/photos.
export const photos = {
  theme: { src: "/photos/placards.webp", alt: "Delegates holding up their phone lights in committee", caption: "Lights up. NMMUN 2023." },
  closing: { src: "/photos/closing.webp", alt: "Delegates and secretariat at the NMMUN closing ceremony" },
  inSession: [
    { src: "/photos/session-1.webp", alt: "Delegates at their desks during a session", caption: "Moderated caucus" },
    { src: "/photos/session-2.webp", alt: "A full committee room", caption: "A full room" },
    { src: "/photos/session-3.webp", alt: "Delegates listening to a speech", caption: "Points of information" },
    { src: "/photos/session-4.webp", alt: "Delegates raising their placards", caption: "Placards up" },
    { src: "/photos/session-5.webp", alt: "A packed committee room", caption: "Standing room only" },
    { src: "/photos/session-6.webp", alt: "Delegates working on a laptop together", caption: "Unmoderated caucus" },
  ],
};

export const faqs = [
  {
    q: "Is there a registration fee?",
    a: "Fee details will be published when registration opens. It covers lunch each day, your badge and conference materials.",
  },
  {
    q: "I have never been to a conference like this. Can I still sign up?",
    a: "Yes. The secretariat will point first-timers to the right council, and every delegate gets the rules of procedure guide plus a training session before the conference.",
  },
  {
    q: "Will food be provided?",
    a: "Lunch and refreshments are provided each day. Tell us about dietary requirements on the registration form.",
  },
  {
    q: "How are allocations decided?",
    a: "You list your council and company preferences on the form. The secretariat allocates by preference, experience and the order forms arrive.",
  },
  {
    q: "What do I wear?",
    a: "Western business attire or national dress. Blazers are encouraged, sneakers are not.",
  },
  {
    q: "How do I pay?",
    a: "Payment instructions are emailed once your allocation is confirmed.",
  },
];

export const nav = [
  { href: "/councils", label: "Councils" },
  { href: "/secretariat", label: "Secretariat" },
  { href: "/schedule", label: "Schedule" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];
