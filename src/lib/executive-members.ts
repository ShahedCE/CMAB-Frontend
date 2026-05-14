import type { ExecutiveMember } from "@/types/executive-member";

const BASE_URL =
  process.env.BACKEND_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:4001";

export function getFileUrl(path?: string | null) {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  return `${BASE_URL}${path}`;
}

export async function getExecutiveMembers(): Promise<
  ExecutiveMember[]
> {
  const res = await fetch(`${BASE_URL}/executive-members`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch executive members");
  }

  const result = await res.json();

  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;

  return [];
}