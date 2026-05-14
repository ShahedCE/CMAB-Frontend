import { ArchiveForm } from "@/components/admin/archive/archive-form";

export default function CreateArchivePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">Create Archive</h1>
        <p className="text-sm text-black-300">
          Add souvenirs, past committee members or division-wise photo albums.
        </p>
      </div>

      <ArchiveForm />
    </div>
  );
}