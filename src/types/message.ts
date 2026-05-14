export type Message = {
  id: string;
  organizationName: string;
  fatherName: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
};

export type MessageQuery = {
  search?: string;
};