"use client";

import { useEffect, useMemo, useState } from "react";
import {
  deleteMember,
  getMembers,
  type MemberItem,
} from "@/lib/admin/dashboard-api";
import { formatUtcDate } from "@/lib/admin/date";
import { useRouter } from "next/navigation";

function extractArray<T>(response: any): T[] {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.results)) return response.results;
  return [];
}

const membershipTypeLabels: Record<string, string> = {
  general: "সাধারণ সদস্য",
  light: "লাইট সদস্য",
  irregular: "অনিয়মিত সদস্য",
};

export default function MembersPage() {
  const router = useRouter();

  const [items, setItems] = useState<MemberItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadMembers = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getMembers({ page: 1, limit: 100 });
      setItems(extractArray<MemberItem>(data));
    } catch (err) {
      console.error(err);
      setError("Failed to load members.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !query ||
        [
          item.fullNameBn,
          item.fullNameEn,
          item.email,
          item.mobile,
          item.medicalRegNo,
          item.presentDistrict,
          item.permanentDistrict,
          item.specialty,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));

      const matchesType =
        typeFilter === "all" || item.membershipType === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [items, searchQuery, typeFilter]);

  const confirmDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    setMessage("");
    setError("");

    try {
      await deleteMember(deleteId);
      setItems((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
      setMessage("Member deleted successfully.");
    } catch (err) {
      console.error(err);
      setError("Member delete failed.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Members</h1>
          <p className="text-sm text-slate-500">
            Search and manage approved members.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/admin/members/add-member")}
          className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Add Member
        </button>
      </div>

      {message ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
          {message}
        </p>
      ) : null}

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম, ইমেইল, মোবাইল, BMDC, জেলা দিয়ে খুঁজুন"
            className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100"
          >
            <option value="all">সব ধরন</option>
            <option value="general">সাধারণ সদস্য</option>
            <option value="light">লাইট সদস্য</option>
            <option value="irregular">অনিয়মিত সদস্য</option>
          </select>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Showing {filteredItems.length} of {items.length} members.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Type
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Email
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Mobile
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Joined
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {loading ? (
              <tr>
                <td className="px-4 py-4 text-slate-500" colSpan={6}>
                  Loading...
                </td>
              </tr>
            ) : filteredItems.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-slate-500" colSpan={6}>
                  No approved members found.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">
                      {item.fullNameBn || item.fullNameEn}
                    </p>
                    {item.fullNameEn ? (
                      <p className="text-xs text-slate-500">
                        {item.fullNameEn}
                      </p>
                    ) : null}
                  </td>

                  <td className="px-4 py-3">
                    {membershipTypeLabels[item.membershipType] ||
                      item.membershipType ||
                      "—"}
                  </td>

                  <td className="px-4 py-3">{item.email}</td>

                  <td className="px-4 py-3">{item.mobile}</td>

                  <td className="px-4 py-3">
                    {formatUtcDate(item.createdAt)}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          router.push(`/admin/members/edit/${item.id}`)
                        }
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteId(item.id)}
                        className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {deleteId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">Delete Member</h2>

            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to delete this member?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-60"
              >
                No
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}