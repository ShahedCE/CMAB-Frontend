import { ArchiveClient } from "@/components/archive/archive-client";
import { getArchives } from "@/lib/archive";

export const revalidate = 60;

export const metadata = {
  title: "Archive | CMAB",
  description: "CMAB digital archive, souvenirs, committees and photo albums.",
};

export default async function ArchivePage() {
  const archives = await getArchives();

  return (
    <main className="bg-slate-50">
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden bg-emerald-700 px-6 py-24 text-white">
        <div className="absolute inset-0 h-full w-full">
          <div className="absolute top-0 -left-1/4 h-full w-full rounded-full bg-linear-to-br from-emerald-600/40 to-transparent blur-[120px] mix-blend-overlay" />
          <div className="absolute right-0 bottom-0 h-full w-full rounded-full bg-linear-to-tl from-teal-600/30 to-transparent blur-[150px] mix-blend-overlay" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100">
            CMAB Digital Archive
          </p>

          <h1 className="text-4xl font-bold md:text-6xl">
            Preserving CMAB History, Memories & Leadership
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-emerald-50 md:text-lg">
            Explore past souvenirs, executive committees, historical documents
            and division-wise photo albums of Christian Medical Association
            Bangladesh.
          </p>
        </div>
      </section>

      <ArchiveClient archives={archives} />
    </main>
  );
}