import { z } from "zod";

export const archiveCategories = [
  "souvenirs",
  "past_committee",
  "division_photo_album",
] as const;

export const archiveSchema = z
  .object({
    title: z.string().min(3, "Title is required"),
    category: z.enum(archiveCategories),
    division: z.string().optional(),
    year: z.string().optional(),
    date: z.string().optional(),
    description: z.string().optional(),
    caption: z.string().optional(),
    isPublished: z.boolean().default(true),

    committeeMembers: z
      .array(
        z.object({
          name: z.string().min(1, "Member name required"),
          designation: z.string().min(1, "Designation required"),
          photo: z.any().optional(),
          photoUrl: z.string().optional(),
        })
      )
      .optional(),

    galleryImages: z
      .array(
        z.object({
          file: z.any().optional(),
          imageUrl: z.string().optional(),
          caption: z.string().min(1, "Caption/title required"),
          date: z.string().min(1, "Date required"),
        })
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.category === "souvenirs") {
      // souvenir file validation frontend state diye handle korbo
    }

    if (
      data.category === "past_committee" &&
      (!data.committeeMembers || data.committeeMembers.length === 0)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["committeeMembers"],
        message: "At least one EC member is required",
      });
    }

    if (
      data.category === "division_photo_album" &&
      (!data.galleryImages || data.galleryImages.length === 0)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["galleryImages"],
        message: "At least one gallery image is required",
      });
    }
  });

export type ArchiveFormValues = z.infer<typeof archiveSchema>;