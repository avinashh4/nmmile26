import Image from "next/image";

/**
 * The NMMILE emblem, set in a cream coin with a thin gold ring so it sits
 * cleanly on any background (the artwork has its own cream ground).
 */
export function Logo({
  size = 44,
  className = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <span
      className={`inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-[#f7f2e6] shadow-[0_0_0_1.5px_var(--color-gold),0_2px_6px_-2px_rgb(27_26_23/.35)] ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.webp"
        alt="NMMILE emblem"
        width={size * 2}
        height={size * 2}
        priority={priority}
        className="h-[112%] w-[112%] max-w-none object-contain"
      />
    </span>
  );
}
