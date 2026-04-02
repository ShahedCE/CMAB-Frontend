import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Activity } from "@/types/activity";

type ActivityCardProps = {
  activity: Activity;
};

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <article className="group overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-(--brand-green-soft) px-3 py-1 text-xs font-semibold text-(--brand-green-dark)">
            {activity.category}
          </span>

          {activity.date ? (
            <span className="text-xs font-medium text-slate-500">
              {activity.date}
            </span>
          ) : null}
        </div>

        <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
          {activity.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
          {activity.description}
        </p>

        <div className="mt-6">
          <Button href={`/activities/${activity.id}`}>View Details</Button> {/*redirecting to the dynamic activity page*/}
        </div>
      </div>
    </article>
  );
}