"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthCard } from "@/components/admin/auth-card";
import { AdminInput } from "@/components/admin/admin-input";
import { forgotPassword } from "@/lib/admin/auth-api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      await forgotPassword({ email });
      setMessage("If this email exists, an OTP has been sent.");
    } catch {
      setMessage("If this email exists, an OTP has been sent.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard title="Forgot Password" subtitle="Request OTP using your admin email.">
      <form onSubmit={onSubmit} className="space-y-4">
        <AdminInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-(--brand-green) px-4 text-sm font-semibold text-white transition hover:bg-(--brand-green-dark) disabled:opacity-60"
        >
          {isSubmitting ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>

      {message ? <p className="text-sm text-slate-600">{message}</p> : null}

      <div className="flex items-center justify-between text-sm">
        <Link href="/admin/verify-otp" className="font-semibold text-(--brand-green-dark)">
          Verify OTP
        </Link>
        <Link href="/admin/login" className="text-slate-600 hover:text-slate-900">
          Back to Login
        </Link>
      </div>
    </AuthCard>
  );
}
