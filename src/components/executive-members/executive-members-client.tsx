import type { ExecutiveMember } from "@/types/executive-member";
import { ExecutiveMemberList } from "./executive-member-list";

type Props = {
  executiveMembers: ExecutiveMember[];
};

export function ExecutiveMembersClient({
  executiveMembers,
}: Props) {
  if (!executiveMembers.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--brand-green-dark)]">
          CMAB Leadership
        </p>

        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Executive Members List
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600">
          Meet the executive leadership members of Christian Medical
          Association Bangladesh.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
  
  {/* Table Heading */}
    <div className="grid grid-cols-[70px_1fr_140px] items-center bg-emerald-700 px-4 py-3 text-sm font-semibold text-white">
        <div>SL</div>

        <div>
        Name / Designation
        </div>

        <div className="text-right">
        Phone / Mobile
        </div>
    </div>

    {executiveMembers.map((member, index) => (
        <ExecutiveMemberList
        key={member.id}
        member={member}
        index={index}
        />
    ))}
    </div>
    </section>
  );
}