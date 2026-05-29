import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const educationEntrySchema = z.object({
  degree: z.string().min(1, "Degree/Exam name is required"),
  institution: z.string().min(1, "Institution name is required"),
  result: z.string().min(1, "Result/University name is required"),
  passingYear: z
    .string()
    .min(1, "Year of passing is required")
    .regex(/^[1-9]{1}[0-9]{3}$/, "Please provide a valid passing year"),
});

export const joinApplicationSchema = z.object({
  fullNameBn: z
    .string()
    .min(1, "Bangla name is required")
    .min(3, "Bangla name must be at least 3 characters"),
  //fullNameEn: z,
  fatherName: z
    .string()
    .min(1, "Father's name is required")
    .min(3, "Father's name must be at least 3 characters"),
  motherName: z
    .string()
    .min(1, "Mother's name is required")
    .min(3, "Mother's name must be at least 3 characters"),
    
  dateOfBirth: z.string().min(10, "Date of birth is required"),
  nationalId: z
    .string()
    .min(1, "National ID number is required")
    .regex(/^\d{4,}-?\d*-?\d*$/, "Please provide a valid National ID (numbers and dashes only)"),
    
  medicalRegNo: z
    .string()
    .min(1, "Medical registration number is required")
    .regex(/^[0-9০-৯-]+$/, "Only numbers are allowed")
    .min(3, "Medical registration number must be at least 3 characters"),
    
  membershipType: z.string().min(1, "Please select the membership type"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please provide a valid email address"
    )
    .min(1, "Email is required")
    .email("Please provide a valid email address"),
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .min(10, "Mobile number is too short")
    .regex(/^[0-9০-৯-]+$/, "Only numbers (Bengali or English) and dashes (-) are allowed"),
    
  phone: z.string()
    .min(1, "Phone number is required")
    .min(6, "Phone number is too short")
    .regex(/^[0-9০-৯-]+$/, "Only numbers (Bengali or English) and dashes (-) are allowed"),

  presentVillage: z.string().min(1, "Present address (village) is required"),
  presentPost: z.string().min(1, "Present address (post) is required"),
  presentThana: z.string().min(1, "Present address (thana) is required"),
  presentDistrict: z.string().min(1, "Present address (district) is required"),
  permanentVillage: z.string().min(1, "Permanent address (village) is required"),
  permanentPost: z.string().min(1, "Permanent address (post) is required"),
  permanentThana: z.string().min(1, "Permanent address (thana) is required"),
  permanentDistrict: z.string().min(1, "Permanent address (district) is required"),
  specialty: z.string().optional(),
  educationEntries: z
    .array(educationEntrySchema)
    .min(1, "Please add at least one educational entry"),
  entryFee: z.coerce
    .number({ message: "Entry fee is required" })
    .min(0, "Entry fee must be 0 or greater"),
  annualFee: z.coerce
    .number({ message: "Annual fee is required" })
    .min(0, "Annual fee must be 0 or greater"),
  lifetimeFee: z.coerce
    .number({ message: "Lifetime membership fee is required" })
    .min(0, "Lifetime fee must be 0 or greater"),
  workplaceTypes: z
    .array(z.string())
    .min(1, "Select at least one workplace (employment) type"),
  declarationAccepted: z
    .boolean()
    .refine((value) => value, "You must accept the declaration"),
  notes: z
    .string()
    .min(1, "Please provide some information about the application")
    .min(10, "Please write at least 10 characters"),
  profileImage: z
    .instanceof(File, { message: "Profile image is required" })
    .refine((file) => file.size > 0, "Profile image is required")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "Image size must be less than 5MB",
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only JPG, PNG, or WEBP images are accepted",
    ),
});

export type JoinApplicationFormValues = z.input<typeof joinApplicationSchema>;