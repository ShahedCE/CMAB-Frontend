"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFileInput } from "@/components/join/form-file-input";
import { FormInput } from "@/components/join/form-input";
import { FormTextarea } from "@/components/join/form-textarea";
import {
  joinApplicationSchema,
  type JoinApplicationFormValues,
} from "@/lib/validations/join";
import { submitApplication } from "@/lib/submit-application";

export function JoinForm() {
  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JoinApplicationFormValues>({
    resolver: zodResolver(joinApplicationSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      roleInterest: "",
    },
  });

  const onSubmit = async (values: JoinApplicationFormValues) => {
    setSubmitSuccess("");
    setSubmitError("");

    try {
      const payload = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        organization: values.organization || "",
        roleInterest: values.roleInterest,
        profileImage: values.profileImage,
      };

      console.log("Validated application data:", payload);

      await submitApplication(payload);

      setSubmitSuccess("Your membership request has been submitted successfully.");
      reset();
    } catch (error) {
      console.error(error);
      setSubmitError("Something went wrong while submitting the form. Please try again.");
    }
  };

  return (
    <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
      <div className="max-w-2xl">
        <span className="inline-flex rounded-full bg-(--brand-green-soft) px-3 py-1 text-xs font-semibold 
        tracking-[0.16em] text-(--brand-green-dark)">
          MEMBER REQUEST
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Join CMAB
        </h1>

        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
          Fill out the form below to request membership. Your information will be
          reviewed by the team before approval.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-5">
        <FormInput
          label="Full Name"
          required
          placeholder="Enter your full name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <FormInput
            label="Email"
            type="email"
            required
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
          />

          <FormInput
            label="Phone Number"
            required
            type="tel"
            placeholder="Enter your phone number"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        <FormInput
          label="University/Organization"
          placeholder="Enter your university or organization"
          error={errors.organization?.message}
          {...register("organization")}
        />

        <FormTextarea
          label="Role/Interest"
          required
          placeholder="Tell us about your role, interest, or why you want to join"
          error={errors.roleInterest?.message}
          {...register("roleInterest")}
        />

        <Controller
          name="profileImage"
          control={control}
          render={({ field }: { field: any }) => (
            <FormFileInput
              label="Profile Image"
              required
              accept="image/png,image/jpeg,image/jpg,image/webp"
              error={errors.profileImage?.message}
              onChange={(file) => field.onChange(file)}
            />
          )}
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
           hover:shadow-[0_16px_30px_rgba(10,163,79,0.28)] disabled:cursor-not-allowed disabled:opacity-70 
           disabled:hover:translate-y-0"
        >
          {isSubmitting ? "Submitting..." : "Submit Membership Request"}
        </button>
      </form>
    </div>
  );
}