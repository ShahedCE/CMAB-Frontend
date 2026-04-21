"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getJoinRequestById,
  approveJoinRequest,
  rejectJoinRequest,
  type JoinRequestItem,
} from "@/lib/admin/dashboard-api";
import { formatUtcDate } from "@/lib/admin/date";

function Field({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value?: string | number | boolean | null;
  fullWidth?: boolean;
}) {
  const displayValue =
    value === undefined || value === null || value === ""
      ? "—"
      : typeof value === "boolean"
      ? value
        ? "হ্যাঁ"
        : "না"
      : String(value);

  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>
      <p className="mb-1 text-xs font-semibold text-slate-500">{label}</p>
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
        {displayValue}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export default function JoinRequestDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [item, setItem] = useState<JoinRequestItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isActing, setIsActing] = useState(false);
  const [actingType, setActingType] = useState<"approved" | "rejected" | null>(null);

  //for Image
  const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const imageUrl = item?.profileImageUrl
    ? item.profileImageUrl.startsWith("http")
      ? item.profileImageUrl
      : `${backendBaseUrl}${item.profileImageUrl}`
    : "";

  useEffect(() => {
    const load = async () => {
      if (!params.id) return;
      setLoading(true);
      setError("");

      try {
        const data = await getJoinRequestById(params.id);
        setItem(data);
      } catch (err) {
        console.error(err);
        setError("জয়েন রিকুয়েস্টের তথ্য লোড করা যায়নি।");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [params.id]);

  const onAction = async (status: "approved" | "rejected") => {
    if (!item) return;

    setMessage("");
    setError("");
    setIsActing(true);
    setActingType(status);

    try {
      if (status === "approved") {
        await approveJoinRequest(item.id);
      } else {
        await rejectJoinRequest(item.id);
      }

      setItem((prev) => (prev ? { ...prev, status } : prev));
      setMessage(
        status === "approved"
          ? "আবেদনটি সফলভাবে অনুমোদন করা হয়েছে।"
          : "আবেদনটি সফলভাবে বাতিল করা হয়েছে।"
      );

      setTimeout(() => {
        router.replace("/admin/join-requests");
      }, 700);
    } catch (err) {
      console.error(err);
      setError("রিকুয়েস্ট স্ট্যাটাস আপডেট করা যায়নি।");
    } finally {
      setIsActing(false);
      setActingType(null);
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-500">তথ্য লোড হচ্ছে...</p>;
  }

  if (!item) {
    return <p className="text-sm text-slate-500">রিকুয়েস্ট পাওয়া যায়নি।</p>;
  }

  // Accept/Reject button enable logic: Only enabled if pending (not "approved" or "rejected")
  const actionDisabled = isActing || (item.status !== "pending");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          // details button ("Back") effect changed: now has no visual effects on tap/click
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
        >
          Back
        </button>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            item.status === "approved"
              ? "bg-emerald-100 text-emerald-700"
              : item.status === "rejected"
              ? "bg-red-100 text-red-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {item.status === "approved"
            ? "approved"
            : item.status === "rejected"
            ? "rejected"
            : "pending"}
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">জয়েন রিকুয়েস্ট বিস্তারিত</h1>
        <p className="mt-1 text-sm text-slate-600">
          আবেদনকারীর জমা দেওয়া তথ্যসমূহ এখানে দেখা যাবে।
        </p>
      </div>

      {message ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </p>
      ) : null}

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-5 md:flex-row">
          
          <div className="flex-shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={item.fullNameBn}
                className="h-32 w-32 rounded-2xl border border-slate-200 object-cover"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400">
                ছবি নেই
              </div>
            )}
          </div>

          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            <Field label="নাম (বাংলা)" value={item.fullNameBn} />
            <Field label="নাম (ইংরেজি)" value={item.fullNameEn} />
            <Field label="ইমেইল" value={item.email} />
            <Field label="মোবাইল" value={item.mobile} />
            <Field label="ফোন" value={item.phone} />
            <Field label="সদস্যপদের ধরন" value={item.membershipType} />
            <Field label="জমাদানের তারিখ" value={formatUtcDate(item.createdAt)} />
            <Field
              label="ঘোষণা গ্রহণ"
              value={item.declarationAccepted}
            />
          </div>
        </div>
      </section>

      <Section title="ব্যক্তিগত তথ্য">
        <Field label="পিতার নাম" value={item.fatherName} />
        <Field label="মাতার নাম" value={item.motherName} />
        <Field label="জন্মতারিখ" value={formatUtcDate(item.dateOfBirth)} />
        <Field label="জাতীয় পরিচয়পত্র নম্বর" value={item.nationalId} />
        <Field label="মেডিকেল রেজিস্ট্রেশন নম্বর" value={item.medicalRegNo} />
        <Field label="বিশেষজ্ঞতা" value={item.specialty} />
      </Section>

      <Section title="বর্তমান ঠিকানা">
        <Field label="গ্রাম" value={item.presentVillage} />
        <Field label="পোস্ট" value={item.presentPost} />
        <Field label="থানা" value={item.presentThana} />
        <Field label="জেলা" value={item.presentDistrict} />
      </Section>

      <Section title="স্থায়ী ঠিকানা">
        <Field label="গ্রাম" value={item.permanentVillage} />
        <Field label="পোস্ট" value={item.permanentPost} />
        <Field label="থানা" value={item.permanentThana} />
        <Field label="জেলা" value={item.permanentDistrict} />
      </Section>

      <Section title="কর্মস্থলের ধরন">
        <Field
          label="কর্মস্থল"
          value={Array.isArray(item.workplaceTypes) ? item.workplaceTypes.join(", ") : "—"}
          fullWidth
        />
      </Section>

      <section className="rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">শিক্ষাগত যোগ্যতা</h2>
        </div>

        <div className="p-5">
          {!Array.isArray(item.educationEntries) || item.educationEntries.length === 0 ? (
            <p className="text-sm text-slate-500">কোনো শিক্ষাগত তথ্য পাওয়া যায়নি।</p>
          ) : (
            <div className="space-y-4">
              {item.educationEntries.map((edu, index) => (
                <div
                  key={index}
                  className="grid gap-4 rounded-2xl border border-slate-200 p-4 sm:grid-cols-2"
                >
                  <Field label="ডিগ্রির নাম" value={edu.degree} />
                  <Field label="ইনস্টিটিউটের নাম" value={edu.institution} />
                  <Field label="ফলাফল" value={edu.result} />             
                  <Field label="পাসের বছর" value={edu.passingYear} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Section title="ফি সংক্রান্ত তথ্য">
        <Field label="এন্ট্রি ফি" value={item.entryFee} />
        <Field label="বার্ষিক ফি" value={item.annualFee} />
        <Field label="লাইফটাইম ফি" value={item.lifetimeFee} />
      </Section>

      <Section title="অতিরিক্ত তথ্য">
        <Field label="নোট" value={item.notes} fullWidth />
      </Section>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onAction("approved")}
          disabled={actionDisabled}
          className="rounded-xl bg-[var(--brand-green)] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isActing && actingType === "approved" ? "অনুমোদন হচ্ছে..." : "অনুমোদন করুন"}
        </button>

        <button
          type="button"
          onClick={() => onAction("rejected")}
          disabled={actionDisabled}
          className="rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isActing && actingType === "rejected" ? "বাতিল হচ্ছে..." : "বাতিল করুন"}
        </button>
      </div>
    </div>
  );
}