"use client";

import { usePathname } from "next/navigation";
import { SiteLayout } from "@/components/layout/site-layout";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return <SiteLayout>{children}</SiteLayout>;
}
