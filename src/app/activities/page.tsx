import { ActivitiesGrid } from "@/components/activities/activities-grid";
import { Section } from "@/components/ui/section";
import { getActivities } from "@/lib/activities";

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)] py-10 sm:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Section
          eyebrow="COMMUNITY ACTIVITIES"
          title="Explore Our Activities"
          description="Discover the programs, events, and outreach initiatives that reflect our mission of service, learning, and community engagement."
        >
          <ActivitiesGrid activities={activities} />
        </Section>
      </div>
    </main>
  );
}