"use client";

import Link from "next/link";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  mobile?: boolean;
  onClick?: () => void;
};

export function NavLink({
  href,
  children,
  active = false,
  mobile = false,
  onClick,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "relative rounded-full text-sm font-medium transition-all duration-200",
        mobile ? "block w-full px-4 py-3" : "px-4 py-2.5",
        active
          ? "bg-brand-green text-white shadow-sm"
          : "text-slate-700 hover:bg-brand-green-soft hover:text-brand-green-dark",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}