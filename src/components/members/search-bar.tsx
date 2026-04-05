type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="নাম দিয়ে সদস্য খুঁজুন..."       
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm
         text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 
         focus:border-(--brand-green) focus:ring-4 focus:ring-[rgba(10,163,79,0.12)]"
      />
    </div>
  );
}