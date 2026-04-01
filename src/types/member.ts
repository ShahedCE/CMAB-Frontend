export type MemberCategory =
  | "all"
  | "general"
  | "light"
  | "irregular";

export interface Member {
  id: number;
  name: string;
  role: string;
  category: Exclude<MemberCategory, "all">;
  image: string;
  description: string;
}