"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ActivityItem, getActivityById, updateActivity } from "@/lib/admin/dashboard-api";


type ActivityFormState = {
  title: string;
  date: string;
  description: string;
  fullDescription: string;
  image: File | null;
};

function getImageUrl(path?: string | null) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`;
}

function buildFormData(values: ActivityFormState) {
  const formData = new FormData();

  formData.append("title", values.title.trim());
  formData.append("date", values.date);
  formData.append("description", values.description.trim());
  formData.append("fullDescription", values.fullDescription.trim());

  if (values.image instanceof File) {
    formData.append("image", values.image);
  }

  return formData;
}

export default function EditActivityPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = String(params?.id || "");

  const [item, setItem] = useState<ActivityItem | null>(null);
  const [form, setForm] = useState<ActivityFormState>({
    title: "",
    date: "",
    description: "",
    fullDescription: "",
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const displayedImage = useMemo(() => {
    return previewUrl || currentImageUrl || "";
  }, [previewUrl, currentImageUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    const loadActivity = async () => {
      if (!id) return;

      setLoading(true);
      setError("");

      try {
        const data = await getActivityById(id);
        setItem(data);

        setCurrentImageUrl(getImageUrl(data.image || ""));
        setForm({
          title: data.title || "",
          date: data.date ? data.date.slice(0, 10) : "",
          description: data.description || "",
          fullDescription: data.fullDescription || "",
          image: null,
        });
      } catch (err) {
        console.error("Failed to load activity:", err);
        setError("Failed to load activity details.");
      } finally {
        setLoading(false);
      }
    };

    loadActivity();
  }, [id]);

  const onChangeField =
    (field: keyof Omit<ActivityFormState, "image">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    setSaving(true);
    setError("");
  
    try {
      const formData = buildFormData(form);
  
      for (const pair of formData.entries()) {
        console.log("FORMDATA:", pair[0], pair[1]);
      }
  
      await updateActivity(id, formData);
      router.push(`/admin/activities/${id}`);
    } catch (err: any) {
      console.error("Failed to update activity:", err);
      console.error("Backend error response:", err?.response?.data);
  
      setError(
        err?.response?.data?.message
          ? Array.isArray(err.response.data.message)
            ? err.response.data.message.join(", ")
            : err.response.data.message
          : "Failed to update activity."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-500">Loading activity...</p>;
  }

  if (!loading && error && !item) {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Activity</h1>
          <p className="mt-1 text-sm text-slate-500">
            Update activity information and replace the image if needed.
          </p>
        </div>

        <Link
          href={`/admin/activities/${id}`}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Back
        </Link>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form
        onSubmit={onSubmit}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="title" className="text-sm font-medium text-slate-700">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={form.title}
                onChange={onChangeField("title")}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                required
                maxLength={200}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="date" className="text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                id="date"
                type="date"
                value={form.date}
                onChange={onChangeField("date")}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="description" className="text-sm font-medium text-slate-700">
                Short Description
              </label>
              <textarea
                id="description"
                value={form.description}
                onChange={onChangeField("description")}
                rows={4}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                required
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="fullDescription" className="text-sm font-medium text-slate-700">
                Full Description
              </label>
              <textarea
                id="fullDescription"
                value={form.fullDescription}
                onChange={onChangeField("fullDescription")}
                rows={10}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium text-slate-700">
                Replace Image
              </label>

              {displayedImage ? (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <img
                    src={displayedImage}
                    alt={form.title || "Activity preview"}
                    className="h-48 w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400">
                  No image available
                </div>
              )}

              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={onChangeImage}
                className="block w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700"
              />

              <p className="text-xs text-slate-500">
                Leave this empty if you want to keep the current image.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-4">
          <Link
            href={`/admin/activities/${id}`}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-green-200 px-4 py-2 text-sm font-semibold text-black transition hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Updating..." : "Update Activity"}
          </button>
        </div>
      </form>
    </div>
  );
}