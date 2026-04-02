import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Activity } from "@/types/activity";

type ActivityDetailContentProps = {
  activity: Activity;
};

export function ActivityDetailContent({
  activity,
}: ActivityDetailContentProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <article className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-70 w-full bg-slate-100 sm:h-90 lg:h-115">
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-(--brand-green-soft) px-3 py-1 text-xs font-semibold text-(--brand-green-dark)">
              {activity.category}
            </span>

            {activity.date ? (
              <span className="text-sm font-medium text-slate-500">
                {activity.date}
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {activity.title}
          </h1>

          <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
            {activity.fullDescription}
          </p>
        </div>
      </article>

      <aside className="space-y-6">
        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Additional Info
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {activity.additionalInfo || "More information will be available soon."}
          </p>
        </div>

        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Quick Actions
          </h2>

          <div className="mt-4 flex flex-col gap-3">
            <Button href="/activities">Back to Activities</Button>
            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}