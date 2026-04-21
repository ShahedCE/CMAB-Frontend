"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthCard } from "@/components/admin/auth-card";
import { AdminInput } from "@/components/admin/admin-input";
import { resetPassword } from "@/lib/admin/auth-api";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      await resetPassword({ email, otp, newPassword });
      setMessage("Password reset successful. Please login.");
      setNewPassword("");
    } catch {
      setMessage("Password reset failed. Please re-check OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard title="Reset Password" subtitle="Reset your password with email + OTP.">
      <form onSubmit={onSubmit} className="space-y-4">
        <AdminInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <AdminInput label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        <AdminInput
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-(--brand-green) px-4 text-sm font-semibold text-white transition hover:bg-(--brand-green-dark) disabled:opacity-60"
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {message ? <p className="text-sm text-slate-600">{message}</p> : null}

      <Link href="/admin/login" className="text-sm font-semibold text-(--brand-green-dark)">
        Back to Login
      </Link>
    </AuthCard>
  );
}
