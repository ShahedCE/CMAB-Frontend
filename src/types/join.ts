export interface JoinApplicationEducation {
  degreeName: string;
  instituteName: string;
  universityName: string;
  passingYear: string;
}

export interface JoinApplicationPayload {
  fullNameBn: string;
  fullNameEn: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  nationalId: string;
  medicalRegNo: string;
  membershipType: string;
  email: string;
  mobile: string;
  phone?: string;
  presentVillage: string;
  presentPost: string;
  presentThana: string;
  presentDistrict: string;
  permanentVillage: string;
  permanentPost: string;
  permanentThana: string;
  permanentDistrict: string;
  specialty?: string;
  educationEntries: JoinApplicationEducation[];
  entryFee: number;
  annualFee: number;
  lifetimeFee: number;
  workplaceTypes: string[];
  declarationAccepted: boolean;
  notes: string;
  profileImage: File;
}