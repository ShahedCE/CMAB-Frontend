import { ActivitiesGrid } from "@/components/activities/activities-grid";
import { PageHero } from "@/components/ui/page-hero";
import { getActivities } from "@/lib/activities";

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)] ">
 
       <PageHero
       
        title="আমাদের কার্যক্রম"
        description="সেবা, প্রশিক্ষণ, সচেতনতামূলক উদ্যোগ এবং কমিউনিটি উন্নয়নে আমাদের বিভিন্ন কার্যক্রম সম্পর্কে জানুন।"
        icon="calendar"
      />
                <div className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ActivitiesGrid activities={activities} />
      </div>
    </main>
  );
}

