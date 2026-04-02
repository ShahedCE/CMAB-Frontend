import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseClassName =
    "inline-flex min-h-11 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300";

  const variantClassName =
    variant === "primary"
      ? "bg-[var(--brand-green)] text-white shadow-[0_12px_24px_rgba(10,163,79,0.22)] hover:-translate-y-0.5 hover:bg-[var(--brand-green-dark)] hover:shadow-[0_16px_30px_rgba(10,163,79,0.28)]"
      : "border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[var(--brand-green)] hover:bg-[var(--brand-green-soft)] hover:text-[var(--brand-green-dark)]";

  if (href) {
    return (
      <Link href={href} className={`${baseClassName} ${variantClassName} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={`${baseClassName} ${variantClassName} ${className}`}>
      {children}
    </button>
  );
}