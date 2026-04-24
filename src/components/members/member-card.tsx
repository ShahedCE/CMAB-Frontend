import Image from "next/image";
import type { Member } from "@/types/member";
import { Button } from "../ui/button";

type MemberCardProps = {
  member: Member;
};

function getImageUrl(path?: string | null) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  if (!path) return null;
  if (path.startsWith("http")) return path;

  return `${base}${path}`;
}

// 🔥 only these 3 values handle
const categoryStyles: Record<string, string> = {
  general: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  light: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  irregular: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
};

// 🔥 Bangla mapping
const categoryLabels: Record<string, string> = {
  general: "সাধারণ সদস্য",
  light: "লাইট সদস্য",
  irregular: "অনিয়মিত সদস্য",
};

export function MemberCard({ member }: MemberCardProps) {
  const imageUrl = getImageUrl(member.profileImageUrl);

  const type = member.membershipType || "general";

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={member.fullNameBn || member.fullNameEn || "Member"}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No image
          </div>
        )}
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {member.fullNameBn || member.fullNameEn}
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              {member.specialty || "বিশেষজ্ঞতা উল্লেখ নেই"}
              {member.workplaceTypes?.length
                ? ` - ${member.workplaceTypes.join(", ")}`
                : ""}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              categoryStyles[type] || categoryStyles.general
            }`}
          >
            {categoryLabels[type] || "সদস্য"}
          </span>
        </div>

        <div className="mt-6">
          <Button href={`/members/${member.id}`}>
            বিস্তারিত দেখুন
          </Button>
        </div>
      </div>
    </article>
  );
}