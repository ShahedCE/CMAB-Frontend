"use client";

import { useMemo, useState } from "react";
import type { Archive } from "@/types/archive";
import { ArchiveCard } from "./archive-card";

type Props = {
  archives: Archive[];
};

export function ArchiveClient({ archives }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [division, setDivision] = useState("");
  const [year, setYear] = useState("");

  const divisions = useMemo(
    () =>
      Array.from(
        new Set(archives.map((item) => item.division).filter(Boolean))
      ) as string[],
    [archives]
  );

  const years = useMemo(
    () =>
      Array.from(new Set(archives.map((item) => item.year).filter(Boolean))) as string[],
    [archives]
  );

  const filteredArchives = useMemo(() => {
    return archives.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = category ? item.category === category : true;
      const matchesDivision = division ? item.division === division : true;
      const matchesYear = year ? item.year === year : true;

      return matchesSearch && matchesCategory && matchesDivision && matchesYear;
    });
  }, [archives, search, category, division, year]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search archive..."
          className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-(--brand-green)"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-(--brand-green)"
        >
          <option value="">All Categories</option>
          <option value="souvenir">Souvenirs / Publications</option>
          <option value="committee">Past Committees</option>
          <option value="photo_album">Division Wise Photo Album</option>
        </select>

        <select
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-(--brand-green)"
        >
          <option value="">All Divisions</option>
          {divisions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-(--brand-green)"
        >
          <option value="">All Years</option>
          {years.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {filteredArchives.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
          No archive item found.
        </div>
      ) : (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredArchives.map((archive) => (
            <ArchiveCard key={archive.id} archive={archive} />
          ))}
        </div>
      )}
    </section>
  );
}