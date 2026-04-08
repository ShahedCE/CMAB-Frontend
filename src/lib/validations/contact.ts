import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "নাম দেওয়া আবশ্যক")
    .min(3, "নাম কমপক্ষে ৩ অক্ষরের হতে হবে"),
  email: z
    .string()
    .min(5, "ইমেইল দেওয়া আবশ্যক")
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "সঠিক ফরম্যাটে ইমেইল লিখুন (যেমন: user@example.com)"
    ),
  message: z
    .string()
    .min(1, "বার্তা দেওয়া আবশ্যক")
    .min(10, "বার্তা কমপক্ষে ১০ অক্ষরের হতে হবে"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;