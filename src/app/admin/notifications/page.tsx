"use client";

import { useEffect, useState } from "react";
import { getNotifications, markNotificationAsRead } from "@/lib/admin/dashboard-api";
import { formatUtcDate } from "@/lib/admin/date";
import type { NotificationItem } from "@/types/admin";

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState("");

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await getNotifications();
      setItems(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const onMarkRead = async (id: string) => {
    setActionId(id);
    setMessage("");
    setError("");
    try {
      await markNotificationAsRead(id);
      setMessage("Notification marked as read.");
      await loadNotifications();
    } catch {
      setError("Failed to mark notification as read.");
    } finally {
      setActionId("");
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-slate-900">Notifications</h1>
      {message ? <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p> : null}

      <div className="space-y-3">
        {loading ? <p className="text-sm text-slate-500">Loading...</p> : null}
        {!loading && items.length === 0 ? <p className="text-sm text-slate-500">No notifications found.</p> : null}

        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-900">{item.title}</h2>
              <p className="text-xs text-slate-500">{formatUtcDate(item.createdAt)}</p>
            </div>
            <p className="mt-1 text-sm text-slate-600">{item.body}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>Type: {item.type}</span>
              <span>Source: {item.sourceType}</span>
              <span>ID: {item.sourceId}</span>
              <span>{item.isRead ? "Read" : "Unread"}</span>
            </div>
            {!item.isRead ? (
              <button
                type="button"
                onClick={() => onMarkRead(item.id)}
                disabled={actionId === item.id}
                className="mt-3 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700"
              >
                {actionId === item.id ? "Updating..." : "Mark as Read"}
              </button>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
