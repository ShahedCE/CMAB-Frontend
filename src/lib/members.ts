import { Member } from "@/types/member";
import { membersData } from "@/data/members";

export async function getMembers(): Promise<Member[]> {
  // Later replacement example:
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, {
  //   cache: "no-store",
  // });
  // if (!response.ok) throw new Error("Failed to fetch members");
  // return response.json();

  return Promise.resolve(membersData);
}

export async function getActivityById(id: string): Promise<Member | null> {
  // Later replacement example:
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/${id}`, {
  //   cache: "no-store",
  // });
  // if (response.status === 404) return null;
  // if (!response.ok) throw new Error("Failed to fetch member");
  // return response.json();

  const member = membersData.find((item) => item.id === parseInt(id));
  return Promise.resolve(member ?? null);
}