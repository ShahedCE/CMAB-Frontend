import type { InputHTMLAttributes } from "react";

type AdminInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function AdminInput({ label, className = "", ...props }: AdminInputProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <input
        {...props}
        className={`h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-(--brand-green) focus:ring-4 focus:ring-[rgba(10,163,79,0.12)] ${className}`}
      />
    </label>
  );
}
