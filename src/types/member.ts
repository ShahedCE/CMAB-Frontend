export type MemberCategory =
  | "all"
  | "general"
  | "light"
  | "irregular";

export type Member = {
 
  id: string;
  fullNameBn: string;
  fullNameEn: string;
  membershipType: Exclude<MemberCategory, "all">;

  specialty?: string | null;
  presentDistrict?: string | null;
  permanentDistrict?: string | null;

  profileImageUrl?: string | null;

  workplaceTypes?: string[];
  educationEntries?: {
    degree?: string;
    institution?: string;
    passingYear?: string;
    result?: string;
  }[];
  notes: string;

  approvedAt?: string | null;
  createdAt: string;
};