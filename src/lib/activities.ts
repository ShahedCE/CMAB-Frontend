import { activitiesData } from "@/data/activities";
import type { Activity } from "@/types/activity";

export async function getActivities(): Promise<Activity[]> {
  // Later replacement example:
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities`, {
  //   cache: "no-store",
  // });
  // if (!response.ok) throw new Error("Failed to fetch activities");
  // return response.json();

  return Promise.resolve(activitiesData);
}

export async function getActivityById(id: string): Promise<Activity | null> {
  // Later replacement example:
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities/${id}`, {
  //   cache: "no-store",
  // });
  // if (response.status === 404) return null;
  // if (!response.ok) throw new Error("Failed to fetch activity");
  // return response.json();

  const activity = activitiesData.find((item) => item.id === id);
  return Promise.resolve(activity ?? null);
}