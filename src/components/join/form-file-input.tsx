import { useId, useState } from "react";

type FormFileInputProps = {
  label: string;
  accept?: string;
  error?: string;
  required?: boolean;
  onChange: (file: File | null) => void;
};

export function FormFileInput({
  label,
  required,
  accept,
  error,
  onChange,
}: FormFileInputProps) {
  const inputId = useId();
  const [fileName, setFileName] = useState<string>("");

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <input
        id={inputId}
        type="file"
        accept={accept}
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] ?? null;
          setFileName(selectedFile?.name ?? "");
          onChange(selectedFile);
        }}
        className="sr-only"
      />

      <label
        htmlFor={inputId}
        className={`flex cursor-pointer items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-sm text-slate-700 transition-colors ${
          error
            ? "border-red-300 hover:border-red-400"
            : "border-slate-200 hover:border-(--brand-green)"
        }`}
      >
        <span className="rounded-xl bg-(--brand-green-soft) px-4 py-2 text-sm font-semibold text-(--brand-green-dark)">
          Select file
        </span>
        <span className="truncate text-slate-600">
          {fileName || "No file selected yet"}
        </span>
      </label>

      <p className="text-xs text-slate-500">
        Upload a JPG, PNG, or WEBP image. Maximum size 5MB.
      </p>
 

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}