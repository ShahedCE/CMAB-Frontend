"use client";

import { useEffect, useState } from "react";
import {
  createActivity,
  deleteActivity,
  getActivities,
  updateActivity,
  type ActivityItem,
  type ActivityPayload,
} from "@/lib/admin/dashboard-api";
import { formatUtcDate } from "@/lib/admin/date";

const emptyForm: ActivityPayload = {
  title: "",
  date: "",
  location: "",
};

function buildFormData(payload: ActivityPayload): FormData {
  const fd = new FormData();
  fd.append("title", payload.title);
  fd.append("date", payload.date);
  // Only append location if present and non-empty after trimming
  if (payload.location && payload.location.trim()) {
    fd.append("location", payload.location.trim());
  }
  return fd;
}

export default function ActivitiesAdminPage() {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ActivityPayload>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);

  const loadActivities = async () => {
    setLoading(true);
    try {
      const data = await getActivities();
      setItems(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (item: ActivityItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      date: item.date ? item.date.slice(0, 16) : "",
      location: item.location || "",
    });
    setIsModalOpen(true);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSaving(true);
    try {
      const payload: ActivityPayload = {
        ...form,
        location: form.location?.trim() ? form.location : "",
      };
      const formData = buildFormData(payload);
      if (editingId) {
        await updateActivity(editingId, formData);
        setMessage("Activity updated successfully.");
      } else {
        await createActivity(formData);
        setMessage("Activity created successfully.");
      }
      setIsModalOpen(false);
      await loadActivities();
    } catch {
      setError("Activity save failed.");
    } finally {
      setIsSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    setMessage("");
    setError("");
    try {
      await deleteActivity(id);
      setMessage("Activity deleted successfully.");
      await loadActivities();
    } catch {
      setError("Activity delete failed.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Activities</h1>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-xl bg-(--brand-green) px-4 py-2 text-sm font-semibold text-white"
        >
          Create Activity
        </button>
      </div>
      {message ? <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p> : null}

      <div className="space-y-3">
        {loading ? <p className="text-sm text-slate-500">Loading...</p> : null}
        {!loading && items.length === 0 ? <p className="text-sm text-slate-500">No activities found.</p> : null}
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-900">{item.title}</h2>
              <p className="text-xs text-slate-500">{formatUtcDate(item.date)}</p>
            </div>
            {item.location ? <p className="mt-1 text-sm text-slate-600">Location: {item.location}</p> : null}
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => openEdit(item)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">{editingId ? "Update Activity" : "Create Activity"}</h2>
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
              <label className="block space-y-1 text-sm">
                <span className="font-semibold text-slate-800">Title</span>
                <input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-(--brand-green)"
                />
              </label>
              <label className="block space-y-1 text-sm">
                <span className="font-semibold text-slate-800">Date & Time (UTC)</span>
                <input
                  type="datetime-local"
                  value={form.date}
                  onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-(--brand-green)"
                />
              </label>
              <label className="block space-y-1 text-sm">
                <span className="font-semibold text-slate-800">Location</span>
                <input
                  value={form.location || ""}
                  onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                  className="h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-(--brand-green)"
                />
              </label>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-(--brand-green) px-4 py-2 text-sm font-semibold text-white"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
