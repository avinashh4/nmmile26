import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Container, PageHead } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHead
        clause="Contact"
        title={
          <>
            Write to <span className="text-laurel">the secretariat.</span>
          </>
        }
        lede="Schools, parents, sponsors and delegates. We usually reply within two school days."
      />
      <Container className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-8">
          <div>
            <p className="text-sm font-medium text-ink-3">Email</p>
            <a href={`mailto:${site.email}`} className="display text-4xl hover:text-laurel">
              {site.email}
            </a>
          </div>
          <div>
            <p className="text-sm font-medium text-ink-3">Instagram</p>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="display text-4xl hover:text-laurel">
              Follow along
            </a>
          </div>
          <div>
            <p className="text-sm font-medium text-ink-3">Venue</p>
            <p className="display text-4xl">{site.venue}</p>
          </div>
        </div>
        <ContactForm email={site.email} />
      </Container>
    </>
  );
}
