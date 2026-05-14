"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Message } from "@/types/message";
import {
  createMessage,
  updateMessage,
} from "@/lib/admin/messages-api";

type Props = {
  message?: Message;
};

export function MessageForm({ message }: Props) {
  const router = useRouter();

  const [organizationName, setOrganizationName] = useState(
    message?.organizationName || ""
  );
  const [fatherName, setFatherName] = useState(message?.fatherName || "");
  const [messageText, setMessageText] = useState(message?.message || "");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validateForm() {
    if (organizationName.trim().length < 2) {
      return "Organization name is required";
    }

    if (fatherName.trim().length < 2) {
      return "Father name is required";
    }

    if (messageText.trim().length < 5) {
      return "Message must be at least 5 characters";
    }

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
        organizationName,
        fatherName,
        message: messageText,
      };

      if (message?.id) {
        await updateMessage(message.id, payload);
      } else {
        await createMessage(payload);
      }

      router.push("/admin/messages");
      router.refresh();
    } catch (error: any) {
      console.error("Message save error:", error?.response?.data || error);
      setError(
        error?.response?.data?.message?.toString() ||
          "Failed to save message"
      );
    } finally {
      setSubmitting(false);
    }
  }

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
        <Field label="Organization Name">
          <input
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            placeholder="Enter organization name"
            className="input"
          />
        </Field>

        <Field label="Father Name">
          <input
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            placeholder="Enter father name"
            className="input"
          />
        </Field>
      </div>

      <Field label="Message">
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          rows={8}
          placeholder="Write message..."
          className="input"
        />
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-2xl bg-[var(--brand-green)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(10,163,79,0.22)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-green-dark)] disabled:opacity-60"
      >
        {submitting ? "Saving..." : message ? "Update Message" : "Create Message"}
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