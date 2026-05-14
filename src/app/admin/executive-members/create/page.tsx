import { ExecutiveMemberForm } from "@/components/admin/executive-members/executive-member-form";

export default function CreateExecutiveMemberPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">
          Create Executive Member
        </h1>
        <p className="text-sm text-black-300">
          Add a new CMAB executive committee member.
        </p>
      </div>

      <ExecutiveMemberForm />
    </div>
  );
}