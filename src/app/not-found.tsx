import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <span className="stamp text-laurel">Point of order</span>
      <h1 className="display mt-8 text-[clamp(3.4rem,10vw,8rem)]">
        This page is <span className="text-laurel">out of order.</span>
      </h1>
      <p className="mx-auto mt-6 max-w-md text-xl text-ink-2">The chair does not recognise this address.</p>
      <Link href="/" className="mt-10 inline-flex h-12 items-center rounded-full bg-ink px-6 font-semibold text-paper hover:bg-laurel">
        Return to the floor
      </Link>
    </Container>
  );
}
