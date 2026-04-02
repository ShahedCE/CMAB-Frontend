import { ActivityCard } from "@/components/activities/activity-card";
import type { Activity } from "@/types/activity";

type ActivitiesGridProps = {
  activities: Activity[];
};

export function ActivitiesGrid({ activities }: ActivitiesGridProps) {
  if (activities.length === 0) {
    return (
      <div className="rounded-4xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6 text-slate-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="4" y="5" width="16" height="14" rx="2" />
            <path d="M8 9h8" />
            <path d="M8 13h5" />
          </svg>
        </div>

        <h2 className="mt-4 text-xl font-semibold text-slate-900">
          No activities found
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          There are no activities to display right now.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}