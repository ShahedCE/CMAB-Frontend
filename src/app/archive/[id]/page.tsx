import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { getArchiveById, getFileUrl } from "@/lib/archive";
import type { ArchiveImage, ArchiveMember } from "@/types/archive";

type Props = {
  params: Promise<{ id: string }>;
};

export const revalidate = 60;

function safeParseArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

export default async function ArchiveDetailsPage({ params }: Props) {
  const { id } = await params;
  const archive = await getArchiveById(id);

  if (!archive) {
    return (
      <main className="bg-slate-50 px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Archive not found
        </h1>
        <Link
          href="/archive"
          className="mt-5 inline-flex rounded-2xl bg-[var(--brand-green)] px-5 py-3 text-sm font-semibold text-white"
        >
          Back to Archive
        </Link>
      </main>
    );
  }

  const coverImage = getFileUrl(archive.coverImageUrl);
  const fileUrl = getFileUrl(archive.fileUrl);

  const members = safeParseArray<ArchiveMember>(archive.membersJson);
  const images = safeParseArray<ArchiveImage>(archive.imagesJson);

  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/archive"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-green-dark)]"
        >
          <ArrowLeft size={16} />
          Back to Archive
        </Link>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          {coverImage && (
            <div className="relative h-[420px]">
              <Image
                src={coverImage}
                alt={archive.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-6 p-6 md:p-10">
            <span className="inline-flex rounded-full bg-emerald-50 px-4 py-1 text-sm font-semibold capitalize text-emerald-700">
              {archive.category?.replaceAll("_", " ")}
            </span>

            <h1 className="text-3xl font-bold text-slate-900 md:text-5xl">
              {archive.title}
            </h1>

            <div className="flex flex-wrap gap-3 text-sm text-slate-500">
              {archive.division && <span>Division: {archive.division}</span>}
              {archive.year && <span>Year: {archive.year}</span>}
              {archive.date && <span>Date: {archive.date}</span>}
            </div>

            {archive.description && (
              <p className="max-w-4xl text-base leading-8 text-slate-700">
                {archive.description}
              </p>
            )}

            {fileUrl && (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-[var(--brand-green)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(10,163,79,0.22)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-green-dark)]"
              >
                <Download size={17} />
                Download / View File
              </a>
            )}
          </div>
        </div>

        {members.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-emerald-900">
              Committee / EC Members
            </h2>

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
              {members.map((member, index) => {
                const photo = getFileUrl(member.photoUrl);

                return (
                  <div
                    key={`${member.name}-${index}`}
                    className="rounded-3xl bg-white p-5 text-center shadow-sm"
                  >
                    <div className="relative mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full bg-slate-100">
                      {photo ? (
                        <Image
                          src={photo}
                          alt={member.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                          No Photo
                        </div>
                      )}
                    </div>

                    <h3 className="font-bold text-emerald-900">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {member.designation}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {images.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-emerald-900">
              Photo Album
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => {
                const imageUrl = getFileUrl(image.imageUrl);

                return (
                  <div
                    key={`${image.imageUrl}-${index}`}
                    className="overflow-hidden rounded-3xl bg-white shadow-sm"
                  >
                    <div className="relative h-64 bg-slate-100">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={image.caption || archive.title}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      {image.caption && (
                        <p className="font-semibold text-slate-800">
                          {image.caption}
                        </p>
                      )}

                      {image.date && (
                        <p className="mt-1 text-sm text-slate-500">
                          {image.date}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}