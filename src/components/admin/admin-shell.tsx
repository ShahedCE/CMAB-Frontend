"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getAdminUser, getAccessToken } from "@/lib/admin/auth-storage";
import { logoutAdmin } from "@/lib/admin/auth-api";
import { getUnreadNotificationCount } from "@/lib/admin/dashboard-api"; // UPDATE: Import correct function

type AdminShellProps = {
  children: React.ReactNode;
};

const authRoutes = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/verify-otp",
  "/admin/reset-password",
];

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/join-requests", label: "Join Requests" },
  { href: "/admin/members", label: "Members" },
  { href: "/admin/contacts", label: "Contacts" },
  { href: "/admin/activities", label: "Activities" },
  { href: "/admin/notifications", label: "Notifications" },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const isAuthRoute = useMemo(() => authRoutes.includes(pathname), [pathname]);

  useEffect(() => {
    const token = getAccessToken();

    if (!token && !isAuthRoute) {
      router.replace("/admin/login");
      return;
    }

    if (token && isAuthRoute) {
      router.replace("/admin");
      return;
    }

    setReady(true);
  }, [isAuthRoute, pathname, router]);

  useEffect(() => {
    if (isAuthRoute) return;

    let active = true;
    const loadUnreadCount = async () => {
      try {
        const result = await getUnreadNotificationCount();
        if (!active) return;
        let count = 0;

        // Try to extract the unread count intelligently based on possible response shapes
        if (typeof result === "number") {
          count = result;
        } else if (result && typeof result.count === "number") {
          count = result.count;
        } else if (result && typeof result.unreadCount === "number") {
          count = result.unreadCount;
        } else if (result && result.data && typeof result.data.count === "number") {
          count = result.data.count;
        } else if (result && result.data && typeof result.data.unreadCount === "number") {
          count = result.data.unreadCount;
        }

        setUnreadCount(count);
      } catch {
        if (!active) return;
        setUnreadCount(0);
      }
    };

    loadUnreadCount();
    const timer = window.setInterval(loadUnreadCount, 15000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [isAuthRoute]);

  const user = getAdminUser();

  const onLogout = async () => {
    setLoggingOut(true);
    await logoutAdmin();
    router.replace("/admin/login");
  };

  if (!ready) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-slate-600">Loading admin...</div>;
  }

  if (isAuthRoute) {
    return (
      <main className="min-h-screen bg-[linear-gradient(to_bottom,#f6fbf8,#ffffff)] px-4 py-10 sm:px-6">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)]">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-1 text-xs uppercase tracking-[0.14em] text-slate-500">CMAB Admin</p>
          <h2 className="text-lg font-semibold text-slate-900">Dashboard</h2>

          <nav className="mt-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  isActive(pathname, item.href)
                    ? "bg-(--brand-green) text-white"
                    : "text-slate-700 hover:bg-(--brand-green-soft) hover:text-(--brand-green-dark)"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="space-y-4">
          <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Signed in</p>
              <p className="text-sm font-semibold text-slate-900">{user?.email || "Admin user"}</p>
              <p className="text-xs text-slate-500">Unread notifications: {unreadCount}</p>
            </div>

            <button
              type="button"
              onClick={onLogout}
              disabled={loggingOut}
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-(--brand-green) hover:bg-(--brand-green-soft) hover:text-(--brand-green-dark) disabled:opacity-60"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </header>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">{children}</section>
        </div>
      </div>
    </div>
  );
}
