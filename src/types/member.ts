export type MemberCategory =
  | "all"
  | "general"
  | "light"
  | "irregular";

export type Member = {
  id: number;
  slug: string;
  name: string;
  image: string;
  memberType: MemberCategory;
  profession: string;
  organization: string;
  district: string;
  shortBio: string;
  fullBio: string;
  educationSummary: string;
  expertise: string[];
  memberSince: string;
  isPublished: boolean;
};
