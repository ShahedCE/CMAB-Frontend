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
    "সরকারি / Government",
    "স্বায়ত্তশাসিত/চার্চ প্রতিষ্ঠান / Autonomous/Church Institution",
    "বেসরকারি / Non-government",
    "প্রাইভেট / Private",
    "অন্যান্য / Other",
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
      //fullNameEn: "",
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
        if (key === "educationEntries" || key === "workplaceTypes") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "profileImage") {
          formData.append("profileImage", value as File);
        } else {
          formData.append(key, String(value));
        }
      });

      await createJoinRequest(formData);

      setSubmitSuccess(
        "Your application was submitted successfully. Thank you! We will notify you via email or phone once your application has been processed."
      );

      reset({
        fullNameBn: "",
       // fullNameEn: "",
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
    } catch (err:any) {
      console.log(err.response?.data);
      console.log(err.response?.status);
      console.error(err);
      setSubmitError(
        "Failed to submit your application. Please try again."
   
      );
    }
  };

  return ( <> 
          {/* Membership Rules Section */}
<section className="mb-8 rounded-3xl border border-emerald-100 bg-emerald-50/40 p-4 text-slate-800 sm:p-6 lg:p-10">
  <div className="text-center">
    <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold text-emerald-700">
      সদস্য পদ সংক্রান্ত নিয়মাবলী
    </span>

    <h2 className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl">
      ধারা-০৭ : সদস্য পদ
    </h2>

    <p className="mt-1 text-sm font-semibold text-emerald-700">
      সদস্যদের যোগ্যতা
    </p>
  </div>

  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-9">
    {/* First col: membership eligibility, job types */}
    <div className="space-y-6 text-base leading-8 text-slate-700">
      <p>
        <strong>(ক)</strong> সংস্থার মূলনীতি, আদর্শ ও উদ্দেশ্যের প্রতি
        আস্থাশীল এবং সংস্থার গঠনতন্ত্র মেনে চলতে সম্মত খ্রীষ্ট বিশ্বাসী
        বাংলাদেশী স্বাস্থ্যসেবাকর্মী এমন ১৮ বছর বা তার ঊর্ধ্ব বয়স্ক নারী-পুরুষ
        সিএমএবি’র সদস্য পদের জন্য আবেদন করতে পারবেন।
      </p>

      <p>
        <strong>(খ)</strong> সংস্থার পূর্ণ সদস্য পদ লাভে আবেদনযোগ্য স্বাস্থ্যসেবা
        কর্মীর সংজ্ঞা ও চাকুরিতে পদসমূহ: পূর্ণ সদস্য বলতে ভোটাধিকার ও নির্বাচনে
        প্রতিদ্বন্দ্বীযোগ্য সদস্যকে বুঝাবে।
      </p>

      <div>
        <p className="font-semibold text-slate-900">
          (গ) প্রত্যক্ষভাবে স্বাস্থ্যসেবা প্রদানকারী জনবল ও চাকুরি পদবী:
        </p>

        <ol className="mt-2 list-decimal space-y-1 pl-6">
          <li>রেজিস্টার্ড চিকিৎসক</li>
          <li>রেজিস্টার্ড ডেন্টিস্ট</li>
          <li>রেজিস্টার্ড নার্স</li>
          <li>
            রেজিস্টার্ড প্যারামেডিকস, ল্যাব টেকনিশিয়ান, রেডিওগ্রাফার,
            ফার্মাসিস্ট, মেডিকেল অ্যাসিস্ট্যান্ট, ফিজিওথেরাপিস্ট।
          </li>
          <li>
            স্বাস্থ্য ও পরিবার পরিকল্পনা অধিদপ্তর কর্তৃক অনুমোদিত
            প্রশিক্ষণপ্রাপ্ত স্বাস্থ্যকর্মী।
          </li>
          <li>প্রশিক্ষিত পেশেন্ট কাউন্সিলর ও প্রাথমিক স্বাস্থ্যসেবা প্রদানকারী।</li>
          <li>
            মেডিকেল, ডেন্টাল, নার্সিং ও প্যারামেডিকেল ও মেডিকেল টেকনিশিয়ান
            কোর্সে অধ্যয়নরত ছাত্র-ছাত্রী।
          </li>
          <li>
            পরোক্ষভাবে স্বাস্থ্যসেবা প্রদানে সাহায্যকারী জনবল ও পদবী: স্বাস্থ্য
            প্রতিষ্ঠান, বিশেষভাবে মিশন হাসপাতাল ও ক্লিনিকের পরিচালক ও
            অর্থব্যবস্থাপক।
          </li>
        </ol>
      </div>
    </div>

    {/* Second col: fees and rules */}
    <div className="space-y-6 text-base leading-8 text-slate-700">
      <div>
        <p className="font-semibold text-slate-900">(ঘ) সদস্য পদে চাঁদার হার:</p>

        <div className="mt-2 space-y-3">
          <p>
            <strong>১। আজীবন সদস্য পদে চাঁদার হার:</strong> এককালীন ভর্তি ফি
            ৩০০/- টাকা, সদস্য চাঁদা ৩০০০/- টাকা যা এককালীন পরিশোধযোগ্য।
          </p>

          <p>
            <strong>২। সাধারণ সদস্য পদে চাঁদার হার:</strong> ভর্তি ফি এককালীন
            ২০০/- টাকা সব সদস্যের জন্য প্রযোজ্য; বার্ষিক চাঁদা হার নিম্নরূপ:
          </p>

          <ul className="list-disc space-y-1 pl-6">
            <li>চিকিৎসক বার্ষিক চাঁদা: ৪০০/- টাকা।</li>
            <li>নার্স, টেকনিশিয়ান, প্যারামেডিক ও অন্যান্য: ৩০০/- টাকা।</li>
            <li>নার্সিং, মেডিকেল ও ডেন্টাল ছাত্র-ছাত্রী: ২০০/- টাকা।</li>
          </ul>
        </div>
      </div>

      <div>
        <p className="font-semibold text-slate-900">(ঙ) সদস্য পদ লাভের নিয়মাবলী:</p>

        <p className="mt-2">
          সংগঠনের নির্ধারিত ফরমে একজন কেন্দ্রীয় কার্যনির্বাহী সদস্যের
          সুপারিশক্রমে আবেদনকারী আবেদন পত্র জমা দিবেন। সুপারিশকারী ধারা-০৭ এর
          উপধারা (ক) ও (খ) সঠিকভাবে যাচাই করবেন এবং আবেদন পত্রটি গ্রহণ করে
          পরবর্তী কার্যনির্বাহী সভায় পেশ করবেন। কার্যনির্বাহী সভায় আবেদনপত্র
          সর্বসম্মতিতে গৃহীত হলে পর সংগঠনের নির্ধারিত ভর্তি ফি ও বার্ষিক
          চাঁদা/আজীবন সদস্য চাঁদা পরিশোধ করে সাধারণ সদস্য পদ/আজীবন সদস্য পদ লাভ
          করবেন।
        </p>

        <p className="mt-2">
          অতঃপর সংগঠনের সাধারণ সম্পাদক নির্ধারিত ফরমে অভিনন্দন জ্ঞাপনপূর্বক
          সদস্য পদের ধরণ ও সদস্য নং নতুন সদস্যকে জানিয়ে দেবেন।
        </p>

        <p className="mt-2">
          প্রকাশ থাকে যে, কার্যনির্বাহী সভায় যদি একজন সদস্য ধারা-০৭ এর উপধারা
          (ক) অথবা (খ) এর আলোকে কোন সুনির্দিষ্ট প্রশ্ন উত্থাপন করেন, যে বিষয়ে
          সুপারিশকারী অবগত নন, সেক্ষেত্রে সদস্য পদ অনুমোদন স্থগিত করে
          পুনঃনিরীক্ষণ করা হবে।
        </p>

        <p className="mt-2">
          কার্যনির্বাহী সভা ব্যতীত বার্ষিক সাধারণ সভায় কোন নতুন সদস্যের আবেদন
          অনুমোদনের সুযোগ থাকবে না।
        </p>
      </div>
    </div>
  </div>

  <div className="mt-12 border-t border-emerald-100 pt-8">
    <h2 className="text-center text-xl font-bold text-slate-900 sm:text-2xl">
      ধারা-০৮ : সদস্য পদের ধরণ
    </h2>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-7 text-base leading-8 text-slate-700">
      <div className="space-y-5">
        <p>
          <strong>(ক) প্রতিষ্ঠাতা সদস্য-</strong> যে সকল ব্যক্তিবর্গের উদ্যোগে
          সংগঠনটি প্রতিষ্ঠিত হয়েছিল, তারাই সংগঠনের প্রতিষ্ঠাতা সদস্য হিসেবে
          বিবেচিত হবেন। প্রতিষ্ঠাতা সদস্যগণ ভোটাধিকার প্রয়োগ ও নির্বাচনে
          প্রতিদ্বন্দ্বিতা করতে পারবেন।
        </p>
        <p>
          <strong>(খ) আজীবন সদস্য:</strong> ধারা-০৭ এর উপধারা সমূহের সকল নির্দেশনা
          পূরণ সাপেক্ষে সংগঠন কর্তৃক নির্ধারিত এককালীন ভর্তি ফি ও আজীবন সদস্য ফি
          প্রদান করে আজীবন সদস্য পদ লাভ করা যাবে। আজীবন সদস্যগণ ভোট প্রদান ও
          নির্বাচনে প্রতিদ্বন্দ্বিতা করতে পারবেন।
        </p>
      </div>

      <div className="space-y-5">
        <p>
          <strong>(গ) সাধারণ সদস্য:</strong> ধারা-০৭ এর উপধারা সমূহের সকল নির্দেশনা
          পূরণ সাপেক্ষে সংগঠন কর্তৃক নির্ধারিত ভর্তি ফি ও বার্ষিক চাঁদা পরিশোধ
          পূর্বক সাধারণ সদস্য পদ লাভ করা যাবে। সাধারণ সদস্যগণ ভোট প্রদান ও
          নির্বাচনে প্রতিদ্বন্দ্বিতা করতে পারবেন।
        </p>
        <p>
          <strong>(ঘ) সহযোগী সদস্য:</strong> সংস্থার মূলনীতি, লক্ষ্য ও উদ্দেশ্যের
          সঙ্গে সহমত পোষণ করেন এমন সমাজ হিতৈষী ব্যক্তিগণ, হাসপাতালের পালক, বিদেশী
          ব্যক্তি যারা স্বাস্থ্য প্রতিষ্ঠানে কর্মরত, আর্থিক অনুদান কিংবা পরামর্শ
          প্রদানকারী ব্যক্তিদেরকে কার্যনির্বাহী পরিষদের অনুমোদনক্রমে সহযোগী সদস্য
          হিসেবে গ্রহণ করা যাবে। তবে তারা ভোটাধিকার প্রয়োগ বা নির্বাচনে
          প্রতিদ্বন্দ্বিতা করতে পারবেন না।
        </p>
      </div>
    </div>
  </div>
</section>
    <div className="rounded-4xl border border-slate-200 bg-white  shadow-sm sm:p-8 lg:p-10">

       {/* New div below "Join CMAB Form" */}
       <div className="flex justify-center my-2">
          <span className="inline-block bg-emerald-100 text-emerald-800 text-sm px-4 py-1 rounded-xl font-medium">
            Join CMAB Form
          </span>
        </div>
         {/* Association Name and Address */}
      <div className="mb-8 mt-4">
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Christian Medical Association Bangladesh (CMAB)
        </h2>

        <p className="text-center text-sm text-slate-600 mt-2">
          Government Registration No: DHA 0122
        </p>
        <p className="text-center text-sm text-slate-600 mt-2">
          National Council of Churches, Bangladesh.
          395 New Eskaton Road, Dhaka-1217
        </p>
      </div>
      <p className="ml-2 text-xs">
        <span className="text-red-500">*</span> Required fields.
      </p>
 

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 mb-4">
        <div className=" mb-4">

          <FormInput
            label="নাম (বাংলা) / Name (English)"
            required
            placeholder="Your name"
            error={errors.fullNameBn?.message}
            {...register("fullNameBn")}
          />
          </div>

          <div className="grid gap-5 md:grid-cols-2 mb-4">
            {/* "নাম (ইংরেজি)" field removed */}

            <FormInput
              label="জন্ম তারিখ / Date of Birth"
              type="date"
              required
              placeholder="Date of Birth"
              error={errors.dateOfBirth?.message}
              {...register("dateOfBirth")}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2 mb-4">
            <FormInput
              label="পিতার নাম / Father's Name"
              required
              placeholder="Father's name"
              error={errors.fatherName?.message}
              {...register("fatherName")}
            />

            <FormInput
              label="মাতার নাম / Mother's Name"
              required
              placeholder="Mother's name"
              error={errors.motherName?.message}
              {...register("motherName")}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2 mb-4">
            <FormInput
              label="জাতীয় পরিচয়পত্র নম্বর / National ID"
              required
              placeholder="National ID"
              error={errors.nationalId?.message}
              {...register("nationalId")}
            />

            <FormInput
              label="চিকিৎসা নিবন্ধন নম্বর / Medical Registration No"
              required
              placeholder="Medical Registration Number"
              error={errors.medicalRegNo?.message}
              {...register("medicalRegNo")}
            />
          </div>

          <div className="space-y-2 mb-4">
            <label className="block text-sm font-semibold text-slate-800">
              সদস্যের ধরন / Member Type<span className="text-red-500">*</span>
            </label>
            <select
              className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm text-slate-900 outline-none transition-all duration-200 ${
                errors.membershipType
                  ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-slate-200 focus:border-(--brand-green) focus:ring-4 focus:ring-[rgba(10,163,79,0.12)]"
              }`}
              {...register("membershipType")}
            >
              <option value="">সদস্যের ধরন নির্বাচন করুন / Select Member Type</option>
              <option value="general">সাধারণ সদস্য / General</option>
              <option value="life">লাইফ সদস্য / Life</option>
                       <option value="irregular">অনিয়মিত সদস্য / Irregular</option>
            </select>
            {errors.membershipType ? (
              <p className="text-sm text-red-600">
                {errors.membershipType.message}
              </p>
            ) : null}
          </div>

          <div className="mt-3 grid gap-5 md:grid-cols-2 mb-4">
            <FormInput
              label="ইমেইল / Email"
              type="email"
              required
              placeholder="Email address"
              error={errors.email?.message}
              {...register("email")}
            />

            <FormInput
              label="মোবাইল নম্বর / Mobile Number"
              required
              type="tel"
              placeholder="Mobile number"
              error={errors.mobile?.message}
              {...register("mobile")}
            />
          </div>
            <div className="mb-4"> 
          <FormInput
            label="ফোন নম্বর / Phone Number"
            type="tel"
            placeholder="Phone number (optional)"
            error={errors.phone?.message}
            {...register("phone")}
          />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 mb-4">
          <h3 className="text-sm font-semibold text-slate-800">বর্তমান ঠিকানা / Present Address</h3>
          <div className="mt-3 grid gap-5 md:grid-cols-2">
            <FormInput
              label="গ্রাম / Village"
              required
              placeholder="Present Village"
              error={errors.presentVillage?.message}
              {...register("presentVillage")}
            />
            <FormInput
              label="পোস্ট / Post"
              required
              placeholder="Present Post"
              error={errors.presentPost?.message}
              {...register("presentPost")}
            />
            <FormInput
              label="থানা / Thana"
              required
              placeholder="Present Thana"
              error={errors.presentThana?.message}
              {...register("presentThana")}
            />
            <FormInput
              label="জেলা / District"
              required
              placeholder="Present District"
              error={errors.presentDistrict?.message}
              {...register("presentDistrict")}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 mb-4">
          <h3 className="text-sm font-semibold text-slate-800">স্থায়ী ঠিকানা / Permanent Address</h3>
          <div className="mt-3 grid gap-5 md:grid-cols-2">
            <FormInput
              label="গ্রাম / Village"
              required
              placeholder="Permanent Village"
              error={errors.permanentVillage?.message}
              {...register("permanentVillage")}
            />
            <FormInput
              label="পোস্ট / Post"
              required
              placeholder="Permanent Post"
              error={errors.permanentPost?.message}
              {...register("permanentPost")}
            />
            <FormInput
              label="থানা / Thana"
              required
              placeholder="Permanent Thana"
              error={errors.permanentThana?.message}
              {...register("permanentThana")}
            />
            <FormInput
              label="জেলা / District"
              required
              placeholder="Permanent District"
              error={errors.permanentDistrict?.message}
              {...register("permanentDistrict")}
            />
          </div>
        </div>

        <div className="rounded-2xl  p-4">
          <FormInput
            label="বিশেষজ্ঞ হলে বিষয় / Specialty (if any)"
            placeholder="Specialty (if any)"
            error={errors.specialty?.message}
            {...register("specialty")}
          />
        </div>
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 mb-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-slate-800">
              শিক্ষাগত যোগ্যতা / Educational Qualifications <span className="text-red-500">*</span>
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
              + নতুন সারি যোগ করুন / Add new row
            </button>
          </div>

          <div className="mt-3 grid gap-3">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="mb-2 text-xs font-semibold text-slate-600 md:hidden">
                  সারি {index + 1} / Row {index + 1}
                </p>
                <div className="grid gap-3 md:grid-cols-[1.1fr_1.2fr_1fr_0.7fr_0.35fr] md:items-start">
                  <FormInput
                    label="ডিগ্রি/পরীক্ষার নাম / Degree/Exam Name"
                    required
                    placeholder="e.g. MBBS"
                    error={errors.educationEntries?.[index]?.degree?.message}
                    {...register(`educationEntries.${index}.degree`)}
                    className="md:h-11"
                  />
                  <FormInput
                    label="শিক্ষা প্রতিষ্ঠানের নাম / Institute Name"
                    required
                    placeholder="Institute name"
                    error={errors.educationEntries?.[index]?.institution?.message}
                    {...register(`educationEntries.${index}.institution`)}
                    className="md:h-11"
                  />
                  <FormInput
                    label="বিশ্ববিদ্যালয় / University"
                    required
                    placeholder="University name"
                    error={errors.educationEntries?.[index]?.result?.message}
                    {...register(`educationEntries.${index}.result`)}
                    className="md:h-11"
                  />
                  <FormInput
                    label="পাশের বছর / Passing Year"
                    required
                    type="text"
                    placeholder="e.g. 2024"
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
                        সরান / Remove
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
            <p className="mt-2 text-sm text-red-600">
              {errors.educationEntries.message}
            </p>
          ) : null}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 mb-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-800">
            ফি ও চাঁদা তথ্য / Fees & Dues Info
          </h3>
          <div className="grid gap-5 md:grid-cols-3">
            <FormInput
              label="প্রবেশ ফি (টাকা) / Entry Fee (Tk)"
              required
              type="number"
              min={0}
              placeholder="e.g. 500"
              error={errors.entryFee?.message}
              {...register("entryFee", { valueAsNumber: true })}
            />
            <FormInput
              label="বার্ষিক চাঁদা (টাকা) / Annual Dues (Tk)"
              required
              type="number"
              min={0}
              placeholder="e.g. 1000"
              error={errors.annualFee?.message}
              {...register("annualFee", { valueAsNumber: true })}
            />
            <FormInput
              label="আজীবন সদস্য চাঁদা (টাকা) / Lifetime Membership Fee (Tk)"
              required
              type="number"
              min={0}
              placeholder="e.g. 5000"
              error={errors.lifetimeFee?.message}
              {...register("lifetimeFee", { valueAsNumber: true })}
            />
          </div>

          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
            মোট পরিমাণ: {totalFee} টাকা / Total: {totalFee} Tk
          </div>

          <p className="mt-2 text-xs text-slate-600">
            প্রদত্ত অর্থপ্রদান সংক্রান্ত তথ্য যাচাই করা হবে। নিশ্চিত হয়ে তথ্য প্রদান করুন।<br />
            Payment information will be verified. Please double-check your input.
          </p>
        </section>

        <fieldset className="space-y-3 rounded-2xl border border-slate-200 p-4 mb-4">
          <legend className="px-1 text-sm font-semibold text-slate-800">
            কর্মক্ষেত্র (নিয়োগ) / Workplace Type<span className="text-red-500">*</span>
          </legend>
          <div className="grid gap-3 md:grid-cols-2">
            {workplaceOptions.map((option) => (
              <label
                key={option}
                className="inline-flex items-center gap-2 text-sm text-slate-700"
              >
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
            <p className="text-sm text-red-600">
              {errors.workplaceTypes.message}
            </p>
          ) : null}
        </fieldset>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 mb-2">
          <FormTextarea
            label="সংক্ষিপ্ত তথ্য / Additional Notes"
            required
            placeholder="Short info about your application"
            error={errors.notes?.message}
            {...register("notes")}
          />

          <Controller
            name="profileImage"
            control={control}
            render={({ field }: { field: any }) => (
              <FormFileInput
                label="প্রোফাইল ছবি / Profile Photo"
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
              জন্য আবেদন করতে ইচ্ছুক।<br />
              I declare that the information above is accurate to the best of my knowledge and I want to apply for membership.
            </span>
          </label>
          {errors.declarationAccepted ? (
            <p className="text-sm text-red-600">
              {errors.declarationAccepted.message}
            </p>
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
        </div>

        <div className="flex justify-center mb-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-(--brand-green)
             px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(10,163,79,0.22)] 
             transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--brand-green-dark) 
             hover:shadow-[0_16px_30px_rgba(10,163,79,0.28)] disabled:cursor-not-allowed disabled:opacity-70 
             disabled:hover:translate-y-0"
          >
            {isSubmitting
              ? "জমা দেওয়া হচ্ছে... / Submitting..."
              : "Submit Membership Application"}
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
