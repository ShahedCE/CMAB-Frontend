export type ArchiveCategory =
  | "souvenir"
  | "committee"
  | "photo_album";

// ⚠️ Backend ArchiveCategory enum value যদি আলাদা হয়,
// এখানে same value বসাবে.

export type ArchiveImage = {
  imageUrl: string;
  caption?: string;
  date?: string;
};

export type ArchiveMember = {
  name: string;
  designation: string;
  photoUrl?: string;
};

export type Archive = {
  id: string;
  title: string;
  category: ArchiveCategory;
  division?: string;
  year?: string;
  date?: string;
  description?: string;
  caption?: string;
  coverImageUrl?: string;
  fileUrl?: string;
  imagesJson?: ArchiveImage[];
  membersJson?: ArchiveMember[];
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ArchiveQuery = {
  search?: string;
  category?: string;
  division?: string;
  year?: string;
};