import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/content/site";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const sans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nmmile26.vercel.app"),
  title: {
    default: `${site.shortName} ${site.edition} | ${site.host}`,
    template: `%s | ${site.shortName} ${site.edition}`,
  },
  description: `${site.fullName}, hosted by ${site.host}. ${site.theme.title}.`,
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
