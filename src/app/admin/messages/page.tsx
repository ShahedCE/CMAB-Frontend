"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Message } from "@/types/message";
import {
  deleteMessage,
  getAdminMessages,
} from "@/lib/admin/messages-api";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadMessages() {
    try {
      setLoading(true);
      const data = await getAdminMessages();
      setMessages(data);
    } catch {
      alert("Failed to load messages");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const ok = confirm("Are you sure you want to delete this message?");
    if (!ok) return;

    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Failed to delete message");
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  const filteredMessages = useMemo(() => {
    const keyword = search.toLowerCase();

    return messages.filter((item) => {
      return (
        item.organizationName.toLowerCase().includes(keyword) ||
        item.fatherName.toLowerCase().includes(keyword) ||
        item.message.toLowerCase().includes(keyword)
      );
    });
  }, [messages, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black">Messages</h1>
          <p className="text-sm text-black-300">
            Manage public messages shown on the CMAB website.
          </p>
        </div>

        <Link
          href="/admin/messages/create"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-green)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--brand-green-dark)]"
        >
          <Plus size={16} />
          Create Message
        </Link>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search messages..."
          className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-900 outline-none focus:border-[var(--brand-green)]"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-5 py-4">Organization</th>
              <th className="px-5 py-4">Father Name</th>
              <th className="px-5 py-4">Message</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="px-5 py-6 text-center" colSpan={4}>
                  Loading...
                </td>
              </tr>
            ) : filteredMessages.length === 0 ? (
              <tr>
                <td className="px-5 py-6 text-center" colSpan={4}>
                  No message found.
                </td>
              </tr>
            ) : (
              filteredMessages.map((message) => (
                <tr key={message.id} className="border-t">
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {message.organizationName}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {message.fatherName}
                  </td>
                  <td className="max-w-md px-5 py-4 text-slate-600">
                    <p className="line-clamp-2">{message.message}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/messages/${message.id}`}
                        className="rounded-lg bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        onClick={() => handleDelete(message.id)}
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