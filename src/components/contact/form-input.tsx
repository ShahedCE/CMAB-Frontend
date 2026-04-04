import type { InputHTMLAttributes } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  requiredMark?: boolean;
};

export function FormInput({
  label,
  error,
  requiredMark = false,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-800">
        {label}
        {requiredMark ? <span className="ml-1 text-red-500">*</span> : null}
      </label>

      <input
        {...props}
        className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
            : "border-slate-200 focus:border-(--brand-green) focus:ring-4 focus:ring-[rgba(10,163,79,0.12)]"
        } ${className}`}
      />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}