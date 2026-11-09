// Council slots. Rename, re-order, add or remove freely: the 3D assembly hall,
// the councils index and each council page are generated from this list.
// Keep it between 4 and 10 entries so the hall layout stays readable.

export type Level = "Beginner" | "Intermediate" | "Advanced";

export type Council = {
  slug: string;
  abbr: string; // shown on the placard, keep it short
  name: string;
  level: Level;
  color: string; // placard colour in the hall and on the page
  agenda: string[]; // leave empty until topics are released
  chairs: { name: string; role: string }[];
  guideUrl?: string; // study guide PDF
  blurb: string;
};

export const councils: Council[] = [
  {
    slug: "unsc",
    abbr: "UNSC",
    name: "Security Council",
    level: "Advanced",
    color: "#B3261E",
    agenda: [],
    chairs: [],
    blurb: "Fifteen seats, five vetoes. Crisis updates may arrive mid-session.",
  },
  {
    slug: "unga",
    abbr: "GA1",
    name: "Disarmament and International Security",
    level: "Intermediate",
    color: "#2E5E5A",
    agenda: [],
    chairs: [],
    blurb: "The first committee of the General Assembly, every member state at the table.",
  },
  {
    slug: "unhrc",
    abbr: "HRC",
    name: "Human Rights Council",
    level: "Intermediate",
    color: "#C8892B",
    agenda: [],
    chairs: [],
    blurb: "Where principle and politics meet, usually head on.",
  },
  {
    slug: "who",
    abbr: "WHO",
    name: "World Health Organization",
    level: "Beginner",
    color: "#3F6FB0",
    agenda: [],
    chairs: [],
    blurb: "Public health policy with very real local stakes.",
  },
  {
    slug: "unep",
    abbr: "UNEP",
    name: "Environment Programme",
    level: "Beginner",
    color: "#5C7F3A",
    agenda: [],
    chairs: [],
    blurb: "Climate, coastlines and the cost of doing nothing.",
  },
  {
    slug: "ecosoc",
    abbr: "ECOSOC",
    name: "Economic and Social Council",
    level: "Intermediate",
    color: "#7A4E8C",
    agenda: [],
    chairs: [],
    blurb: "Jobs, trade and development, argued line by line.",
  },
  {
    slug: "icj",
    abbr: "ICJ",
    name: "International Court of Justice",
    level: "Advanced",
    color: "#1B1A17",
    agenda: [],
    chairs: [],
    blurb: "Advocates and judges. Evidence matters more than eloquence here.",
  },
  {
    slug: "press",
    abbr: "PRESS",
    name: "International Press Corps",
    level: "Beginner",
    color: "#D0573A",
    agenda: [],
    chairs: [],
    blurb: "Report on every council, question every delegate, publish the daily bulletin.",
  },
];

export const getCouncil = (slug: string) => councils.find((c) => c.slug === slug);
