import type { Message } from "@/types/message";

type Props = {
  message: Message;
};

export function MessageCard({ message }: Props) {
  return (
    <article className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl font-bold text-[var(--brand-green-dark)]">
        {message.organizationName?.charAt(0)?.toUpperCase() || "M"}
      </div>

      <h3 className="text-xl font-bold text-slate-900">
        {message.organizationName}
      </h3>

      <p className="mt-1 text-sm font-semibold text-[var(--brand-green-dark)]">
        {message.fatherName}
      </p>

      <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
        {message.message}
      </p>
    </article>
  );
}