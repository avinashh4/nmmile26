import Link from "next/link";
import { site } from "@/content/site";

export function RegisterButton({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-9 px-4 text-[0.9rem]",
    md: "h-11 px-5 text-base",
    lg: "h-14 px-7 text-lg",
  }[size];
  const open = site.registrationOpen && site.registerUrl;
  return (
    <Link
      href="/register"
      className={`group inline-flex items-center gap-2 rounded-full bg-laurel font-semibold text-paper shadow-[inset_0_-3px_0_rgb(0_0_0/.2)] transition-[background-color,transform] duration-200 hover:bg-laurel-2 active:translate-y-[1px] ${sizes} ${className}`}
    >
      {open ? "Register" : "Register interest"}
      <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden>
        <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
