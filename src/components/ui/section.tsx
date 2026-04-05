import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function Section({ eyebrow, title, description, children,
}: SectionProps) {
  return (
    <>
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-emerald-700">
      
      <div className="max-w-3xl">
        {eyebrow ? (
          <span className="inline-flex rounded-full bg-(--brand-green-soft) px-3 py-1 text-xs font-semibold tracking-[0.16em] text-(--brand-green-dark)">
            {eyebrow}
          </span>
        ) : null}

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {description ? (
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      <div className="mt-8">{children}</div>
      </section>
   </>
  );
}