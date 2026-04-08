import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Briefcase, GraduationCap, Sparkles, CalendarDays, Building2 } from "lucide-react";
import { membersData } from "@/data/members";
import { MotionDiv, MotionSection } from "@/components/ui/motion-wrapper";
import { Button } from "@/components/ui/button";
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const badgeStyles: Record<string, string> = {
  "সাধারণ সদস্য":
    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  "লাইট সদস্য": "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  "অনিয়মিত সদস্য":
    "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
};

export default async function MemberDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  const member = membersData.find((m) => m.slug === slug);

  if (!member || !member.isPublished) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#ecfdf5,#ffffff)]">          
       <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <MotionSection className="overflow-hidden rounded-4xl border border-emerald-100 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_28%),linear-gradient(to_bottom,rgba(248,252,249,0.95),rgba(255,255,255,1))]" />

            <div className="relative grid gap-8 px-5 py-8 sm:px-8 md:grid-cols-[280px_minmax(0,1fr)] md:items-center lg:px-10 lg:py-10">
              <MotionDiv className="mx-auto w-full max-w-65 md:mx-0">
                <div className="group relative aspect-4/5 overflow-hidden rounded-4xl border border-white/80 bg-slate-100 shadow-[0_18px_45px_rgba(15,23,42,0.14)]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    priority
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 260px, 280px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 via-transparent to-transparent" />
                </div>
              </MotionDiv>

              <MotionDiv className="text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <span
                    className={`inline-flex rounded-full px-4 py-1.5 text-sm font-semibold ${
                      badgeStyles[member.memberType]
                    }`}
                  >
                    {member.memberType}
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200">
                    <CalendarDays className="h-4 w-4" />
                    সদস্য since {member.memberSince}
                  </span>
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  {member.name}
                </h1>

                <p className="mt-3 text-lg font-semibold text-emerald-700 sm:text-xl">
                  {member.profession}
                </p>

                <div className="mt-4 flex flex-col items-center gap-3 text-sm text-slate-600 md:items-start">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-slate-500" />
                    <span>{member.organization}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span>{member.district}</span>
                  </div>
                </div>

                <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600">
                  {member.shortBio}
                </p>
              </MotionDiv>
            </div>
          </div>
        </MotionSection>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <MotionSection delay={0.08} className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">পরিচিতি</h2>
                  <p className="text-sm text-slate-500">সদস্য সম্পর্কে বিস্তারিত তথ্য</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[15px] leading-8 text-slate-600">
                  {member.fullBio}
                </p>
              </div>
            </MotionSection>

            <MotionSection delay={0.14} className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">শিক্ষাগত যোগ্যতা</h2>
                  <p className="text-sm text-slate-500">Academic summary</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100">
                <p className="text-[15px] leading-7 text-slate-700">
                  {member.educationSummary}
                </p>
              </div>
            </MotionSection>
          </div>

          <div className="space-y-6">
            <MotionSection delay={0.2} className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">দ্রুত তথ্য</h2>
                  <p className="text-sm text-slate-500">Quick profile overview</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    সদস্যের ধরন
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {member.memberType}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    পেশা
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {member.profession}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    প্রতিষ্ঠান
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {member.organization}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    অবস্থান
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {member.district}
                  </p>
                </div>
              </div>
            </MotionSection>

            <MotionSection delay={0.26} className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">দক্ষতা / বিশেষজ্ঞতা</h2>
              <p className="mt-1 text-sm text-slate-500">
                সদস্যের কাজের ক্ষেত্র ও মূল ফোকাস
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {member.expertise.map((item, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </MotionSection>
          </div>
        </div>
        
              <aside className="space-y-6">
                <div className="mt-8 items-center flex flex-col gap-8">
                    <Button href="/members" className="w-fit">
                      Members এ ফিরে যান
                    </Button>
                  </div>
              </aside>
      </div>
    </main>
  );
}