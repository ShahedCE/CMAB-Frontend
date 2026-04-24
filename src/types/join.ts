export type JoinFormValues = {
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

  educationEntries: {
    degree: string;
    institution: string;
    passingYear: string;
    result: string;
  }[];

  workplaceTypes: string[];

  entryFee: string;
  annualFee: string;
  lifetimeFee: string;

  declarationAccepted: boolean;
  notes?: string;

  profileImage?: File; // 🔥 important
};