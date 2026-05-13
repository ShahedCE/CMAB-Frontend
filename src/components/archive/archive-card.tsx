import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Download, MapPin } from "lucide-react";
import type { Archive } from "@/types/archive";
import { getFileUrl } from "@/lib/archive";

type Props = {
  archive: Archive;
};

export function ArchiveCard({ archive }: Props) {
  const coverImage = getFileUrl(archive.coverImageUrl);
  const fileUrl = getFileUrl(archive.fileUrl);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 bg-slate-100">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={archive.title}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No Cover Image
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <span className="inline-flex rounded-full bg-emerald-50
 px-3 py-1 text-xs font-semibold capitalize text-emerald-700
">
          {archive.category?.replaceAll("_", " ")}
        </span>

        <h3 className="line-clamp-2 text-xl font-bold text-slate-900">
          {archive.title}
        </h3>

        <div className="flex flex-wrap gap-3 text-sm text-slate-500">
          {archive.division && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={15} />
              {archive.division}
            </span>
          )}

          {(archive.year || archive.date) && (
            <span className="inline-flex items-center gap-1">
              <CalendarDays size={15} />
              {archive.year || archive.date}
            </span>
          )}
        </div>

        {(archive.caption || archive.description) && (
          <p className="line-clamp-3 text-sm leading-6 text-slate-600">
            {archive.caption || archive.description}
          </p>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={`/archive/${archive.id}`}
            className="rounded-full bg-(--brand-green)
   px-5 py-2 text-sm font-semibold text-white transition hover:bg-(--brand-green-dark)"
          >
            View Details
          </Link>

          {fileUrl && (
            <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2 
            text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-(--brand-green) 
            hover:bg-(--brand-green-soft) hover:text-(--brand-green-dark)"
            >
            <Download size={15} />
            File
            </a>
          )}
        </div>
      </div>
    </div>
  );
}