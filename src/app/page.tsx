import { Container } from "@/components/layout/container";

export default function HomePage() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <span className="inline-flex rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold tracking-wide text-brand-green-dark">
            Welcome to CMAB
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Christian Medical Association Bangladesh
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Clean, modern and responsive base layout with a green-inspired navbar
            and a soft bluish footer, aligned with your logo identity.
          </p>
        </div>
      </Container>
    </main>
  );
}