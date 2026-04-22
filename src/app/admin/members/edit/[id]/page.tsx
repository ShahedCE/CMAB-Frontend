import EditMemberForm from "@/components/admin/members/edit-member-form";

export default function EditMemberPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <EditMemberForm />
      </div>
    </main>
  );
}