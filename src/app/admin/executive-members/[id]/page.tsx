import { ExecutiveMemberForm } from "@/components/admin/executive-members/executive-member-form";
import { getAdminExecutiveMemberById } from "@/lib/admin/executive-members-api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditExecutiveMemberPage({ params }: Props) {
  const { id } = await params;
  const member = await getAdminExecutiveMemberById(id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">
          Edit Executive Member
        </h1>
        <p className="text-sm text-black-300">
          Update executive committee member information.
        </p>
      </div>

      <ExecutiveMemberForm member={member} />
    </div>
  );
}