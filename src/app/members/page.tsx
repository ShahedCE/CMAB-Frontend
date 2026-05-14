import { getMembers } from "@/lib/members";
import { getExecutiveMembers } from "@/lib/executive-members";

import { PageHero } from "@/components/ui/page-hero";
import { MembersClient } from "@/components/members/members-client";
import { ExecutiveMembersClient } from "@/components/executive-members/executive-members-client";

export default async function MembersPage() {
  const [members, executiveMembers] = await Promise.all([
    getMembers(),
    getExecutiveMembers(),
  ]);

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)]">
      <PageHero
        icon="users"
        title="আমাদের সদস্যদের পরিচিতি"
        description="আমাদের কমিউনিটির সদস্যদের সম্পর্কে জানুন।"
      />

      <ExecutiveMembersClient executiveMembers={executiveMembers} />

      <MembersClient members={members} />
    </main>
  );
}