"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getJoinRequests, approveJoinRequest, rejectJoinRequest, type JoinRequestItem } from "@/lib/admin/dashboard-api";
import { formatUtcDate } from "@/lib/admin/date";

const filters = ["all", "pending", "approved", "rejected"] as const;

// Helper to ensure we always have a valid items array
function extractArray<T>(response: any): T[] {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.results)) return response.results;
  return [];
}

// Simple Details Button component WITH updated className for button size
function DetailsButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700"
    >
      Details
    </Link>
  );
}

export default function JoinRequestsPage() {
  const [status, setStatus] = useState<(typeof filters)[number]>("pending");
  const [items, setItems] = useState<JoinRequestItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const params = status === "all" ? undefined : { status };
      const data = await getJoinRequests(params);
      setItems(extractArray<JoinRequestItem>(data));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const onAction = async (id: string, action: "approved" | "rejected") => {
    setActionId(id);
    setMessage("");
    setError("");
    try {
      if (action === "approved") {
        await approveJoinRequest(id);
      } else {
        await rejectJoinRequest(id);
      }
      setMessage(`Request ${action} successfully.`);
      await loadData();
    } catch {
      setError("Action failed. Please try again.");
    } finally {
      setActionId("");
    }
  };

  // Defensive: Ensure items is always an array for .map
  const safeItems = Array.isArray(items) ? items : [];

  // Helper to decide actions based on filter and item status
  function renderActions(item: JoinRequestItem) {
    // ALL TAB
    if (status === "all") {
      // show as that status's button only, no approve/reject actions
      if (item.status === "pending") {
        return (
          <>
            <DetailsButton href={`/admin/join-requests/${item.id}`} />
            <span className="rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700">
              Pending
            </span>
          </>
        );
      }
      if (item.status === "approved") {
        return (
          <>
            <DetailsButton href={`/admin/join-requests/${item.id}`} />
            <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              Approved
            </span>
          </>
        );
      }
      if (item.status === "rejected") {
        return (
          <>
            <DetailsButton href={`/admin/join-requests/${item.id}`} />
            <span className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
              Rejected
            </span>
          </>
        );
      }
      // fallback
      return null;
    }

    // PENDING TAB
    if (status === "pending") {
      // Only show details for pending (approve/reject buttons are removed)
      return (
        <>
          <DetailsButton href={`/admin/join-requests/${item.id}`} />
        </>
      );
    }

    // APPROVED TAB -- show only details and Approved badge
    if (status === "approved") {
      return (
        <>
          <DetailsButton href={`/admin/join-requests/${item.id}`} />
          <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            Approved
          </span>
        </>
      );
    }

    // REJECTED TAB -- show only details and Rejected badge
    if (status === "rejected") {
      return (
        <>
          <DetailsButton href={`/admin/join-requests/${item.id}`} />
          <span className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
            Rejected
          </span>
        </>
      );
    }

    return null;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-slate-900">Join Requests</h1>
        {/* Custom filter pill buttons to match original effect */}
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(item)}
              className={`capitalize rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150
                ${
                  status === item
                    ? "bg-green-700 text-white shadow-none"
                    : "border border-slate-200 text-slate-700 bg-white hover:bg-slate-50"
                }
              `}
              style={{ minWidth: 56 }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {message ? <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p> : null}

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Mobile</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Created</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {loading ? (
              <tr>
                <td className="px-4 py-4 text-slate-500" colSpan={6}>
                  Loading...
                </td>
              </tr>
            ) : safeItems.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-slate-500" colSpan={6}>
                  No join requests found.
                </td>
              </tr>
            ) : (
              safeItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">{item.fullNameBn}</td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3">{item.mobile}</td>
                  <td className="px-4 py-3 capitalize">{item.status}</td>
                  <td className="px-4 py-3">{formatUtcDate(item.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {renderActions(item)}
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
