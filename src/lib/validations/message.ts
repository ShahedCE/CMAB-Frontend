import { z } from "zod";

export const messageSchema = z.object({
  organizationName: z
    .string()
    .min(2, "Organization name is required")
    .max(200, "Organization name is too long"),

  fatherName: z
    .string()
    .min(2, "Father name is required")
    .max(200, "Father name is too long"),

  message: z.string().min(5, "Message must be at least 5 characters"),
});

export type MessageFormValues = z.infer<typeof messageSchema>;