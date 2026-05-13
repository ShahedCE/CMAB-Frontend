"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Archive } from "@/types/archive";
import { createArchive, updateArchive } from "@/lib/admin/archive-api";

type ArchiveCategory = "souvenir" | "committee" | "photo_album";

type GalleryItem = {
  file?: File;
  imageUrl?: string;
  caption: string;
  date: string;
};

type CommitteeMember = {
  name: string;
  designation: string;
  photo?: File;
  photoUrl?: string;
};

type Props = {
  archive?: Archive;
};

export function ArchiveForm({ archive }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(archive?.title || "");
  const [category, setCategory] = useState<ArchiveCategory>(
    (archive?.category as ArchiveCategory) || "souvenir"
  );

  const [division, setDivision] = useState(archive?.division || "");
  const [year, setYear] = useState(archive?.year || "");
  const [date, setDate] = useState(archive?.date || "");
  const [description, setDescription] = useState(archive?.description || "");
  const [caption, setCaption] = useState(archive?.caption || "");
  const [isPublished, setIsPublished] = useState(archive?.isPublished ?? true);

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [souvenirFile, setSouvenirFile] = useState<File | null>(null);

  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>(
    archive?.membersJson?.map((member) => ({
      name: member.name,
      designation: member.designation,
      photoUrl: member.photoUrl,
    })) || []
  );

  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>(
    archive?.imagesJson?.map((img) => ({
      imageUrl: img.imageUrl,
      caption: img.caption || "",
      date: img.date || "",
    })) || []
  );

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function resetCategoryData(nextCategory: ArchiveCategory) {
    setCategory(nextCategory);

    if (nextCategory === "souvenir") {
      setCommitteeMembers([]);
      setGalleryImages([]);
    }

    if (nextCategory === "committee") {
      setGalleryImages([]);
      setSouvenirFile(null);
    }

    if (nextCategory === "photo_album") {
      setCommitteeMembers([]);
      setSouvenirFile(null);
    }
  }

  function addCommitteeMember() {
    setCommitteeMembers((prev) => [
      ...prev,
      { name: "", designation: "" },
    ]);
  }

  function removeCommitteeMember(index: number) {
    setCommitteeMembers((prev) => prev.filter((_, i) => i !== index));
  }

  function addGalleryImage() {
    setGalleryImages((prev) => [
      ...prev,
      { caption: "", date: "" },
    ]);
  }

  function removeGalleryImage(index: number) {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  }

  function validateForm() {
    if (!title.trim()) return "Title is required";

    if (category === "souvenir" && !archive?.fileUrl && !souvenirFile) {
      return "Souvenir file is required";
    }

    if (category === "committee" && committeeMembers.length === 0) {
      return "At least one EC member is required";
    }

    if (
      category === "committee" &&
      committeeMembers.some((m) => !m.name.trim() || !m.designation.trim())
    ) {
      return "Every EC member must have name and designation";
    }

    if (category === "photo_album" && galleryImages.length === 0) {
      return "At least one gallery photo is required";
    }

    if (
      category === "photo_album" &&
      galleryImages.some((g) => !g.caption.trim() || !g.date.trim())
    ) {
      return "Every gallery photo must have caption/title and date";
    }

    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("isPublished", String(isPublished));

      if (division) formData.append("division", division);
      if (year) formData.append("year", year);
      if (date) formData.append("date", date);
      if (description) formData.append("description", description);
      if (caption) formData.append("caption", caption);

      if (coverImage) formData.append("coverImage", coverImage);

      if (category === "souvenir" && souvenirFile) {
        formData.append("file", souvenirFile);
      }

      if (category === "committee") {
        committeeMembers.forEach((member, index) => {
          if (member.photo) {
            formData.append(`memberPhoto_${index}`, member.photo);
          }
        });

      formData.append(
        "membersJson",
        JSON.stringify(
            committeeMembers.map((member) => ({
            name: member.name,
            designation: member.designation,
            photoUrl: member.photoUrl || "",
            })),
        ),
        );
      }

      if (category === "photo_album") {
        galleryImages.forEach((item) => {
          if (item.file) {
            formData.append("images", item.file);
          }
        });

        formData.append(
          "imagesJson",
          JSON.stringify(
            galleryImages.map((item) => ({
              imageUrl: item.imageUrl || "",
              caption: item.caption,
              date: item.date,
            }))
          )
        );
      }

      if (archive?.id) {
        await updateArchive(archive.id, formData);
      } else {
        await createArchive(formData);
      }

      router.push("/admin/archive");
      router.refresh();
    } catch (error: any) {
  console.error("Archive save error:", error);
  console.error("Backend response:", error?.response?.data);

  setError(
    error?.response?.data?.message?.toString() ||
      error?.response?.data?.error ||
      "Failed to save archive"
  );
} finally {
  setSubmitting(false);
}
  }

  const isSouvenir = category === "souvenir";
  const isCommittee = category === "committee";
  const isPhotoAlbum = category === "photo_album";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-white p-6 shadow-sm">
      {error && (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Archive Title">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            placeholder="Enter archive title"
          />
        </Field>

        <Field label="Archive Category">
          <select
            value={category}
            onChange={(e) => resetCategoryData(e.target.value as ArchiveCategory)}
            className="input"
          >
            <option value="souvenir">Souvenirs</option>
            <option value="committee">Past Committee with EC Members</option>
            <option value="photo_album">Division Wise Photo Album</option>
          </select>
        </Field>

        <Field label="Division">
          <input
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="input"
            placeholder="Dhaka / Chattogram / Rajshahi"
          />
        </Field>

        <Field label="Year">
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="input"
            placeholder="2026"
          />
        </Field>

        <Field label="Date">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Cover Image">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
            className="input"
          />
        </Field>
      </div>

      <Field label="Short Caption">
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="input"
          placeholder="Short caption"
        />
      </Field>

      <Field label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="input"
          placeholder="Archive description"
        />
      </Field>

      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
        Published
      </label>

      <CategorySection active={isSouvenir}>
        <div className="space-y-4">
          <SectionHeader
            title="Souvenir Upload"
            description="Upload CMAB past souvenir, magazine, booklet or publication file."
          />

          <Field label="Souvenir File">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              disabled={!isSouvenir}
              onChange={(e) => setSouvenirFile(e.target.files?.[0] || null)}
              className="input"
            />
          </Field>
        </div>
      </CategorySection>

      <CategorySection active={isCommittee}>
        <div className="space-y-4">
          <SectionHeader
            title="Past Committee / EC Members"
            description="Add past executive committee members with name, designation and photo."
            action={
              <button type="button" onClick={addCommitteeMember} className="btn-secondary">
                Add Member
              </button>
            }
          />

          {committeeMembers.length === 0 && (
            <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
              No member added yet.
            </p>
          )}

          {committeeMembers.map((member, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-2xl bg-slate-50 p-4 md:grid-cols-4"
            >
              <input
                placeholder="Member Name"
                value={member.name}
                disabled={!isCommittee}
                onChange={(e) => {
                  const copy = [...committeeMembers];
                  copy[index].name = e.target.value;
                  setCommitteeMembers(copy);
                }}
                className="input"
              />

              <input
                placeholder="Designation"
                value={member.designation}
                disabled={!isCommittee}
                onChange={(e) => {
                  const copy = [...committeeMembers];
                  copy[index].designation = e.target.value;
                  setCommitteeMembers(copy);
                }}
                className="input"
              />

              <input
                type="file"
                accept="image/*"
                disabled={!isCommittee}
                onChange={(e) => {
                  const copy = [...committeeMembers];
                  copy[index].photo = e.target.files?.[0];
                  setCommitteeMembers(copy);
                }}
                className="input"
              />

              <button
                type="button"
                onClick={() => removeCommitteeMember(index)}
                className="rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </CategorySection>

      <CategorySection active={isPhotoAlbum}>
        <div className="space-y-4">
          <SectionHeader
            title="Division Wise Photo Album"
            description="Upload multiple photos with caption/title and date."
            action={
              <button type="button" onClick={addGalleryImage} className="btn-secondary">
                Add Photo
              </button>
            }
          />

          {galleryImages.length === 0 && (
            <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
              No photo added yet.
            </p>
          )}

          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-2xl bg-slate-50 p-4 md:grid-cols-4"
            >
              <input
                type="file"
                accept="image/*"
                disabled={!isPhotoAlbum}
                onChange={(e) => {
                  const copy = [...galleryImages];
                  copy[index].file = e.target.files?.[0];
                  setGalleryImages(copy);
                }}
                className="input"
              />

              <input
                placeholder="Caption / Title"
                value={image.caption}
                disabled={!isPhotoAlbum}
                onChange={(e) => {
                  const copy = [...galleryImages];
                  copy[index].caption = e.target.value;
                  setGalleryImages(copy);
                }}
                className="input"
              />

              <input
                type="date"
                value={image.date}
                disabled={!isPhotoAlbum}
                onChange={(e) => {
                  const copy = [...galleryImages];
                  copy[index].date = e.target.value;
                  setGalleryImages(copy);
                }}
                className="input"
              />

              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </CategorySection>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-2xl bg-[var(--brand-green)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(10,163,79,0.22)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-green-dark)] disabled:opacity-60"
      >
        {submitting ? "Saving..." : archive ? "Update Archive" : "Create Archive"}
      </button>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid #cbd5e1;
          background: white;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #0f172a;
          outline: none;
        }

        .input:focus {
          border-color: var(--brand-green);
        }

        .input:disabled {
          cursor: not-allowed;
          background: #f1f5f9;
          color: #94a3b8;
        }

        .btn-secondary {
          border-radius: 0.875rem;
          border: 1px solid #cbd5e1;
          background: white;
          padding: 0.6rem 1rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--brand-green-dark);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-2">
      <span className="block text-sm font-semibold text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}

function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}

function CategorySection({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-3xl border p-5 transition ${
        active
          ? "border-[var(--brand-green)] bg-emerald-50/40"
          : "border-slate-200 bg-slate-50 opacity-50"
      }`}
    >
      {children}
    </section>
  );
}