import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Schibsted_Grotesk } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/content/site";
import "./globals.css";

// Big Shoulders: condensed civic signage type, built for city banners
const display = Big_Shoulders({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  fallback: ["Arial Narrow", "Roboto Condensed", "sans-serif"],
  adjustFontFallback: false,
});

// Schibsted Grotesk: a newspaper grotesque for running text
const sans = Schibsted_Grotesk({
  variable: "--font-text",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nmmile26.vercel.app"),
  title: {
    default: `${site.shortName} ${site.edition} | ${site.host}`,
    template: `%s | ${site.shortName} ${site.edition}`,
  },
  description: `${site.fullName}, hosted by ${site.host}. ${site.theme.title}: ${site.theme.translation}.`,
  openGraph: {
    title: `${site.shortName} ${site.edition}`,
    description: site.theme.lede,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3eee3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <div className="scroll-progress" aria-hidden />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
