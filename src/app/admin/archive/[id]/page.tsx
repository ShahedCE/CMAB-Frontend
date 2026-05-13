import { ArchiveForm } from "@/components/admin/archive/archive-form";
import { getAdminArchiveById } from "@/lib/admin/archive-api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditArchivePage({ params }: Props) {
  const { id } = await params;
  const archive = await getAdminArchiveById(id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">Edit Archive</h1>
        <p className="text-sm text-black-300">Update archive information.</p>
      </div>

      <ArchiveForm archive={archive} />
    </div>
  );
}