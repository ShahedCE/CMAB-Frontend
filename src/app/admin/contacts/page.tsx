"use client";

import { useEffect, useState } from "react";
import { getContacts, markContactAsRead, type ContactMessageItem } from "@/lib/admin/dashboard-api";
import { formatUtcDate } from "@/lib/admin/date";

export default function ContactsPage() {
  const [items, setItems] = useState<ContactMessageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState("");

  const loadContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      setItems(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const onMarkRead = async (id: string) => {
    setMessage("");
    setError("");
    setActionId(id);
    try {
      await markContactAsRead(id);
      setMessage("Contact message marked as read.");
      await loadContacts();
    } catch {
      setError("Failed to mark message as read.");
    } finally {
      setActionId("");
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-slate-900">Contact Messages</h1>
      {message ? <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p> : null}

      <div className="space-y-3">
        {loading ? <p className="text-sm text-slate-500">Loading...</p> : null}
        {!loading && items.length === 0 ? <p className="text-sm text-slate-500">No messages found.</p> : null}
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-900">{item.subject || "No subject"}</h2>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    item.isRead ? "bg-slate-100 text-slate-600" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {item.isRead ? "Read" : "Unread"}
                </span>
              </div>
              <p className="text-xs text-slate-500">{formatUtcDate(item.createdAt)}</p>
            </div>
            <p className="mt-1 text-sm text-slate-700">
              {item.name} - {item.email}
            </p>
            <p className="mt-2 text-sm text-slate-600">{item.message}</p>
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
