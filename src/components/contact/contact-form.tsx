"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/contact/form-input";
import { FormTextarea } from "@/components/contact/form-textarea";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { submitContactMessage } from "@/lib/submit-contact-message";

export function ContactForm() {
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  const {
    register, handleSubmit,reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitSuccess("");
    setSubmitError("");

    try {
      const payload = {
        name: values.name,
        email: values.email,
        message: values.message,
      };

      console.log("Validated contact form data:", payload);

      await submitContactMessage(payload);

      setSubmitSuccess("আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।");
      reset();
    } catch (error) {
      console.error(error);
      setSubmitError("কিছু সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
      <div className="max-w-xl">
        <span className="inline-flex rounded-full bg-(--brand-green-soft) px-3 py-1 text-xs font-semibold
         tracking-[0.16em] text-(--brand-green-dark)">
          বার্তা পাঠান
        </span>

        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
         যোগাযোগ ফর্ম
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600">
        ফর্মটি পূরণ করুন—আমাদের টিম যত দ্রুত সম্ভব আপনার সাথে যোগাযোগ করবে।       
         </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-5">
        <FormInput
          label="নাম"
          placeholder="আপনার নাম লিখুন"
          requiredMark
          error={errors.name?.message}
          {...register("name")}
        />

        <FormInput
          label="ইমেইল"
          type="text"
          placeholder="আপনার ইমেইল লিখুন"
          requiredMark
          error={errors.email?.message}
          {...register("email")}
        />

        <FormTextarea
          label="বার্তা"
          placeholder="আপনার বার্তা লিখুন"
          requiredMark
          error={errors.message?.message}
          {...register("message")}
        />

        {submitSuccess ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {submitSuccess}
          </div>
        ) : null}

        {submitError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-(--brand-green) 
          px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(10,163,79,0.22)]
           transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--brand-green-dark)
            hover:shadow-[0_16px_30px_rgba(10,163,79,0.28)] disabled:cursor-not-allowed
             disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isSubmitting ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
        </button>
      </form>
    </div>
  );
}