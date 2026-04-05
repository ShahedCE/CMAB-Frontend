import Image from "next/image";
import type { Member } from "@/types/member";

type MemberCardProps = {
  member: Member;
};

const categoryStyles: Record<Member["category"], string> = {
  general:
    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  light:
    "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  irregular:
    "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
};

const categoryLabels: Record<Member["category"], string> = {
    general: "সাধারণ সদস্য",
  light: "লাইট সদস্য",
  irregular: "অনিয়মিত সদস্য",
};

export function MemberCard({ member }: MemberCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-slate-900">
              {member.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-600">
              {member.role}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${categoryStyles[member.category]}`}
          >
            {categoryLabels[member.category]}
          </span>
        </div>

        <p className="text-sm leading-6 text-slate-600">
          {member.description}
        </p>
      </div>
    </article>
  );
}