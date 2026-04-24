"use client";

import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { FormFileInput } from "@/components/join/form-file-input";
import { FormInput } from "@/components/join/form-input";
import { FormTextarea } from "@/components/join/form-textarea";
import {
  joinApplicationSchema,
  type JoinApplicationFormValues,
} from "@/lib/validations/join";
import { createMember } from "@/lib/admin/dashboard-api";

export default function AddMemberForm() {
  const router = useRouter();

  const workplaceOptions = [
    "সরকারি",
    "স্বায়ত্তশাসিত/চার্চ প্রতিষ্ঠান",
    "বেসরকারি",
    "প্রাইভেট",
    "অন্যান্য",
  ];

  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JoinApplicationFormValues>({
    resolver: zodResolver(joinApplicationSchema),
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educationEntries",
  });

  const entryFee = Number(watch("entryFee") || 0);
  const annualFee = Number(watch("annualFee") || 0);
  const lifetimeFee = Number(watch("lifetimeFee") || 0);
  const totalFee = entryFee + annualFee + lifetimeFee;

  const onSubmit = async (values: JoinApplicationFormValues) => {
    setSubmitSuccess("");
    setSubmitError("");

    try {
      const formData = new FormData();

      formData.append("fullNameBn", values.fullNameBn);
      formData.append("fullNameEn", values.fullNameEn);
      formData.append("fatherName", values.fatherName);
      formData.append("motherName", values.motherName);
      formData.append("dateOfBirth", values.dateOfBirth);
      formData.append("nationalId", values.nationalId);
      formData.append("medicalRegNo", values.medicalRegNo);
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
      formData.append("declarationAccepted", String(values.declarationAccepted));
      formData.append("notes", values.notes || "");

      formData.append("educationEntries", JSON.stringify(values.educationEntries));
      formData.append("workplaceTypes", JSON.stringify(values.workplaceTypes || []));

      if (values.profileImage && values.profileImage instanceof File) {
        formData.append("profileImage", values.profileImage);
      }

      await createMember(formData); // Calling The API Function

      setSubmitSuccess("মেম্বার সফলভাবে যোগ করা হয়েছে।");
      reset();
      setTimeout(() => {
        router.push("/admin/members");
      }, 800);
    } catch (error: any) {
        console.error(error);
        setSubmitError(
          error?.response?.data?.message || 
          "মেম্বার যোগ করতে সমস্যা হয়েছে।"
        );
      }
  };

  // This function solves the event.target.files typing/compat issue
  function handleProfileImageChange(eventOrFile: any, onChange: (file: File | null) => void) {
    // Accept both direct file and input change event
    if (eventOrFile && typeof eventOrFile === "object") {
      if ("target" in eventOrFile && eventOrFile.target && eventOrFile.target.files) {
        // Normal event from <input type="file" />. e.g. event: React.ChangeEvent<HTMLInputElement>
        const files = (eventOrFile.target as HTMLInputElement).files;
        onChange(files && files[0] ? files[0] : null);
      } else if (eventOrFile instanceof File) {
        onChange(eventOrFile);
      } else {
        onChange(null);
      }
    } else {
      onChange(null);
    }
  }

  return (
    <div className="rounded-4xl border border-slate-200 bg-white shadow-sm sm:p-8 lg:p-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">নতুন মেম্বার যোগ করুন</h1>
          <p className="mt-2 text-sm text-slate-600">
            নিচের ফর্ম পূরণ করে নতুন মেম্বার যুক্ত করুন।
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

      <p className="text-xs">
        <span className="text-red-500">*</span> চিহ্নিত ঘরগুলো বাধ্যতামূলক।
      </p>

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
          />
          <FormInput
            label="চিকিৎসা নিবন্ধন নম্বর"
            required
            placeholder="রেজিস্ট্রেশন নম্বর লিখুন"
            error={errors.medicalRegNo?.message}
            {...register("medicalRegNo")}
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

        <div className="rounded-3xl border border-slate-200 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-800">শিক্ষাগত যোগ্যতা</h2>
            <button
              type="button"
              onClick={() =>
                append({
                  degree: "",
                  institution: "",
                  result: "",
                  passingYear: "",
                })
              }
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              + আরও যোগ করুন
            </button>
          </div>

          <div className="space-y-5">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">শিক্ষাগত তথ্য #{index + 1}</p>
                  {fields.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-sm font-semibold text-red-600"
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
                  />
                  <FormInput
                    label="ইনস্টিটিউটের নাম"
                    required
                    error={errors.educationEntries?.[index]?.institution?.message}
                    {...register(`educationEntries.${index}.institution`)}
                  />
                  <FormInput
                    label="বিশ্ববিদ্যালয়ের নাম"
                    required
                    error={errors.educationEntries?.[index]?.result?.message}
                    {...register(`educationEntries.${index}.result`)}
                  />
                  <FormInput
                    label="পাসের বছর"
                    required
                    error={errors.educationEntries?.[index]?.passingYear?.message}
                    {...register(`educationEntries.${index}.passingYear`)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 p-5">
          <h2 className="mb-4 text-lg font-bold text-slate-800">ফি সংক্রান্ত তথ্য</h2>
          <div className="grid gap-5 md:grid-cols-3">
            <FormInput type="number" label="এন্ট্রি ফি" error={errors.entryFee?.message} {...register("entryFee")} />
            <FormInput type="number" label="বার্ষিক ফি" error={errors.annualFee?.message} {...register("annualFee")} />
            <FormInput type="number" label="লাইফটাইম ফি" error={errors.lifetimeFee?.message} {...register("lifetimeFee")} />
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
              label="প্রোফাইল ছবি"
              required
              accept="image/*"
              error={(errors.profileImage as { message?: string } | undefined)?.message}
              onChange={event => handleProfileImageChange(event, onChange)}
            />
          )}
        />

        <label className="flex items-start gap-3 rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700">
          <input type="checkbox" className="mt-1" {...register("declarationAccepted")} />
          <span>
            আমি ঘোষণা করছি যে, উপরে দেওয়া সকল তথ্য সঠিক।
          </span>
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
            {isSubmitting ? "সংরক্ষণ হচ্ছে..." : "মেম্বার সংরক্ষণ করুন"}
          </button>
        </div>
      </form>
    </div>
  );
}