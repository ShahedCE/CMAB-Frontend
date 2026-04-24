import { notFound } from "next/navigation";
import { getMemberById } from "@/lib/members";
import { MemberDetailContent } from "@/components/members/member-detail-content";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MemberDetailsPage({ params }: Props) {
  const { id } = await params;

  const member = await getMemberById(id);

  if (!member) {
    notFound();
  }

  return <MemberDetailContent member={member} />;
}