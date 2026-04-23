"use client";

import { useEffect, useState } from "react";
import {
  getContacts,
  markContactAsRead,
  type ContactMessageItem,
} from "@/lib/admin/dashboard-api";
import { formatUtcDate } from "@/lib/admin/date";

export default function ContactsPage() {
  const [items, setItems] = useState<ContactMessageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState("");

  const loadContacts = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getContacts();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load contacts:", err);
      setError("Failed to load contact messages.");
      setItems([]);
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

      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "read" } : item
        )
      );

      setMessage("Contact message marked as read.");
    } catch (err) {
      console.error("Failed to mark contact as read:", err);
      setError("Failed to mark message as read.");
    } finally {
      setActionId("");
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-slate-900">Contact Messages</h1>

      {message ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
          {message}
        </p>
      ) : null}

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="space-y-3">
        {loading && <p className="text-sm text-slate-500">Loading...</p>}

        {!loading && items.length === 0 && (
          <p className="text-sm text-slate-500">No messages found.</p>
        )}

        {items.map((item) => {
          const isRead = item.status === "read";
          const isUpdating = actionId === item.id;

          return (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-semibold text-slate-900">
                      Message from {item.name || "Unknown"}
                    </h2>

                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        isRead
                          ? "bg-slate-100 text-slate-600"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {isRead ? "Read" : "Unread"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600">
                    Email: {item.email || "No email"}
                  </p>
                </div>

                <p className="text-xs text-slate-500">
                  {formatUtcDate(item.createdAt)}
                </p>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {item.message}
              </p>

              {!isRead ? (
                <button
                  type="button"
                  onClick={() => onMarkRead(item.id)}
                  disabled={isUpdating}
                  className="mt-4 rounded-lg border border-slate-200 px-3 py-1.5 text-xs bg-green-200 font-semibold text-slate-700 transition hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUpdating ? "Updating..." : "Mark as Read"}
                </button>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}