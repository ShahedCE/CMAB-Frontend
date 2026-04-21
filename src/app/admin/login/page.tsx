"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard } from "@/components/admin/auth-card";
import { AdminInput } from "@/components/admin/admin-input";
import { loginAdmin } from "@/lib/admin/auth-api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await loginAdmin({ email, password });
      router.replace("/admin");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const backendMessage =
          typeof err.response?.data?.message === "string"
            ? err.response?.data?.message
            : Array.isArray(err.response?.data?.message)
              ? err.response?.data?.message.join(", ")
              : "";

        if (backendMessage) {
          setError(backendMessage);
        } else if (err.message) {
          setError(err.message);
        } else {
          setError("Login failed. Please check email and password.");
        }
      } else {
        setError("Login failed. Please check email and password.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard title="Admin Login" subtitle="Login with your admin credentials.">
      <form onSubmit={onSubmit} className="space-y-4">
        <AdminInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <AdminInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-(--brand-green) px-4 text-sm font-semibold text-white transition hover:bg-(--brand-green-dark) disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-slate-600">
        Forgot password?{" "}
        <Link href="/admin/forgot-password" className="font-semibold text-(--brand-green-dark)">
          Reset now
        </Link>
      </p>
    </AuthCard>
  );
}
