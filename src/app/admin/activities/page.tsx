"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteActivity, getActivities } from "@/lib/admin/dashboard-api";
import { formatUtcDate } from "@/lib/admin/date";
import type { ActivityItem } from "@/lib/admin/dashboard-api";

function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[90vw] max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-lg font-bold text-slate-900">
          Confirm Delete
        </h3>
        <p className="mb-6 text-sm text-slate-700">
          Are you sure you want to delete this activity? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
            onClick={onConfirm}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ActivitiesPage() {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadActivities = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getActivities({ page: 1, limit: 20 });
      setItems(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Failed to load activities:", err);
      setError("Failed to load activities.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const handleDeleteRequest = (id: string) => {
    setDeleteId(id);
    setMessage("");
    setError("");
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    setActionId(deleteId);

    try {
      const response = await deleteActivity(deleteId);
      setItems((prev) => prev.filter((item) => item.id !== deleteId));
      setMessage(response?.message || "Activity deleted successfully.");
    } catch (err) {
      console.error("Failed to delete activity:", err);
      setError("Failed to delete activity.");
    } finally {
      setActionId("");
      setDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
  };

  return (
    <div className="space-y-5">
      <DeleteConfirmModal
        open={!!deleteId}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Activities</h1>
          <p className="text-sm text-slate-500">
            Manage activity list from the admin panel.
          </p>
        </div>

        <Link
          href="/admin/activities/create"
          className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Create Activity
        </Link>
      </div>

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
        {loading ? (
          <p className="text-sm text-slate-500">Loading activities...</p>
        ) : null}

        {!loading && items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            No activities found.
          </div>
        ) : null}

        {!loading &&
          items.map((item) => {
            const isDeleting = actionId === item.id;

            return (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1 space-y-2">
                    <h2 className="text-base font-semibold text-slate-900">
                      {item.title}
                    </h2>

                    <p className="text-sm text-slate-600">{item.description}</p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span>Date: {formatUtcDate(item.date)}</span>
                      <span>Created: {formatUtcDate(item.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Link
                      href={`/admin/activities/${item.id}`}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Details
                    </Link>

                    <Link
                      href={`/admin/activities/${item.id}/edit`}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDeleteRequest(item.id)}
                      disabled={isDeleting}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
      </div>
    </div>
  );
}