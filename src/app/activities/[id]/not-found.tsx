import Link from "next/link";

export default function ActivityNotFound() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)] py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-4xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-red-600">
            NOT FOUND
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            Activity not found
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            The activity you are looking for does not exist or may have been removed.
          </p>

          <Link
            href="/activities"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-(--brand-green) 
            px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(10,163,79,0.22)] 
            transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--brand-green-dark)"
          >
            Back to Activities
          </Link>
        </div>
      </div>
    </main>
  );
}