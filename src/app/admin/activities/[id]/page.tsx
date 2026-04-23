"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ActivityItem,
  deleteActivity,
  getActivityById,
} from "@/lib/admin/dashboard-api";
import { formatUtcDate } from "@/lib/admin/date";

function getImageUrl(path?: string | null) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`;
}

export default function ActivityDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = String(params?.id || "");

  const [item, setItem] = useState<ActivityItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const loadActivity = async () => {
    if (!id) return;

    setLoading(true);
    setError("");

    try {
      const data = await getActivityById(id);
      setItem(data);
    } catch (err) {
      console.error("Failed to load activity details:", err);
      setError("Failed to load activity details.");
      setItem(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivity();
  }, [id]);

  const onDelete = async () => {
    if (!item?.id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this activity?"
    );

    if (!confirmed) return;

    setDeleting(true);
    setError("");

    try {
      await deleteActivity(item.id);
      router.push("/admin/activities");
    } catch (err) {
      console.error("Failed to delete activity:", err);
      setError("Failed to delete activity.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-500">Loading activity details...</p>;
  }

  if (error && !item) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>

        <button
          type="button"
          onClick={() => router.push("/admin/activities")}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
        >
          Back
        </button>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-500">Activity not found.</p>

        <button
          type="button"
          onClick={() => router.push("/admin/activities")}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
        >
          Back
        </button>
      </div>
    );
  }

  const imageUrl = getImageUrl(item.image || "");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{item.title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            View full activity information.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/activities"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Back
          </Link>

          <Link
            href={`/admin/activities/${item.id}/edit`}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Edit
          </Link>

          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="overflow-hidden  bg-white ">
        {imageUrl ? (
          <div className="flex justify-center items-center">
            <img
              src={imageUrl}
              alt={item.title}
              className="h-100 w-full bg-white object-center"
            />
          </div>
        ) : (
          <div className="flex h-72 items-center justify-center border-b border-slate-200 bg-slate-50 text-sm text-slate-400">
            No image available
          </div>
        )}
      </div>

      {/* Fix: Wrap the details in a proper div */}
      <div className="space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Activity Date
            </p>
            <p className="mt-2 text-sm text-slate-800">
              {formatUtcDate(item.date)}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Created At
            </p>
            <p className="mt-2 text-sm text-slate-800">
              {formatUtcDate(item.createdAt)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Short Description
          </h2>
          <p className="text-sm leading-7 text-slate-700">
            {item.description || "No short description available."}
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Full Description
          </h2>
          <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
            {item.fullDescription || "No full description available."}
          </p>
        </div>
      </div>
    </div>
  );
}