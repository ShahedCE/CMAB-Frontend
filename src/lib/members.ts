import type { Member } from "@/types/member";

const BASE_URL =
  process.env.BACKEND_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:4000";

export async function getMembers(): Promise<Member[]> {
  const res = await fetch(`${BASE_URL}/members`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch members");
  }

  const result = await res.json();

  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;

  return [];
}

export async function getMemberById(id: string): Promise<Member | null> {
  console.log("Fetching member from:", `${BASE_URL}/members/${id}`);

  const res = await fetch(`${BASE_URL}/members/${id}`, {
    cache: "no-store",
  });

  console.log("Member details status:", res.status);

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error("Failed to fetch member");
  }

  const result = await res.json();

  return result?.data ?? result ?? null;
}