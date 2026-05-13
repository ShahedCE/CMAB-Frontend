"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Archive } from "@/types/archive";
import { deleteArchive, getAdminArchives } from "@/lib/admin/archive-api";

export default function AdminArchivePage() {
  const [archives, setArchives] = useState<Archive[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadArchives() {
    try {
      setLoading(true);
      const data = await getAdminArchives();
      setArchives(data);
    } catch {
      alert("Failed to load archives");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const ok = confirm("Are you sure you want to delete this archive?");
    if (!ok) return;

    try {
      await deleteArchive(id);
      setArchives((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Failed to delete archive");
    }
  }

  useEffect(() => {
    loadArchives();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black">Archive</h1>
          <p className="text-sm text-black-300">
            Manage CMAB souvenirs, committees and photo albums.
          </p>
        </div>

        <Link
          href="/admin/archive/create"
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          <Plus size={16} />
          Create Archive
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-5 py-4">Title</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Division</th>
              <th className="px-5 py-4">Year</th>
              <th className="px-5 py-4">Published</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="px-5 py-6 text-center" colSpan={6}>
                  Loading...
                </td>
              </tr>
            ) : archives.length === 0 ? (
              <tr>
                <td className="px-5 py-6 text-center" colSpan={6}>
                  No archive found.
                </td>
              </tr>
            ) : (
              archives.map((archive) => (
                <tr key={archive.id} className="border-t">
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {archive.title}
                  </td>
                  <td className="px-5 py-4 capitalize text-slate-600">
                    {archive.category?.replaceAll("_", " ")}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {archive.division || "-"}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {archive.year || "-"}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        archive.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {archive.isPublished ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/archive/${archive.id}`}
                        className="rounded-lg bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        onClick={() => handleDelete(archive.id)}
                        className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}