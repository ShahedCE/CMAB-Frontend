"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";

type FooterLink = {
  label: string;
  href: string;
};

const quickLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Member", href: "/members" },
  { label: "Activities", href: "/activities" },
  { label: "Contact", href: "/contact" },
  { label: "Join Us", href: "/join" },
];



function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.1c0-.9.3-1.6 1.7-1.6H16V4.8c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.8V11H8v3h2.2v7h3.3Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M20 11.9c0 4.4-3.6 8-8 8-1.4 0-2.7-.4-3.9-1l-4.1 1.1 1.1-4A7.9 7.9 0 0 1 4 12c0-4.4 3.6-8 8-8s8 3.5 8 7.9Zm-8-6.6a6.6 6.6 0 0 0-5.7 9.8l.2.3-.7 2.5 2.5-.7.3.2A6.6 6.6 0 1 0 12 5.3Zm3.9 8.4c-.2-.1-1.1-.6-1.3-.7-.2-.1-.3-.1-.4.1l-.6.7c-.1.1-.2.2-.4.1-.9-.4-1.7-1-2.4-1.7-.5-.6-1-1.2-1.3-2-.1-.2 0-.3.1-.4l.3-.3.2-.3.1-.3c0-.1 0-.3-.1-.4l-.6-1.4c-.1-.3-.3-.3-.4-.3h-.4c-.1 0-.3.1-.5.3-.6.6-.8 1.3-.8 2 0 .2 0 .5.1.7.3 1 .9 2 1.7 2.8 1.1 1.2 2.5 2 4 2.5.4.1.8.2 1.2.2.7 0 1.4-.2 1.9-.7.3-.3.5-.8.6-1.3 0-.1 0-.2-.2-.3Z" />
    </svg>
  );
}

type FooterNavLinkProps = {
  href: string;
  label: string;
  active: boolean;
};

function FooterNavLink({ href, label, active }: FooterNavLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 ${
        active
          ? "bg-(--brand-green) text-white shadow-[0_10px_24px_rgba(10,163,79,0.22)]"
          : "text-slate-600 hover:-translate-y-0.5 hover:bg-white hover:text-(--brand-green-dark)"
      }`}
    >
      {label}
    </Link>
  );
}

type SocialLinkProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

function SocialLink({ href, label, children }: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(10,163,79,0.14)] bg-white text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1
       hover:border-(--brand-green) hover:bg-(--brand-green-soft) hover:text-(--brand-green-dark) hover:shadow-md"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-[linear-gradient(to_bottom,#f8fcf9,#eef8f1)]">
      <Container>
        <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-12">
          <div>
            <div className="max-w-md">
              <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold tracking-[0.14em] text-(--brand-green-dark) shadow-sm">
                CMAB
              </span>

              <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                Christian Medical Association Bangladesh
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                A clean, modern and community-centered platform with a calm
                medical identity inspired by the CMAB logo.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">
              Quick Links
            </h4>

            <div className="mt-4 flex flex-wrap gap-2">
              {quickLinks.map((item) => (
                <FooterNavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={isActivePath(pathname, item.href)}
                />
              ))}
            </div>
          </div>
           <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">
              Connect with us
            </h4>
              <div className="mt-3 flex items-center gap-3">
                <SocialLink href="https://www.facebook.com/people/Christian-Medical-Association-Bangladesh/61586551870820/" label="Facebook">
                  <FacebookIcon />
                </SocialLink>

                <SocialLink href="https://wa.me/8801000000000" label="WhatsApp">
                  <WhatsAppIcon />
                </SocialLink>
              </div>
              </div>
         
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200/80 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CMAB. All rights reserved.</p>
          <p>Designed for a clean and trustworthy digital experience.</p>
        </div>
      </Container>
    </footer>
  );
}