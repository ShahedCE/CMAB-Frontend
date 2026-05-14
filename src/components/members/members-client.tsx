"use client";

import { useMemo, useState } from "react";
import { MemberCard } from "@/components/members/member-card";
import { FilterBar } from "@/components/members/filter-bar";
// Removed SearchBar import
import type { Member, MemberCategory } from "@/types/member";

export function MembersClient({ members }: { members: Member[] }) {
  const [activeFilter, setActiveFilter] =
    useState<MemberCategory>("all");
  // Removed searchQuery state

  const filteredMembers = useMemo(() => {
    // No need for normalizedQuery
    return members.filter((member) => {
      const matchesCategory =
        activeFilter === "all" || member.membershipType === activeFilter;

      // No search, so always true
      return matchesCategory;
    });
  }, [activeFilter, members]);
  const totalMembers = members.length;

  const toBanglaNumber = (num: number) => {
    return num
      .toString()
      .replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-2 sm:px-6 lg:px-8 m-4">
      <div className="mt-2 w-full rounded-4xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur p-3 sm:p-8 lg:p-10">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          {/* Removed <SearchBar /> */}

          <div className="text-sm font-medium text-slate-500 ml-1 sm:ml-4">
            <span className="font-semibold text-slate-800">
              {toBanglaNumber(filteredMembers.length)}
            </span>{" "}
            জন সদস্য নির্বাচন করা হয়েছে{" "}
            <span className="font-semibold text-slate-800">
              {toBanglaNumber(totalMembers)}
            </span>{" "}
            জন সদস্যের মধ্যে
          </div>
        </div>

        <div className="mt-5">
          <FilterBar
            activeFilter={activeFilter}
            onChange={setActiveFilter}
          />
        </div>
      </div>

      <section className="mt-8 pb-12">
        {filteredMembers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="rounded-4xl border border-dashed border-slate-300 bg-white p-6 sm:p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              কোনো সদস্য পাওয়া যায়নি
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              অন্য ক্যাটাগরি সিলেক্ট করুন অথবা ভিন্ন নামে সার্চ করুন।
            </p>
          </div>
        )}
      </section>
    </div>
  );
}