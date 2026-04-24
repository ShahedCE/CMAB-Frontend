import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Activity } from "@/types/activity";

type ActivityDetailContentProps = {
  activity: Activity;
};

function getImageUrl(path?: string | null) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  if (!path) return "";
  if (path.startsWith("http")) return path;

  return `${base}${path}`;
}

export function ActivityDetailContent({
  activity,
}: ActivityDetailContentProps) {
  const imageUrl = getImageUrl(activity.image);

  return (
    <div className="space-y-8">
      <article className="overflow-hidden rounded-4xl border border-emerald-100 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_38%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_30%)]" />

          <div className="relative h-70 w-full bg-slate-100 sm:h-90 lg:h-115">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={activity.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                No image available
              </div>
            )}

            <div className="absolute inset-0 bg-linear-to-t from-slate-950/35 via-slate-900/10 to-transparent" />
          </div>
        </div>

        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            {activity.date && (
              <span className="inline-flex rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
                তারিখ: {activity.date}
              </span>
            )}
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {activity.title}
          </h1>

          <p className="mt-6 max-w-4xl text-[15px] leading-8 text-slate-600 sm:text-base">
            {activity.fullDescription}
          </p>
        </div>
      </article>

      <div className="flex items-center justify-center">
        <Button href="/activities" className="w-fit">
          Activities এ ফিরে যান
        </Button>
      </div>
    </div>
  );
}