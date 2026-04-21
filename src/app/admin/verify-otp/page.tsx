"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthCard } from "@/components/admin/auth-card";
import { AdminInput } from "@/components/admin/admin-input";
import { verifyOtp } from "@/lib/admin/auth-api";

export default function VerifyOtpPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      await verifyOtp({ email, otp });
      setMessage("OTP verified successfully. You can now reset password.");
    } catch {
      setMessage("OTP verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard title="Verify OTP" subtitle="Enter email and OTP to verify your request.">
      <form onSubmit={onSubmit} className="space-y-4">
        <AdminInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <AdminInput label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-(--brand-green) px-4 text-sm font-semibold text-white transition hover:bg-(--brand-green-dark) disabled:opacity-60"
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      {message ? <p className="text-sm text-slate-600">{message}</p> : null}

      <div className="flex items-center justify-between text-sm">
        <Link href="/admin/reset-password" className="font-semibold text-(--brand-green-dark)">
          Go to Reset Password
        </Link>
        <Link href="/admin/login" className="text-slate-600 hover:text-slate-900">
          Back to Login
        </Link>
      </div>
    </AuthCard>
  );
}
