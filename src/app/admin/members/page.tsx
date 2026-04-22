"use client";

import { useEffect, useState } from "react";
import {
  createMember,
  deleteMember,
  getMembers,
  // toggleMemberStatus,
  updateMember,
  type MemberItem,
  type MemberPayload,
} from "@/lib/admin/dashboard-api";
import { formatUtcDate } from "@/lib/admin/date";
import { useRouter } from "next/navigation";

// Defensive helper to always return an array from the API response
function extractArray<T>(response: any): T[] {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.results)) return response.results;
  return [];
}

const emptyForm: MemberPayload = {
  fullNameBn: "",
  email: "",
  mobile: "",
  status: "active",
};

export default function MembersPage() {
  const router = useRouter();
  const [items, setItems] = useState<MemberItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const route= useRouter();

  const loadMembers = async () => {
    setLoading(true);
    try {
      const data = await getMembers();
      // Use extractArray to guarantee items is an array
      setItems(extractArray<MemberItem>(data));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  

  // Convert plain MemberPayload to FormData for API
  const toFormData = (data: MemberPayload) => {
    const fd = new FormData();
    fd.append("fullNameBn", data.fullNameBn);
    fd.append("email", data.email);
    fd.append("mobile", data.mobile);
    fd.append("status", data.status);
    // Optionally handle image upload later
    return fd;
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
  
    setIsDeleting(true);
    try {
      await deleteMember(deleteId);
      setItems((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSaving(true);
    
  };

  const onDelete = async (id: string) => {
    setMessage("");
    setError("");
    try {
      await deleteMember(id);
      setMessage("Member deleted successfully.");
      await loadMembers();
    } catch {
      setError("Member delete failed.");
    }
  };

  // As toggleMemberStatus is missing from the API, implement status toggle using updateMember
  const onToggleStatus = async (item: MemberItem) => {
    setMessage("");
    setError("");
    const nextStatus = item.status === "active" ? "inactive" : "active";
    try {
      // Reuse member payload but change status
      const payload: MemberPayload = {
        fullNameBn: item.fullNameBn,
        email: item.email,
        mobile: item.mobile,
        status: nextStatus,
      };
      await updateMember(item.id, toFormData(payload));
      setMessage(`Member marked as ${nextStatus}.`);
      await loadMembers();
    } catch {
      setError("Status update failed.");
    }
  };

  // Defensive: Ensure items is always an array for .map
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Members</h1>
        {/* Go to /admin/members/add_member page on button click */}
        <button
          type="button"
          onClick={() => router.push("/admin/members/add-member")}
          className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Add Member
        </button>
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
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Joined</th>
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
                  No approved members found.
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
                    <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => router.push(`/admin/members/edit/${item.id}`)}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </button>
                      <button
                        type="button"
                        className="rounded-lg bg-green-100 border border-slate-200 px-3 py-1.5 text-xs font-semibold"
                      >
                        {item.status === "active" ? "Inactive" : "Active"}
                      </button>
                 
                      <button
                        type="button"
                        onClick={() => setDeleteId(item.id)}
                        className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-700"
                      >
                        Delete
                      </button>
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
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
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
