"use client";

import { useMemo, useState } from "react";
import { MemberCard } from "@/components/members/member-card";
import { FilterBar } from "@/components/members/filter-bar";
import { SearchBar } from "@/components/members/search-bar";
import type {  MemberCategory } from "@/types/member";
import { PageHero } from "@/components/ui/page-hero";
import { getMembers } from "@/lib/members";

const membersData= await getMembers(); //fetching members data from lib(from data) at the top
//  level of the component to avoid multiple fetches on re-renders. This is a temporary solution until we implement proper data fetching with caching and state management.


export default function MembersPage() {
  const [activeFilter, setActiveFilter] = useState<MemberCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return membersData.filter((member) => {
      const matchesCategory =
        activeFilter === "all" || member.category === activeFilter;

      const matchesSearch = member.name
        .toLowerCase()
        .includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const totalMembers = membersData.length;

  const toBanglaNumber = (num: number) => {
  return num.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);
};

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)] ">
      
         <PageHero
         icon="users"
          title="আমাদের সদস্যদের পরিচিতি"
          description="আমাদের কমিউনিটির সদস্যদের সম্পর্কে জানুন। ক্যাটাগরি ফিল্টার এবং সার্চ ব্যবহার করে সহজেই সদস্য খুঁজে নিতে পারবেন।"
          
        />
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="w-full rounded-4xl mt-2 border border-slate-200 bg-white/90 shadow-sm backdrop-blur sm:p-8 lg:p-10"> 
          <div className=" grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <div className="text-sm font-medium text-slate-500">
              <span className="font-semibold text-slate-800">
                {toBanglaNumber(filteredMembers.length)}
              </span> জনকে পাওয়া গেছে{" "}
              
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
       

        <section className="mt-8">
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
                No members found
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Try changing the selected category or search with a different
                member name.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}