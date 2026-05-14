export type ExecutiveMember = {
    id: string;
    name: string;
    designation: string;
    phone?: string | null;
    email?: string | null;
    imageUrl?: string | null;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
  
  export type ExecutiveMemberQuery = {
    search?: string;
    isActive?: boolean;
  };