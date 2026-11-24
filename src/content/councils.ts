// Council slots. Rename, re-order, add or remove freely: the 3D assembly hall,
// the councils index and each council page are generated from this list.
// The hall lays out up to 12 councils comfortably.

export type Council = {
  slug: string;
  abbr: string; // shown on the banner and placard
  name?: string; // full name, if the abbreviation stands for something
  color: string; // banner colour in the hall and on the page
  logo?: string; // council logo in /public, e.g. "/councils/astra.webp" (square works best)
  agenda: string[]; // leave empty until topics are released
  chairs: { name: string; role: string }[];
  guideUrl?: string; // study guide PDF, e.g. "/guides/astra.pdf"
  blurb?: string; // one line about the committee; leave out until confirmed
};

export const councils: Council[] = [
  {
    slug: "finex",
    abbr: "FINEX",
    // TODO: secretariat to pick one: "Financial Innovation & Exchange" or "Global Financial Network"
    name: "Financial Innovation & Exchange",
    color: "#2E5E5A",
    logo: "/councils/finex.webp",
    agenda: [],
    chairs: [],
  },
  {
    slug: "astra",
    abbr: "ASTRA",
    name: "Alliance for Space Technology, Resources, and Authority",
    color: "#2B3A7A",
    logo: "/councils/astra.webp",
    agenda: [],
    chairs: [],
  },
  {
    slug: "juris",
    abbr: "JURIS",
    name: "Judicial Union for Rights, Integrity, and Statutes",
    color: "#1B1A17",
    logo: "/councils/juris.webp",
    agenda: [],
    chairs: [],
  },
  {
    slug: "nexus",
    abbr: "NEXUS",
    name: "Network for Entertainment, Xtreme Media, and Universal Streaming",
    color: "#A2326B",
    logo: "/councils/nexus.webp",
    agenda: [],
    chairs: [],
  },
  {
    slug: "terra",
    abbr: "TERRA",
    name: "The Environmental Research and Resource Alliance",
    color: "#5C7F3A",
    logo: "/councils/terra.webp",
    agenda: [],
    chairs: [],
  },
  {
    slug: "veritas",
    abbr: "VERITAS",
    name: "The Truth",
    color: "#C8573A",
    logo: "/councils/veritas.webp",
    agenda: [],
    chairs: [],
  },
  {
    slug: "nova",
    abbr: "NOVA",
    name: "Network for Opportunities, Vision, and Artificial Intelligence",
    color: "#6B4FA0",
    logo: "/councils/nova.webp",
    agenda: [],
    chairs: [],
  },
  {
    slug: "shield",
    abbr: "SHIELD",
    name: "Summit for Human Integrity, Ethics, and Digital Life",
    color: "#3F6FB0",
    logo: "/councils/shield.webp",
    agenda: [],
    chairs: [],
  },
  {
    slug: "spiderverse",
    abbr: "SPIDERVERSE",
    color: "#B3261E",
    logo: "/councils/spiderverse.webp",
    agenda: [],
    chairs: [],
  },
  {
    slug: "odyssey",
    abbr: "ODYSSEY",
    color: "#B08D4A",
    logo: "/councils/odyssey.webp",
    agenda: [],
    chairs: [],
  },
  {
    slug: "fifa",
    abbr: "FIFA",
    color: "#1F7A8C",
    logo: "/councils/fifa.webp",
    agenda: [],
    chairs: [],
  },
];

export const getCouncil = (slug: string) => councils.find((c) => c.slug === slug);

/** Full name when there is one, otherwise the abbreviation. */
export const councilTitle = (c: Council) => c.name ?? c.abbr;
