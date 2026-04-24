import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Member } from "@/types/member";

type Props = {
  member: Member;
};

function getImageUrl(path?: string | null) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  if (!path) return null;
  if (path.startsWith("http")) return path;

  return `${base}${path}`;
}

// 🔥 same mapping logic as card
const categoryLabels: Record<string, string> = {
  general: "সাধারণ সদস্য",
  light: "লাইট সদস্য",
  irregular: "অনিয়মিত সদস্য",
};

export function MemberDetailContent({ member }: Props) {
  const imageUrl = getImageUrl(member.profileImageUrl);
  const type = member.membershipType || "general";

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)]">
      <div className="mx-auto max-w-5xl px-4 py-10">

        {/* 🔥 Card */}
        <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-lg">

          {/* Image */}
          <div className="relative h-72 w-full bg-slate-100">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={member.fullNameBn || member.fullNameEn}
                fill
                unoptimized
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                No image available
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-5">

            {/* Name + Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {member.fullNameBn || member.fullNameEn}
                </h1>

                <p className="text-sm text-slate-500">
                  {member.fullNameEn}
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
                {categoryLabels[type] || "সদস্য"}
              </span>
            </div>

            {/* Basic Info */}
            <div className="grid gap-4 sm:grid-cols-2 text-sm text-slate-600">

              <p>
                <span className="font-semibold">জেলা:</span>{" "}
                {member.presentDistrict || "N/A"}
              </p>

              <p>
                <span className="font-semibold">বিশেষত্ব:</span>{" "}
                {member.specialty || "উল্লেখ নেই"}
              </p>

              <p>
                <span className="font-semibold">কর্মক্ষেত্র:</span>{" "}
                {(member.workplaceTypes || []).join(", ") || "N/A"}
              </p>

              <p>
                <span className="font-semibold">সদস্য হওয়ার তারিখ:</span>{" "}
                {member.approvedAt
                  ? new Date(member.approvedAt).toLocaleDateString("bn-BD")
                  : "N/A"}
              </p>
            </div>

            {/* Education */}
            {member.educationEntries?.length ? (
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                  শিক্ষাগত যোগ্যতা
                </h2>

                <ul className="space-y-2 text-sm text-slate-600">
                  {member.educationEntries.map((edu, i) => (
                    <li key={i} className="border rounded-lg p-3">
                      <p className="font-medium">{edu.degree}</p>
                      <p>{edu.institution}</p>
                      <p>
                        {edu.passingYear} - {edu.result}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Notes */}
            {member.notes && (
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                  মন্তব্য
                </h2>
                <p className="text-sm text-slate-600">{member.notes}</p>
              </div>
            )}

            {/* Back Button */}
            <div className="pt-4 flex justify-center">
              <Button href="/members">
                সদস্য তালিকায় ফিরে যান
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}