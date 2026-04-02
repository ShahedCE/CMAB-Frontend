import { notFound } from "next/navigation";
import { ActivityDetailContent } from "@/components/activities/activity-detail-content";
import { getActivityById } from "@/lib/activities";

type ActivityDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ActivityDetailsPage({
  params,
}: ActivityDetailsPageProps) {
  const { id } = await params;
  const activity = await getActivityById(id);

  if (!activity) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)] py-10 sm:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ActivityDetailContent activity={activity} />
      </div>
    </main>
  );
}