"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/ui/logo";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Member", href: "/members" },
  { label: "Activities", href: "/activities" },
  { label: "Contact", href: "/contact" },

];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-5">
      <span
        className={`absolute left-0 top-1 h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-300 ${
          open ? "top-2.5 rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-2.5 h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 top-4 h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-300 ${
          open ? "top-2.5 -rotate-45" : ""
        }`}
      />
    </span>
  );
}

type DesktopNavLinkProps = {
  href: string;
  label: string;
  active: boolean;
};

function DesktopNavLink({ href, label, active }: DesktopNavLinkProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-semibold transition-all duration-300 ${
        active
          ? "bg-(--brand-green) text-white shadow-[0_10px_25px_rgba(10,163,79,0.28)]"
          : "text-slate-700 hover:-translate-y-0.5 hover:bg-white hover:text-(--brand-green-dark) hover:shadow-sm"
      }`}
    >
      <span>{label}</span>

      {!active ? (
        <span className="absolute inset-x-4 bottom-1 h-0.5 origin-center scale-x-0 rounded-full bg-(--brand-green) transition-transform duration-300 group-hover:scale-x-100" />
      ) : null}
    </Link>
  );
}

type MobileNavLinkProps = {
  href: string;
  label: string;
  active: boolean;
  onClick: () => void;
};

function MobileNavLink({
  href,
  label,
  active,
  onClick,
}: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex min-h-12 items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
        active
          ? "bg-(--brand-green) text-white shadow-[0_10px_25px_rgba(10,163,79,0.25)]"
          : "text-slate-700 hover:bg-(--brand-green-soft) hover:text-(--brand-green-dark)"
      }`}
    >
      <span>{label}</span>
      <span
        className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
          active ? "bg-white" : "bg-slate-300"
        }`}
      />
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/60 bg-[rgba(244,255,248,0.88)] shadow-[0_12px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          : "bg-[linear-gradient(to_bottom,rgba(240,249,244,0.95),rgba(255,255,255,0.92))]"
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <div className="shrink-0">
            <Logo />
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
            <nav className="flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.05)] backdrop-blur">
              {navItems.map((item) => (
                <DesktopNavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={isActivePath(pathname, item.href)}
                />
              ))}
            </nav>
          </div>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <Link
              href="/join"
              className="inline-flex h-11 items-center justify-center rounded-full 
              bg-[linear-gradient(135deg,var(--brand-green),var(--brand-green-dark))] px-5
               text-sm font-semibold text-white shadow-[0_12px_28px_rgba(10,163,79,0.28)] 
               transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(10,163,79,0.34)]"
            >
              Join CMAB
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white shadow-sm transition-all duration-300 lg:hidden ${
              menuOpen
                ? "border-(--brand-green) bg-(--brand-green-soft) shadow-[0_10px_24px_rgba(10,163,79,0.18)]"
                : "border-slate-200 hover:-translate-y-0.5 hover:border-(--brand-green) hover:bg-(--brand-green-soft)"
            }`}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-180 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Container className="pb-4">
          <div className="rounded-3xl border border-white/70 bg-white/95 p-3 
          shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={isActivePath(pathname, item.href)}
                  onClick={() => setMenuOpen(false)}
                />
              ))}
            </nav>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-12 items-center justify-center 
                rounded-2xl border border-[rgba(10,163,79,0.14)] bg-white 
                px-5 text-sm font-semibold text-slate-700 transition-all duration-300
                 hover:border-(--brand-green)
                  hover:bg-(--brand-green-soft) hover:text-(--brand-green-dark)"
              >
                Contact
              </Link>

              <Link
                href="/join"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-12 items-center justify-center
                 rounded-2xl bg-[linear-gradient(135deg,var(--brand-green),
                 var(--brand-green-dark))] px-5 text-sm font-semibold
                  text-white shadow-[0_12px_24px_rgba(10,163,79,0.24)]
                   transition-all duration-300 hover:shadow-[0_16px_32px_rgba(10,163,79,0.30)]"
              >
                Join CMAB
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}