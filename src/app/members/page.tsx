"use client";

import { useEffect, useMemo, useState } from "react";
import { MemberCard } from "@/components/members/member-card";
import { FilterBar } from "@/components/members/filter-bar";
import { SearchBar } from "@/components/members/search-bar";
import type { Member, MemberCategory } from "@/types/member";
import { PageHero } from "@/components/ui/page-hero";
import { getMembers } from "@/lib/members";

export default function MembersPage() {
  const [membersData, setMembersData] = useState<Member[]>([]);
  const [activeFilter, setActiveFilter] = useState<MemberCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;

    getMembers().then((data) => {
      if (isMounted) {
        setMembersData(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMembers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return membersData.filter((member) => {
      const matchesCategory =
        activeFilter === "all" || member.memberType === activeFilter;

      const matchesSearch = member.name
        .toLowerCase()
        .includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery, membersData]);

  const totalMembers = membersData.length;

  const toBanglaNumber = (num: number) => {
    return num.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)]">
      <PageHero
        icon="users"
        title="আমাদের সদস্যদের পরিচিতি"
        description="আমাদের কমিউনিটির সদস্যদের সম্পর্কে জানুন। ক্যাটাগরি ফিল্টার এবং সার্চ ব্যবহার করে সহজেই সদস্য খুঁজে নিতে পারবেন।"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-2 w-full rounded-4xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur sm:p-8 lg:p-10">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <div className="text-sm font-medium text-slate-500">
              <span className="font-semibold text-slate-800">
                {toBanglaNumber(filteredMembers.length)}
              </span>{" "}
              জনকে পাওয়া গেছে{" "}
              <span className="font-semibold text-slate-800">
                {toBanglaNumber(totalMembers)}
              </span>{" "}
              জনের মধ্যে
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
            <div className="rounded-4xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </div>

              <h2 className="mt-4 text-xl font-semibold text-slate-900">
                কোনো সদস্য পাওয়া যায়নি
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                অন্য ক্যাটাগরি সিলেক্ট করুন অথবা ভিন্ন নামে সার্চ করে দেখুন।
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}