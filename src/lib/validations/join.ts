import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const educationEntrySchema = z.object({
  degreeName: z.string().min(1, "ডিগ্রি/পরীক্ষার নাম আবশ্যক"),
  instituteName: z.string().min(1, "শিক্ষা প্রতিষ্ঠানের নাম আবশ্যক"),
  universityName: z.string().min(1, "বিশ্ববিদ্যালয়ের নাম আবশ্যক"),
  passingYear: z.string().min(1, "পাশের বছর আবশ্যক"),
});

export const joinApplicationSchema = z.object({
  fullNameBn: z
    .string()
    .min(1, "বাংলা নাম আবশ্যক")
    .min(3, "বাংলা নাম কমপক্ষে ৩ অক্ষর হতে হবে"),
  fullNameEn: z
    .string()
    .min(1, "ইংরেজি নাম আবশ্যক")
    .min(3, "ইংরেজি নাম কমপক্ষে ৩ অক্ষর হতে হবে"),
  fatherName: z
    .string()
    .min(1, "পিতার নাম আবশ্যক")
    .min(3, "পিতার নাম কমপক্ষে ৩ অক্ষর হতে হবে"),
  motherName: z
    .string()
    .min(1, "মাতার নাম আবশ্যক")
    .min(3, "মাতার নাম কমপক্ষে ৩ অক্ষর হতে হবে"),
    
  dateOfBirth: z.string().min(10, "জন্ম তারিখ আবশ্যক"),
  nationalId: z
    .string()
    .min(1, "জাতীয় পরিচয়পত্র নম্বর আবশ্যক")
    .regex(/^\d{4,}-?\d*-?\d*$/, "সঠিক জাতীয় পরিচয়পত্র নম্বর দিন (শুধুমাত্র সংখ্যা ও ড্যাশ - থাকতে পারবে)"),
    
  medicalRegNo: z
    .string()
    .min(1, "চিকিৎসা নিবন্ধন নম্বর আবশ্যক")
    .regex(/^[0-9০-৯-]+$/, "শুধুমাত্র সংখ্যা ব্যবহার করতে পারবেন")
    .min(3, "চিকিৎসা নিবন্ধন নম্বর অন্তত ৩ অক্ষর হতে হবে")
,
    
  membershipType: z.string().min(1, "সদস্যের ধরন নির্বাচন করুন"),
  email: z
    .string()
    .min(1, "ইমেইল আবশ্যক")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "সঠিক ইমেইল ঠিকানা লিখুন"
    )
    .min(1, "ইমেইল আবশ্যক")
    .email("সঠিক ইমেইল ঠিকানা লিখুন"),
  mobile: z
    .string()
    .min(1, "মোবাইল নম্বর আবশ্যক")
    .min(10, "মোবাইল নম্বর খুব ছোট")
    .regex(/^[0-9০-৯-]+$/, "শুধুমাত্র সংখ্যা (বাংলা বা ইংরেজি) ও ড্যাশ (-) ব্যবহার করতে পারবেন"),
    
  phone: z.string()
    .min(1, "ফোন নম্বর আবশ্যক")
    .min(6, "ফোন নম্বর খুব ছোট")
    .regex(/^[0-9০-৯-]+$/, "শুধুমাত্র সংখ্যা (বাংলা বা ইংরেজি) ও ড্যাশ (-) ব্যবহার করতে পারবেন"),

  presentVillage: z.string().min(1, "বর্তমান ঠিকানার গ্রাম আবশ্যক"),
  presentPost: z.string().min(1, "বর্তমান ঠিকানার পোস্ট আবশ্যক"),
  presentThana: z.string().min(1, "বর্তমান ঠিকানার থানা আবশ্যক"),
  presentDistrict: z.string().min(1, "বর্তমান ঠিকানার জেলা আবশ্যক"),
  permanentVillage: z.string().min(1, "স্থায়ী ঠিকানার গ্রাম আবশ্যক"),
  permanentPost: z.string().min(1, "স্থায়ী ঠিকানার পোস্ট আবশ্যক"),
  permanentThana: z.string().min(1, "স্থায়ী ঠিকানার থানা আবশ্যক"),
  permanentDistrict: z.string().min(1, "স্থায়ী ঠিকানার জেলা আবশ্যক"),
  specialty: z.string().optional(),
  educationEntries: z
    .array(educationEntrySchema)
    .min(1, "কমপক্ষে একটি শিক্ষাগত তথ্য যোগ করুন"),
  entryFee: z.coerce
    .number({ message: "প্রবেশ ফি আবশ্যক" })
    .min(0, "প্রবেশ ফি ০ বা তার বেশি হতে হবে"),
  annualFee: z.coerce
    .number({ message: "বার্ষিক চাঁদা আবশ্যক" })
    .min(0, "বার্ষিক চাঁদা ০ বা তার বেশি হতে হবে"),
  lifetimeFee: z.coerce
    .number({ message: "আজীবন সদস্য চাঁদা আবশ্যক" })
    .min(0, "আজীবন সদস্য চাঁদা ০ বা তার বেশি হতে হবে"),
  workplaceTypes: z
    .array(z.string())
    .min(1, "কর্মক্ষেত্র (নিয়োগ) থেকে অন্তত একটি নির্বাচন করুন"),
  declarationAccepted: z
    .boolean()
    .refine((value) => value, "ঘোষণা গ্রহণ করা আবশ্যক"),
  notes: z
    .string()
    .min(1, "আবেদন সম্পর্কিত সংক্ষিপ্ত তথ্য লিখুন")
    .min(10, "কমপক্ষে ১০ অক্ষরের তথ্য লিখুন"),
  profileImage: z
    .instanceof(File, { message: "প্রোফাইল ছবি আবশ্যক" })
    .refine((file) => file.size > 0, "প্রোফাইল ছবি আবশ্যক")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "ছবির সাইজ ৫MB এর কম হতে হবে",
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "শুধু JPG, PNG, বা WEBP ছবি গ্রহণযোগ্য",
    ),
});

export type JoinApplicationFormValues = z.input<typeof joinApplicationSchema>;