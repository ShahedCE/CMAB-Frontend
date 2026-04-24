import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Activity } from "@/types/activity";

function getImageUrl(path?: string | null) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  if (!path) return "";
  if (path.startsWith("http")) return path;

  return `${base}${path}`;
}

type ActivityCardProps = {
  activity: Activity;
};

export function ActivityCard({ activity }: ActivityCardProps) {
  const imageUrl = getImageUrl(activity.image);


  return (
    <article className="group overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={activity.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No image
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6">
        {activity.date && (
          <span className="text-xs font-medium text-slate-500">
            তারিখ: {activity.date}
          </span>
        )}

        <h2 className="mt-4 text-xl font-bold text-slate-900">
          {activity.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm text-slate-600">
          {activity.description}
        </p>

        <div className="mt-6">
          <Button href={`/activities/${activity.id}`}>
            বিস্তারিত দেখুন
          </Button>
        </div>
      </div>
    </article>
  );
}