import { getMembers } from "@/lib/members";
import { PageHero } from "@/components/ui/page-hero";
import { MembersClient } from "@/components/members/members-client";

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)]">
      <PageHero
        icon="users"
        title="আমাদের সদস্যদের পরিচিতি"
        description="আমাদের কমিউনিটির সদস্যদের সম্পর্কে জানুন। ক্যাটাগরি ফিল্টার এবং সার্চ ব্যবহার করে সহজেই সদস্য খুঁজে নিতে পারবেন।"
      />

      <MembersClient members={members} />
    </main>
  );
}