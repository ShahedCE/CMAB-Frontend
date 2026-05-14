import Image from "next/image";
import type { ExecutiveMember } from "@/types/executive-member";
import { getFileUrl } from "@/lib/executive-members";

type Props = {
  member: ExecutiveMember;
  index: number;
};

export function ExecutiveMemberList({ member, index }: Props) {
  const image = getFileUrl(member.imageUrl);

  return (
    <article className="grid grid-cols-[70px_1fr_140px] items-center gap-4 border-b border-slate-100 px-4 py-3 transition hover:bg-emerald-50/40">
      {/* Serial + Image */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-slate-500">
          {index + 1}.
        </span>

        <div className="relative h-11 w-11 overflow-hidden rounded-full border border-emerald-100 bg-slate-100">
          {image ? (
            <Image
              src={image}
              alt={member.name}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[9px] text-slate-400">
              N/A
            </div>
          )}
        </div>
      </div>

      {/* Name + Designation */}
      <div className="min-w-0">
        <h3 className="truncate text-sm font-bold text-slate-900 md:text-base">
          {member.name}
        </h3>

        <p className="truncate text-xs font-medium text-[var(--brand-green-dark)] md:text-sm">
          {member.designation}
        </p>
      </div>

      {/* Phone */}
      <div className="text-right text-xs text-slate-600 md:text-sm">
        {member.phone || "-"}
      </div>
    </article>
  );
}