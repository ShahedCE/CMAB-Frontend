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
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        className={`block w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-700 
            file:mr-4 file:rounded-xl file:border-0 file:bg-(--brand-green-soft) file:px-4 
            file:py-2 file:text-sm file:font-semibold file:text-(--brand-green-dark) 
            hover:file:bg-[rgba(10,163,79,0.16)] ${
          error
            ? "border-red-300 focus-within:border-red-500"
            : "border-slate-200 focus-within:border-(--brand-green)"
        }`}
      />

      <p className="text-xs text-slate-500">
        Upload JPG, PNG, or WEBP image. Maximum size 5MB.
      </p>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}