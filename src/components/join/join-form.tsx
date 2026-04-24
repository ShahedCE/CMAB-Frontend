"use client";

import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFileInput } from "@/components/join/form-file-input";
import { FormInput } from "@/components/join/form-input";
import { FormTextarea } from "@/components/join/form-textarea";
import {
  joinApplicationSchema,
  type JoinApplicationFormValues,
} from "@/lib/validations/join";
import { createJoinRequest } from "@/lib/admin/dashboard-api";

export default function JoinFormWithHeader() {
  return (
    <div className="rounded-4xl border border-slate-200 bg-white shadow-sm sm:p-8 lg:p-10">
      {/* Association Name and Address */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center text-slate-800">
          খ্রিস্টান চিকিৎসক ও স্বাস্থ্যকর্মী সংগঠন বাংলাদেশ
        </h2>
        <p className="text-center text-sm text-slate-600 mt-2">
          জাতীয় চার্চ পরিষদ, বাংলাদেশ ।
          <br />
          ৩৯৫ নিউ ইসকাটন রোড, ঢাকা-১২১৭
        </p>
      </div>
      <JoinForm />
    </div>
  );
}

export function JoinForm() {
  const workplaceOptions = [
    "সরকারি",
    "স্বায়ত্তশাসিত/চার্চ প্রতিষ্ঠান",
    "বেসরকারি",
    "প্রাইভেট",
    "অন্যান্য",
  ];

  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");

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

  const onSubmit = async (payload: any) => {
    setSubmitSuccess("");
    setSubmitError("");
    try {
      const formData = new FormData();

      // 🔹 simple fields
      Object.entries(payload).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        // 🔥 special cases handle নিচে
        if (key === "educationEntries" || key === "workplaceTypes") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "profileImage") {
          formData.append("profileImage", value as File);
        } else {
          formData.append(key, String(value));
        }
      });

      await createJoinRequest(formData);

      // Show bangla success message just top of the submission button
      setSubmitSuccess("✅ আবেদন সফলভাবে জমা হয়েছে। ধন্যবাদ! আপনার আবেদন প্রক্রিয়া শেষে ই-মেইল/ফোনে জানানো হবে।");

      // Clear input fields by resetting form
      reset({
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
      });

    } catch (err) {
      console.error(err);
      setSubmitError("আবেদন জমা দিতে ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="rounded-4xl border border-slate-200 bg-white  shadow-sm sm:p-8 lg:p-10">
      {/* Association Name and Address */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center text-slate-800">
          খ্রিস্টিয়ান মেডিক্যাল অ্যাসোসিয়েশন বাংলাদেশ (সিএমএবি)
        </h2>
        <p className="text-center text-sm text-slate-600 mt-2">
          সরকারি নিবন্ধন নং: ঢ ০১২২
        </p>
        <p className="text-center text-sm text-slate-600 mt-2">
          জাতীয় চার্চ পরিষদ, বাংলাদেশ ।
          ৩৯৫ নিউ ইসকাটন রোড, ঢাকা-১২১৭
        </p>
      </div>

      <p className=" text-xs">
        <span className="text-red-500">*</span> চিহ্নিত ঘরগুলো বাধ্যতামূলক।
      </p>

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
            className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm text-slate-900 outline-none transition-all duration-200 ${
              errors.membershipType
                ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                : "border-slate-200 focus:border-(--brand-green) focus:ring-4 focus:ring-[rgba(10,163,79,0.12)]"
            }`}
            {...register("membershipType")}
          >
            <option value="">সদস্যের ধরন নির্বাচন করুন</option>
            <option value="general">সাধারণ সদস্য</option>
            <option value="light">লাইট সদস্য</option>
            <option value="irregular">অনিয়মিত সদস্য</option>
          </select>
          {errors.membershipType ? (
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
            label="মোবাইল নম্বর"
            required
            type="tel"
            placeholder="আপনার মোবাইল নম্বর লিখুন"
            error={errors.mobile?.message}
            {...register("mobile")}
          />
        </div>

        <FormInput
          label="ফোন নম্বর"
          type="tel"
          placeholder="আপনার ফোন নম্বর (ঐচ্ছিক)"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-800">বর্তমান ঠিকানা</h3>
          <div className="mt-3 grid gap-5 md:grid-cols-2">
            <FormInput
              label="গ্রাম"
              required
              placeholder="বর্তমান গ্রামের নাম"
              error={errors.presentVillage?.message}
              {...register("presentVillage")}
            />
            <FormInput
              label="পোস্ট"
              required
              placeholder="বর্তমান পোস্টের নাম"
              error={errors.presentPost?.message}
              {...register("presentPost")}
            />
            <FormInput
              label="থানা"
              required
              placeholder="বর্তমান থানা"
              error={errors.presentThana?.message}
              {...register("presentThana")}
            />
            <FormInput
              label="জেলা"
              required
              placeholder="বর্তমান জেলা"
              error={errors.presentDistrict?.message}
              {...register("presentDistrict")}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-800">স্থায়ী ঠিকানা</h3>
          <div className="mt-3 grid gap-5 md:grid-cols-2">
            <FormInput
              label="গ্রাম"
              required
              placeholder="স্থায়ী গ্রামের নাম"
              error={errors.permanentVillage?.message}
              {...register("permanentVillage")}
            />
            <FormInput
              label="পোস্ট"
              required
              placeholder="স্থায়ী পোস্টের নাম"
              error={errors.permanentPost?.message}
              {...register("permanentPost")}
            />
            <FormInput
              label="থানা"
              required
              placeholder="স্থায়ী থানা"
              error={errors.permanentThana?.message}
              {...register("permanentThana")}
            />
            <FormInput
              label="জেলা"
              required
              placeholder="স্থায়ী জেলা"
              error={errors.permanentDistrict?.message}
              {...register("permanentDistrict")}
            />
          </div>
        </div>

        <FormInput
          label="বিশেষজ্ঞ হলে বিষয়"
          placeholder="যদি থাকে লিখুন"
          error={errors.specialty?.message}
          {...register("specialty")}
        />

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-slate-800">
              শিক্ষাগত যোগ্যতা<span className="text-red-500">*</span>
            </h3>
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
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-(--brand-green) hover:text-(--brand-green-dark)"
            >
              + নতুন সারি যোগ করুন
            </button>
          </div>

          <div className="mt-3 grid gap-3">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="mb-2 text-xs font-semibold text-slate-600 md:hidden">সারি {index + 1}</p>
                <div className="grid gap-3 md:grid-cols-[1.1fr_1.2fr_1fr_0.7fr_0.35fr] md:items-start">
                  <FormInput
                    label="ডিগ্রি/পরীক্ষার নাম"
                    required
                    placeholder="যেমন: MBBS"
                    error={errors.educationEntries?.[index]?.degree?.message}
                    {...register(`educationEntries.${index}.degree`)}
                    className="md:h-11"
                  />
                  <FormInput
                    label="শিক্ষা প্রতিষ্ঠানের নাম"
                    required
                    placeholder="প্রতিষ্ঠানের নাম লিখুন"
                    error={errors.educationEntries?.[index]?.institution?.message}
                    {...register(`educationEntries.${index}.institution`)}
                    className="md:h-11"
                  />
                  <FormInput
                    label="বিশ্ববিদ্যালয়"
                    required
                    placeholder="বিশ্ববিদ্যালয়ের নাম লিখুন"
                    error={errors.educationEntries?.[index]?.result?.message}
                    {...register(`educationEntries.${index}.result`)}
                    className="md:h-11"
                  />
                  <FormInput
                    label="পাশের বছর"
                    required
                    type="text"
                    placeholder="যেমন: ২০২৪"
                    error={errors.educationEntries?.[index]?.passingYear?.message}
                    {...register(`educationEntries.${index}.passingYear`)}
                    className="md:h-11"
                  />
                  <div className="md:pt-8 md:text-right">
                    {fields.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="rounded-lg px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        সরান
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">-</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {errors.educationEntries?.message ? (
            <p className="mt-2 text-sm text-red-600">{errors.educationEntries.message}</p>
          ) : null}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-800">ফি ও চাঁদা তথ্য</h3>
          <div className="grid gap-5 md:grid-cols-3">
            <FormInput
              label="প্রবেশ ফি (টাকা)"
              required
              type="number"
              min={0}
              placeholder="যেমন: 500"
              error={errors.entryFee?.message}
              {...register("entryFee", { valueAsNumber: true })}
            />
            <FormInput
              label="বার্ষিক চাঁদা (টাকা)"
              required
              type="number"
              min={0}
              placeholder="যেমন: 1000"
              error={errors.annualFee?.message}
              {...register("annualFee", { valueAsNumber: true })}
            />
            <FormInput
              label="আজীবন সদস্য চাঁদা (টাকা)"
              required
              type="number"
              min={0}
              placeholder="যেমন: 5000"
              error={errors.lifetimeFee?.message}
              {...register("lifetimeFee", { valueAsNumber: true })}
            />
          </div>

          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
            মোট পরিমাণ: {totalFee} টাকা
          </div>

          <p className="mt-2 text-xs text-slate-600">
            প্রদত্ত অর্থপ্রদান সংক্রান্ত তথ্য যাচাই করা হবে। নিশ্চিত হয়ে তথ্য প্রদান করুন।
          </p>
        </section>

        <fieldset className="space-y-3 rounded-2xl border border-slate-200 p-4">
          <legend className="px-1 text-sm font-semibold text-slate-800">
            কর্মক্ষেত্র (নিয়োগ)<span className="text-red-500">*</span>
          </legend>
          <div className="grid gap-3 md:grid-cols-2">
            {workplaceOptions.map((option) => (
              <label key={option} className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  value={option}
                  className="h-4 w-4 rounded border-slate-300 text-(--brand-green) focus:ring-(--brand-green)"
                  {...register("workplaceTypes")}
                />
                {option}
              </label>
            ))}
          </div>
          {errors.workplaceTypes ? (
            <p className="text-sm text-red-600">{errors.workplaceTypes.message}</p>
          ) : null}
        </fieldset>

        <FormTextarea
          label="সংক্ষিপ্ত তথ্য"
          required
          placeholder="আপনার আবেদন সম্পর্কিত সংক্ষিপ্ত তথ্য লিখুন"
          error={errors.notes?.message}
          {...register("notes")}
        />

        <Controller
          name="profileImage"
          control={control}
          render={({ field }: { field: any }) => (
            <FormFileInput
              label="প্রোফাইল ছবি"
              required
              accept="image/png,image/jpeg,image/jpg,image/webp"
              error={errors.profileImage?.message}
              onChange={(file) => field.onChange(file)}
            />
          )}
        />

        <label className="inline-flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-(--brand-green) focus:ring-(--brand-green)"
            {...register("declarationAccepted")}
          />
          <span>
            আমি ঘোষণা করছি যে, উপরের প্রদত্ত তথ্য আমার জানা মতে সঠিক এবং সদস্যপদের
            জন্য আবেদন করতে ইচ্ছুক।
          </span>
        </label>
        {errors.declarationAccepted ? (
          <p className="text-sm text-red-600">{errors.declarationAccepted.message}</p>
        ) : null}

        {/* Success message: Just above the button */}
        {submitSuccess ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 mb-2">
            {submitSuccess}
          </div>
        ) : null}

        {submitError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-2">
            {submitError}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-(--brand-green)
           px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(10,163,79,0.22)] 
           transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--brand-green-dark) 
           hover:shadow-[0_16px_30px_rgba(10,163,79,0.28)] disabled:cursor-not-allowed disabled:opacity-70 
           disabled:hover:translate-y-0"
        >
          {isSubmitting ? "জমা দেওয়া হচ্ছে..." : "সদস্যপদের আবেদন জমা দিন"}
        </button>
      </form>
    </div>
  );
}
