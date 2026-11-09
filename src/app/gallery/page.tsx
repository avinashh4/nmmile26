import type { Metadata } from "next";
import Image from "next/image";
import { Container, PageHead } from "@/components/ui";
import { gallery } from "@/content/gallery";

export const metadata: Metadata = { title: "Gallery" };

const tilts = [-2, 1.5, -1, 2.2, -1.6, 1];

export default function GalleryPage() {
  return (
    <>
      <PageHead
        clause="Gallery"
        title={
          <>
            From the <span className="text-seal italic">archive.</span>
          </>
        }
        lede="Moments from previous editions. This year's photos go up after the closing ceremony."
      />
      <Container>
        <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
          {gallery.map((g, i) => (
            <figure
              key={i}
              className="reveal mb-10 break-inside-avoid bg-[#fbf8f1] p-3 pb-4 shadow-[0_18px_30px_-20px_rgb(27_26_23/.5)]"
              style={{ transform: `rotate(${tilts[i % tilts.length]}deg)` }}
            >
              <div className={`relative overflow-hidden bg-paper-3 ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                {g.src ? (
                  <Image src={g.src} alt={g.caption} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-sm font-medium text-ink/40">
                    Photo slot {String(i + 1).padStart(2, "0")}
                  </div>
                )}
              </div>
              <figcaption className="display mt-3 text-2xl italic">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </>
  );
}
