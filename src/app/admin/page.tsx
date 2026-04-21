"use client";

import { useEffect, useState } from "react";
import {
  getJoinRequests,
  getMembers,
  getNotifications,
  getUnreadNotificationCount,
  getContacts,
} from "@/lib/admin/dashboard-api";
import { formatUtcDate } from "@/lib/admin/date";
import type { NotificationItem } from "@/types/admin";

type DashboardCounts = {
  pendingJoinRequests: number;
  totalMembers: number;
  unreadNotifications: number;
  contactMessages: number;
};

const defaultCounts: DashboardCounts = {
  pendingJoinRequests: 0,
  totalMembers: 0,
  unreadNotifications: 0,
  contactMessages: 0,
};

function extractArray<T>(response: any): T[] {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.notifications)) return response.notifications;
  if (Array.isArray(response?.results)) return response.results;
  return [];
}

function extractUnreadCount(response: any): number {
  if (typeof response === "number") return response;
  if (typeof response?.count === "number") return response.count;
  if (typeof response?.unreadCount === "number") return response.unreadCount;
  if (typeof response?.data?.count === "number") return response.data.count;
  if (typeof response?.data?.unreadCount === "number") return response.data.unreadCount;
  return 0;
}

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<DashboardCounts>(defaultCounts);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const [
          joinRequestsData,
          membersData,
          notificationsData,
          unreadNotificationsData,
          contactsData,
        ] = await Promise.all([
          getJoinRequests(),
          getMembers(),
          getNotifications(),
          getUnreadNotificationCount(),
          getContacts(),
        ]);

        console.log("joinRequestsData:", joinRequestsData);
        console.log("membersData:", membersData);
        console.log("notificationsData:", notificationsData);
        console.log("unreadNotificationsData:", unreadNotificationsData);
        console.log("contactsData:", contactsData);

        const joinRequests = extractArray(joinRequestsData);
        const members = extractArray(membersData);
        const notificationArray = extractArray<NotificationItem>(notificationsData);
        const contacts = extractArray(contactsData);
        const unreadNotifications = extractUnreadCount(unreadNotificationsData);

        setCounts({
          pendingJoinRequests: joinRequests.filter(
            (item: any) => item?.status === "pending"
          ).length,
          totalMembers: members.length,
          unreadNotifications,
          contactMessages: contacts.length,
        });

        setNotifications(notificationArray);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        setCounts(defaultCounts);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Overview of requests, members, contact and notifications.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Pending Join Requests", value: counts.pendingJoinRequests },
          { label: "Total Members", value: counts.totalMembers },
          { label: "Unread Notifications", value: counts.unreadNotifications },
          { label: "Contact Messages", value: counts.contactMessages },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{loading ? "-" : card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">Latest Notifications</h2>
        </div>

        <div className="divide-y divide-slate-100">
          {loading ? (
            <p className="px-4 py-6 text-sm text-slate-500">Loading notifications...</p>
          ) : safeNotifications.length === 0 ? (
            <p className="px-4 py-6 text-sm text-slate-500">No notifications found.</p>
          ) : (
            safeNotifications.slice(0, 8).map((item) => (
              <div key={item.id} className="px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-600">{item.body}</p>
                <p className="mt-1 text-xs text-slate-500">{formatUtcDate(item.createdAt)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}