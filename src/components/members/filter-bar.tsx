import type { MemberCategory } from "@/types/member";

type FilterOption = {
  label: string;
  value: MemberCategory;
};

type FilterBarProps = {
  activeFilter: MemberCategory;
  onChange: (value: MemberCategory) => void;
};

const filterOptions: FilterOption[] = [
  { label: "All Members", value: "all" },
  { label: "General Members", value: "general" },
  { label: "Light Members", value: "light" },
  { label: "Irregular Members", value: "irregular" },
];

export function FilterBar({
  activeFilter,
  onChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map((option) => {
        const isActive = activeFilter === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
              isActive
                ? "bg-(--brand-green) text-white shadow-[0_10px_24px_rgba(10,163,79,0.22)]"
                : "border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-(--brand-green) hover:bg-(--brand-green-soft) hover:text-(--brand-green-dark)"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}