"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createActivity } from "@/lib/admin/dashboard-api";

type ActivityFormState = {
  title: string;
  date: string;
  description: string;
  fullDescription: string;
  image: File | null;
};

function buildFormData(values: ActivityFormState) {
  const formData = new FormData();

  formData.append("title", values.title.trim());
  formData.append("description", values.description.trim());
  formData.append("fullDescription", values.fullDescription.trim());
  formData.append("date", values.date);

  if (values.image instanceof File) {
    formData.append("image", values.image);
  }

  return formData;
}

export default function CreateActivityPage() {
  const router = useRouter();

  const [form, setForm] = useState<ActivityFormState>({
    title: "",
    date: "",
    description: "",
    fullDescription: "",
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

      // debug (optional)
      for (const pair of formData.entries()) {
        console.log("FORMDATA:", pair[0], pair[1]);
      }

      await createActivity(formData);

      router.push("/admin/activities");
    } catch (err: any) {
      console.error("Create activity failed:", err);
      console.error("Backend error:", err?.response?.data);

      setError(
        Array.isArray(err?.response?.data?.message)
          ? err.response.data.message.join(", ")
          : err?.response?.data?.message || "Failed to create activity."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Create Activity
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Add a new activity to the system.
          </p>
        </div>

        <Link
          href="/admin/activities"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back
        </Link>
      </div>

      {/* Error */}
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left */}
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={onChangeField("title")}
                className="w-full rounded-xl border px-3 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={onChangeField("date")}
                className="w-full rounded-xl border px-3 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Short Description
              </label>
              <textarea
                rows={4}
                value={form.description}
                onChange={onChangeField("description")}
                className="w-full rounded-xl border px-3 py-2 text-sm"
                required
              />
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Full Description
              </label>
              <textarea
                rows={10}
                value={form.fullDescription}
                onChange={onChangeField("fullDescription")}
                className="w-full rounded-xl border px-3 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Activity Image
              </label>

              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-40 w-full object-cover rounded-lg border"
                />
              ) : (
                <div className="h-40 flex items-center justify-center border border-dashed text-sm text-slate-400 rounded-lg">
                  No image selected
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={onChangeImage}
                className="mt-2 block w-full text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 border-t pt-4">
          <Link
            href="/admin/activities"
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
          >
            {saving ? "Creating..." : "Create Activity"}
          </button>
        </div>
      </form>
    </div>
  );
}