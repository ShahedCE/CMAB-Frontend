"use client";

import { useMemo, useState } from "react";
import type { Message } from "@/types/message";
import { MessageCard } from "./message-card";

type Props = {
  messages: Message[];
};

export function MessagesClient({ messages }: Props) {
  const [search, setSearch] = useState("");

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
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search messages..."
          className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-[var(--brand-green)]"
        />
      </div>

      {filteredMessages.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
          No messages found.
        </div>
      ) : (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredMessages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      )}
    </section>
  );
}