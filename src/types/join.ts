export interface JoinApplicationPayload {
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  roleInterest: string;
  profileImage: File;
}