"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ExecutiveMember } from "@/types/executive-member";
import {
  createExecutiveMember,
  updateExecutiveMember,
} from "@/lib/admin/executive-members-api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";

type Props = {
  member?: ExecutiveMember;
};

function getImageSrc(imageUrl?: string | null) {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${API_BASE_URL}${imageUrl}`;
}

export function ExecutiveMemberForm({ member }: Props) {
  const router = useRouter();

  const [name, setName] = useState(member?.name || "");
  const [designation, setDesignation] = useState(member?.designation || "");
  const [phone, setPhone] = useState(member?.phone || "");
  const [email, setEmail] = useState(member?.email || "");
  const [isActive, setIsActive] = useState(member?.isActive ?? true);
  const [image, setImage] = useState<File | null>(null);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validateForm() {
    if (name.trim().length < 2) return "Name is required";
    if (designation.trim().length < 2) return "Designation is required";
    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const payload = {
        name,
        designation,
        phone,
        email,
        isActive,
        image,
      };

      if (member?.id) {
        await updateExecutiveMember(member.id, payload);
      } else {
        await createExecutiveMember(payload);
      }

      router.push("/admin/executive-members");
      router.refresh();
    } catch (error: any) {
      console.error(error?.response?.data || error);
      setError(
        error?.response?.data?.message?.toString() ||
          "Failed to save executive member"
      );
    } finally {
      setSubmitting(false);
    }
  }

  const previewImage = image ? URL.createObjectURL(image) : getImageSrc(member?.imageUrl);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl bg-white p-6 shadow-sm"
    >
      {error && (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="input"
          />
        </Field>

        <Field label="Designation">
          <input
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Enter designation"
            className="input"
          />
        </Field>

        <Field label="Phone">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="input"
          />
        </Field>

        <Field label="Email">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="input"
          />
        </Field>
      </div>

      <Field label="Photo">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="input"
        />
      </Field>

      {previewImage && (
        <div className="relative h-32 w-32 overflow-hidden rounded-2xl border bg-slate-100">
          <Image
            src={previewImage}
            alt={name || "Executive member"}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        Active
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-2xl bg-[var(--brand-green)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-green-dark)] disabled:opacity-60"
      >
        {submitting
          ? "Saving..."
          : member
            ? "Update Executive Member"
            : "Create Executive Member"}
      </button>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid #cbd5e1;
          background: white;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #0f172a;
          outline: none;
        }

        .input:focus {
          border-color: var(--brand-green);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-2">
      <span className="block text-sm font-semibold text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}