"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { ExecutiveMember } from "@/types/executive-member";
import {
  deleteExecutiveMember,
  getAdminExecutiveMembers,
} from "@/lib/admin/executive-members-api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";

function getImageSrc(imageUrl?: string | null) {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${API_BASE_URL}${imageUrl}`;
}

export default function AdminExecutiveMembersPage() {
  const [members, setMembers] = useState<ExecutiveMember[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadMembers() {
    try {
      setLoading(true);
      const data = await getAdminExecutiveMembers();
      setMembers(data);
    } catch {
      alert("Failed to load executive members");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const ok = confirm("Are you sure you want to delete this executive member?");
    if (!ok) return;

    try {
      await deleteExecutiveMember(id);
      setMembers((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Failed to delete executive member");
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    const keyword = search.toLowerCase();

    return members.filter((item) => {
      return (
        item.name.toLowerCase().includes(keyword) ||
        item.designation.toLowerCase().includes(keyword) ||
        item.email?.toLowerCase().includes(keyword) ||
        item.phone?.toLowerCase().includes(keyword)
      );
    });
  }, [members, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black">Executive Members</h1>
          <p className="text-sm text-black-300">
            Manage CMAB executive committee members.
          </p>
        </div>

        <Link
          href="/admin/executive-members/create"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-green)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--brand-green-dark)]"
        >
          <Plus size={16} />
          Create Member
        </Link>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search executive members..."
          className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-900 outline-none focus:border-[var(--brand-green)]"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-5 py-4">Photo</th>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Designation</th>
              <th className="px-5 py-4">Contact</th>
              <th className="px-5 py-4">Status</th>
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
            ) : filteredMembers.length === 0 ? (
              <tr>
                <td className="px-5 py-6 text-center" colSpan={6}>
                  No executive member found.
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => {
                const imageSrc = getImageSrc(member.imageUrl);

                return (
                  <tr key={member.id} className="border-t">
                    <td className="px-5 py-4">
                      {imageSrc ? (
                        <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-slate-100">
                          <Image
                            src={imageSrc}
                            alt={member.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-500">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {member.name}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {member.designation}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      <div>{member.phone || "N/A"}</div>
                      <div>{member.email || "N/A"}</div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          member.isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {member.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/executive-members/${member.id}`}
                          className="rounded-lg bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"
                        >
                          <Pencil size={16} />
                        </Link>

                        <button
                          onClick={() => handleDelete(member.id)}
                          className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}