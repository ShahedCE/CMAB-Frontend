import type { Activity } from "@/types/activity";

export async function getActivities(): Promise<Activity[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/activities`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch activities");
  }

  const result = await response.json();

  // 🔥 IMPORTANT: backend returns { data, meta }
  return Array.isArray(result?.data) ? result.data : [];
}

export async function getActivityById(id: string): Promise<Activity | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/activities/${id}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error("Failed to fetch activity");
  }

  const data = await response.json();

  return data ?? null;
}