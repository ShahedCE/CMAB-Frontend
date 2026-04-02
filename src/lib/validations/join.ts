import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const joinApplicationSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(8, "Phone number is too short"),
  organization: z.string().optional(),
  roleInterest: z
    .string()
    .min(1, "Role/Interest is required")
    .min(3, "Role/Interest must be at least 3 characters"),
  profileImage: z
    .instanceof(File, { message: "Profile image is required" })
    .refine((file) => file.size > 0, "Profile image is required")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "Image must be smaller than 5MB",
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only JPG, PNG, or WEBP images are allowed",
    ),
});

export type JoinApplicationFormValues = z.infer<typeof joinApplicationSchema>;