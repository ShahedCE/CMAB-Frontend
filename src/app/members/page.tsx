"use client";

import { useMemo, useState } from "react";
import { MemberCard } from "@/components/members/member-card";
import { FilterBar } from "@/components/members/filter-bar";
import { SearchBar } from "@/components/members/search-bar";
import type { Member, MemberCategory } from "@/types/member";

const membersData: Member[] = [
  {
    id: 1,
    name: "Dr. Samuel Rahman",
    role: "Senior Physician",
    category: "general",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80",
    description:
      "Dedicated to community healthcare and long-term volunteer medical support initiatives.",
  },
  {
    id: 2,
    name: "Dr. Miriam D Costa",
    role: "Community Health Coordinator",
    category: "general",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80",
    description:
      "Passionate about public health awareness, outreach programs, and collaborative care models.",
  },
  {
    id: 3,
    name: "Dr. Joseph Baroi",
    role: "Medical Officer",
    category: "light",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80",
    description:
      "Supports periodic association programs and contributes to training and event coordination.",
  },
  {
    id: 4,
    name: "Dr. Ruth Gomes",
    role: "Volunteer Consultant",
    category: "light",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80",
    description:
      "Brings experience in clinical mentorship and participates in selected member initiatives.",
  },
  {
    id: 5,
    name: "Dr. Daniel Sarker",
    role: "Former Executive Member",
    category: "irregular",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=900&q=80",
    description:
      "Previously active in leadership and remains connected with the community when possible.",
  },
  {
    id: 6,
    name: "Dr. Sarah Mondol",
    role: "Healthcare Advocate",
    category: "irregular",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=900&q=80",
    description:
      "Contributes occasionally to social health campaigns and association support activities.",
  },
  {
    id: 7,
    name: "Dr. Philip Rozario",
    role: "General Surgeon",
    category: "general",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80",
    description:
      "Focused on patient-centered service and medical leadership in faith-based community networks.",
  },
  {
    id: 8,
    name: "Dr. Esther Khasia",
    role: "Youth Program Mentor",
    category: "light",
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=900&q=80",
    description:
      "Engages with youth development, mentoring activities, and occasional member support events.",
  },
  {
    id: 9,
    name: "Dr. Andrew Bishwas",
    role: "Associate Member",
    category: "irregular",
    image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=900&q=80",
    description:
      "Maintains a limited but meaningful connection with the association and its larger mission.",
  },
];

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

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)] py-10 sm:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-(--brand-green-soft) px-3 py-1 text-xs font-semibold tracking-[0.16em] text-(--brand-green-dark)">
              COMMUNITY MEMBERS
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Meet Our Members
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Explore the people who make up our community. Use the category
              filters and real-time search to quickly find members by name.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <div className="text-sm font-medium text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredMembers.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {totalMembers}
              </span>{" "}
              members
            </div>
          </div>

          <div className="mt-5">
            <FilterBar
              activeFilter={activeFilter}
              onChange={setActiveFilter}
            />
          </div>
        </section>

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