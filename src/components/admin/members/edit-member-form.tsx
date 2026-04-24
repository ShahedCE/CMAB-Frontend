"use client";

import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { FormFileInput } from "@/components/join/form-file-input";
import { FormInput } from "@/components/join/form-input";
import { FormTextarea } from "@/components/join/form-textarea";
import {
    
    editMemberSchema,
  type EditMemberFormValues
} from "@/lib/validations/edit-member";
import { getMemberById, updateMember } from "@/lib/admin/dashboard-api";

export default function EditMemberForm() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const memberId = params.id;

  const workplaceOptions = [
    "সরকারি",
    "স্বায়ত্তশাসিত/চার্চ প্রতিষ্ঠান",
    "বেসরকারি",
    "প্রাইভেট",
    "অন্যান্য",
  ];

  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditMemberFormValues>({
    resolver: zodResolver(editMemberSchema),
    mode: "onChange",
    defaultValues: {
      fullNameBn: "",
      fullNameEn: "",
      fatherName: "",
      motherName: "",
      dateOfBirth: "",
      nationalId: "",
      medicalRegNo: "",
      membershipType: "",
      email: "",
      mobile: "",
      phone: "",
      presentVillage: "",
      presentPost: "",
      presentThana: "",
      presentDistrict: "",
      permanentVillage: "",
      permanentPost: "",
      permanentThana: "",
      permanentDistrict: "",
      specialty: "",
      educationEntries: [
        {
          degree: "",
          institution: "",
          result: "",
          passingYear: "",
        },
      ],
      entryFee: 0,
      annualFee: 0,
      lifetimeFee: 0,
      workplaceTypes: [],
      declarationAccepted: false,
      notes: "",
      profileImage: undefined,
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "educationEntries",
  });

  const entryFee = Number(watch("entryFee") || 0);
  const annualFee = Number(watch("annualFee") || 0);
  const lifetimeFee = Number(watch("lifetimeFee") || 0);
  const totalFee = entryFee + annualFee + lifetimeFee;

  useEffect(() => {
    const loadMember = async () => {
      if (!memberId) return;

      setPageLoading(true);
      setSubmitError("");

      try {
        const data = await getMemberById(memberId);

        const educationEntries =
        Array.isArray(data?.educationEntries) && data.educationEntries.length > 0
          ? data.educationEntries.map((edu: any) => ({
              degree: edu.degree || "",
              institution: edu.institution || "",
              result: edu.result || "",
              passingYear: edu.passingYear || "",
            }))
          : [
              {
                degree: "",
                institution: "",
                result: "",
                passingYear: "",
              },
            ];

        reset({
          fullNameBn: data?.fullNameBn || "",
          fullNameEn: data?.fullNameEn || "",
          fatherName: data?.fatherName || "",
          motherName: data?.motherName || "",
          dateOfBirth: data?.dateOfBirth ? String(data.dateOfBirth).slice(0, 10) : "",
          nationalId: data?.nationalId || "",
          medicalRegNo: data?.medicalRegNo || "",
          membershipType: data?.membershipType || "",
          email: data?.email || "",
          mobile: data?.mobile || "",
          phone: data?.phone || "",
          presentVillage: data?.presentVillage || "",
          presentPost: data?.presentPost || "",
          presentThana: data?.presentThana || "",
          presentDistrict: data?.presentDistrict || "",
          permanentVillage: data?.permanentVillage || "",
          permanentPost: data?.permanentPost || "",
          permanentThana: data?.permanentThana || "",
          permanentDistrict: data?.permanentDistrict || "",
          specialty: data?.specialty || "",
          educationEntries,
          entryFee: Number(data?.entryFee ?? 0),
          annualFee: Number(data?.annualFee ?? 0),
          lifetimeFee: Number(data?.lifetimeFee ?? 0),
          workplaceTypes: Array.isArray(data?.workplaceTypes) ? data.workplaceTypes : [],
          declarationAccepted: Boolean(data?.declarationAccepted),
          notes: data?.notes || "",
          profileImage: undefined,
        });

        replace(educationEntries);
      } catch (error: any) {
        console.error(error);
        setSubmitError(error?.response?.data?.message || "মেম্বারের তথ্য লোড করা যায়নি।");
      } finally {
        setPageLoading(false);
      }
    };

    loadMember();
  }, [memberId, reset, replace]);

  const onSubmit: SubmitHandler<EditMemberFormValues> = async (values) => {
    if (!memberId) return;

    setSubmitSuccess("");
    setSubmitError("");

    try {
      const formData = new FormData();

      formData.append("fullNameBn", values.fullNameBn);
      formData.append("fullNameEn", values.fullNameEn);
      formData.append("fatherName", values.fatherName);
      formData.append("motherName", values.motherName);
      formData.append("membershipType", values.membershipType);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("phone", values.phone || "");
      formData.append("presentVillage", values.presentVillage);
      formData.append("presentPost", values.presentPost);
      formData.append("presentThana", values.presentThana);
      formData.append("presentDistrict", values.presentDistrict);
      formData.append("permanentVillage", values.permanentVillage);
      formData.append("permanentPost", values.permanentPost);
      formData.append("permanentThana", values.permanentThana);
      formData.append("permanentDistrict", values.permanentDistrict);
      formData.append("specialty", values.specialty || "");
      formData.append("entryFee", String(Number(values.entryFee ?? 0)));
      formData.append("annualFee", String(Number(values.annualFee ?? 0)));
      formData.append("lifetimeFee", String(Number(values.lifetimeFee ?? 0)));
      formData.append("notes", values.notes || "");
      formData.append("workplaceTypes", JSON.stringify(values.workplaceTypes || []));
 

      if (values.profileImage instanceof File) {
        formData.append("profileImage", values.profileImage);
      }

      await updateMember(memberId, formData); //Calling the API function from admin/dashboard-api

      setSubmitSuccess("মেম্বারের তথ্য সফলভাবে আপডেট করা হয়েছে।");

      setTimeout(() => {
        router.push("/admin/members");
      }, 800);
    } catch (error: any) {
      console.error(error);
      setSubmitError(
        error?.response?.data?.message || "মেম্বারের তথ্য আপডেট করতে সমস্যা হয়েছে।"
      );
    }
  };

  if (pageLoading) {
    return <p className="text-sm text-slate-500">মেম্বারের তথ্য লোড হচ্ছে...</p>;
  }

  return (
    <div className="rounded-4xl border border-slate-200 bg-white shadow-sm sm:p-8 lg:p-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">মেম্বারের তথ্য সম্পাদনা করুন</h1>
          <p className="mt-2 text-sm text-slate-600">
            নিচের ফর্ম থেকে মেম্বারের তথ্য আপডেট করুন।
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/admin/members")}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          ফিরে যান
        </button>
      </div>

      {submitSuccess ? (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {submitSuccess}
        </p>
      ) : null}

      {submitError ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </p>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-6">
        <FormInput
          label="নাম (বাংলা)"
          required
          placeholder="আপনার বাংলা নাম লিখুন"
          error={errors.fullNameBn?.message}
          {...register("fullNameBn")}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <FormInput
            label="নাম (ইংরেজি)"
            required
            placeholder="Your name in English"
            error={errors.fullNameEn?.message}
            {...register("fullNameEn")}
          />
          <FormInput
            label="জন্ম তারিখ"
            type="date"
            required
            error={errors.dateOfBirth?.message}
            {...register("dateOfBirth")}
            readOnly
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormInput
            label="পিতার নাম"
            required
            placeholder="আপনার পিতার নাম লিখুন"
            error={errors.fatherName?.message}
            {...register("fatherName")}
          />
          <FormInput
            label="মাতার নাম"
            required
            placeholder="আপনার মাতার নাম লিখুন"
            error={errors.motherName?.message}
            {...register("motherName")}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormInput
            label="জাতীয় পরিচয়পত্র নম্বর"
            required
            placeholder="NID নম্বর লিখুন"
            error={errors.nationalId?.message}
            {...register("nationalId")}
            readOnly
          />
          <FormInput
            label="চিকিৎসা নিবন্ধন নম্বর"
            required
            placeholder="রেজিস্ট্রেশন নম্বর লিখুন"
            error={errors.medicalRegNo?.message}
            {...register("medicalRegNo")}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            সদস্যের ধরন<span className="text-red-500">*</span>
          </label>
          <select
            className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm text-slate-900 outline-none transition ${
              errors.membershipType
                ? "border-red-300 focus:border-red-400"
                : "border-slate-200 focus:border-emerald-500"
            }`}
            {...register("membershipType")}
          >
            <option value="">সদস্যের ধরন নির্বাচন করুন</option>
            <option value="general">সাধারণ সদস্য</option>
            <option value="light">লাইট সদস্য</option>
            <option value="irregular">অনিয়মিত সদস্য</option>
          </select>
          {errors.membershipType?.message ? (
            <p className="text-sm text-red-600">{errors.membershipType.message}</p>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormInput
            label="ইমেইল"
            type="email"
            required
            placeholder="আপনার ইমেইল লিখুন"
            error={errors.email?.message}
            {...register("email")}
          />
          <FormInput
            label="মোবাইল"
            required
            placeholder="আপনার মোবাইল নম্বর লিখুন"
            error={errors.mobile?.message}
            {...register("mobile")}
          />
        </div>

        <FormInput
          label="ফোন"
          placeholder="অতিরিক্ত ফোন নম্বর (যদি থাকে)"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <div className="rounded-3xl border border-slate-200 p-5">
          <h2 className="mb-4 text-lg font-bold text-slate-800">বর্তমান ঠিকানা</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <FormInput label="গ্রাম" required error={errors.presentVillage?.message} {...register("presentVillage")} />
            <FormInput label="পোস্ট" required error={errors.presentPost?.message} {...register("presentPost")} />
            <FormInput label="থানা" required error={errors.presentThana?.message} {...register("presentThana")} />
            <FormInput label="জেলা" required error={errors.presentDistrict?.message} {...register("presentDistrict")} />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 p-5">
          <h2 className="mb-4 text-lg font-bold text-slate-800">স্থায়ী ঠিকানা</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <FormInput label="গ্রাম" required error={errors.permanentVillage?.message} {...register("permanentVillage")} />
            <FormInput label="পোস্ট" required error={errors.permanentPost?.message} {...register("permanentPost")} />
            <FormInput label="থানা" required error={errors.permanentThana?.message} {...register("permanentThana")} />
            <FormInput label="জেলা" required error={errors.permanentDistrict?.message} {...register("permanentDistrict")} />
          </div>
        </div>

        <FormInput
          label="বিশেষজ্ঞতা"
          placeholder="যদি থাকে"
          error={errors.specialty?.message}
          {...register("specialty")}
        />

        {/* শিক্ষাগত যোগ্যতা: disable all fields & controls */}
        <div className="rounded-3xl border border-slate-200 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-800">শিক্ষাগত যোগ্যতা</h2>
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-400 bg-slate-50 cursor-not-allowed"
              disabled
              tabIndex={-1}
            >
              + আরও যোগ করুন
            </button>
          </div>

          <div className="space-y-5">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-2xl border border-slate-200 p-4 opacity-70 pointer-events-none">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">শিক্ষাগত তথ্য #{index + 1}</p>
                  {fields.length > 1 ? (
                    <button
                      type="button"
                      className="text-sm font-semibold text-red-300 cursor-not-allowed"
                      disabled
                      tabIndex={-1}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormInput
                    label="ডিগ্রির নাম"
                    required
                    error={errors.educationEntries?.[index]?.degree?.message}
                    {...register(`educationEntries.${index}.degree`)}
                    readOnly
                  />
                  <FormInput
                    label="ইনস্টিটিউটের নাম"
                    required
                    error={errors.educationEntries?.[index]?.institution?.message}
                    {...register(`educationEntries.${index}.institution`)}
                    readOnly
                  />
                  <FormInput
                    label="বিশ্ববিদ্যালয়ের নাম"
                    required
                    error={errors.educationEntries?.[index]?.result?.message}
                    {...register(`educationEntries.${index}.result`)}
                    readOnly
                  />
                  <FormInput
                    label="পাসের বছর"
                    required
                    error={errors.educationEntries?.[index]?.passingYear?.message}
                    {...register(`educationEntries.${index}.passingYear`)}
                    readOnly
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 p-5">
          <h2 className="mb-4 text-lg font-bold text-slate-800">ফি সংক্রান্ত তথ্য</h2>
          <div className="grid gap-5 md:grid-cols-3">
            <FormInput type="number" label="এন্ট্রি ফি" error={errors.entryFee?.message} {...register("entryFee", { valueAsNumber: true })} />
            <FormInput type="number" label="বার্ষিক ফি" error={errors.annualFee?.message} {...register("annualFee", { valueAsNumber: true })} />
            <FormInput type="number" label="লাইফটাইম ফি" error={errors.lifetimeFee?.message} {...register("lifetimeFee", { valueAsNumber: true })} />
          </div>

          <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            মোট ফি: {totalFee} টাকা
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 p-5">
          <h2 className="mb-4 text-lg font-bold text-slate-800">কর্মস্থলের ধরন</h2>
          <Controller
            control={control}
            name="workplaceTypes"
            render={({ field }) => (
              <div className="grid gap-3 md:grid-cols-2">
                {workplaceOptions.map((option) => {
                  const checked = field.value?.includes(option);
                  return (
                    <label
                      key={option}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...(field.value || []), option]);
                          } else {
                            field.onChange((field.value || []).filter((item) => item !== option));
                          }
                        }}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            )}
          />
        </div>

        <FormTextarea
          label="নোট"
          placeholder="অতিরিক্ত কিছু লিখতে চাইলে লিখুন"
          error={errors.notes?.message}
          {...register("notes")}
        />

        <Controller
          control={control}
          name="profileImage"
          render={({ field: { onChange } }) => (
            <FormFileInput
              label="প্রোফাইল ছবি (নতুন ছবি দিতে চাইলে নির্বাচন করুন)"
              accept="image/*"
              error={(errors.profileImage as { message?: string } | undefined)?.message}
              onChange={(file) => onChange(file || undefined)}            />
          )}
        />

        <label className="flex items-start gap-3 rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700 opacity-60 pointer-events-none">
          <input type="checkbox" className="mt-1" {...register("declarationAccepted")} disabled tabIndex={-1} />
          <span>আমি ঘোষণা করছি যে, উপরে দেওয়া সকল তথ্য সঠিক।</span>
        </label>
        {errors.declarationAccepted?.message ? (
          <p className="text-sm text-red-600">{errors.declarationAccepted.message}</p>
        ) : null}

        <div className="flex flex-wrap justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push("/admin/members")}
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            বাতিল
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-2xl bg-[var(--brand-green)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
          </button>
        </div>
      </form>
    </div>
  );
}