// Everything the organising team is likely to edit lives in /src/content.
// Change copy here; the pages pick it up automatically.

import { councils } from "./councils";

export const site = {
  shortName: "NMMILE",
  edition: "'26",
  year: 2026,
  // TODO: confirm the full expansion of NMMILE with the secretariat.
  fullName: "New Millennium Model International Legislative Exercise",
  host: "New Millennium School, Bahrain",
  venue: "New Millennium School, Bahrain",
  // Set to an ISO date once confirmed, e.g. "2026-12-12T08:00:00+03:00".
  // While null, the site shows "Dates announced soon".
  startsAt: null as string | null,
  days: 2,
  registrationOpen: false,
  registerUrl: "", // Google Form / Tally link. Empty keeps the button in "opening soon" state.
  email: "nmmun@nms.edu.bh", // TODO: confirm address
  instagram: "https://www.instagram.com/", // TODO: add handle
  theme: {
    title: "Grassroots to the global stage",
    lede:
      "Global problems are rarely solved at summits alone. They are solved by people on the ground, with simple ideas that travel. This year we ask delegates to argue from the street up.",
  },
} as const;

export const stats = [
  { value: String(councils.length).padStart(2, "0"), label: "Councils" },
  { value: "200+", label: "Delegates" },
  { value: "02", label: "Days of debate" },
  { value: "01", label: "Closing ceremony" },
];

export const reasons = [
  {
    n: "I",
    title: "Learn how the world negotiates",
    body: "Research a country you have never visited and defend its interests under pressure, in its own logic.",
  },
  {
    n: "II",
    title: "Speak, then speak better",
    body: "Opening speeches, moderated caucuses, points of order. By the second day you will notice the difference.",
  },
  {
    n: "III",
    title: "Meet the people across the aisle",
    body: "Delegates from schools across Bahrain, working the same problem from opposite sides of the room.",
  },
  {
    n: "IV",
    title: "Leave with something on paper",
    body: "A resolution with your clauses in it, an award if you earn it, and a certificate either way.",
  },
];

export const schedule = [
  {
    day: "Day one",
    items: [
      { time: "07:30", what: "Registration and badge collection" },
      { time: "08:30", what: "Opening ceremony" },
      { time: "09:30", what: "Committee session I" },
      { time: "12:00", what: "Lunch" },
      { time: "13:00", what: "Committee session II" },
      { time: "15:30", what: "Close of day" },
    ],
  },
  {
    day: "Day two",
    items: [
      { time: "08:00", what: "Committee session III" },
      { time: "11:30", what: "Voting procedure" },
      { time: "12:30", what: "Lunch" },
      { time: "13:30", what: "General Assembly" },
      { time: "15:00", what: "Closing ceremony and awards" },
    ],
  },
];

export const faqs = [
  {
    q: "Is there a registration fee?",
    a: "Fee details will be published when registration opens. It covers lunch on both days, your badge and conference materials.",
  },
  {
    q: "I have never done a MUN. Can I still sign up?",
    a: "Yes. The secretariat will point first-timers to the right council, and every delegate gets the rules of procedure guide plus a training session before the conference.",
  },
  {
    q: "Will food be provided?",
    a: "Lunch and refreshments are provided on both days. Tell us about dietary requirements on the registration form.",
  },
  {
    q: "How are country allocations decided?",
    a: "You list your council and country preferences on the form. The secretariat allocates by preference, experience and the order forms arrive.",
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
