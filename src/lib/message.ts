import type { Message, MessageQuery } from "@/types/message";

const BASE_URL =
  process.env.BACKEND_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:4001";

export async function getMessages(query?: MessageQuery): Promise<Message[]> {
  const params = new URLSearchParams();

  if (query?.search) params.set("search", query.search);

  const res = await fetch(
    `${BASE_URL}/messages${params.toString() ? `?${params.toString()}` : ""}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }

  const result = await res.json();

  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;

  return [];
}

export async function getMessageById(id: string): Promise<Message | null> {
  const res = await fetch(`${BASE_URL}/messages/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error("Failed to fetch message");
  }

  const result = await res.json();

  return result?.data ?? result ?? null;
}