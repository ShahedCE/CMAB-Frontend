import type { JoinApplicationPayload } from "@/types/join";

export async function submitApplication(payload: JoinApplicationPayload) {
  // Placeholder for future backend integration.
  // Later this function will:
  // 1. Upload profile image
  // 2. Insert application data into database
  // 3. Trigger admin notification (dashboard alert / email / both)

  // Example future API structure:
  // const formData = new FormData();
  // formData.append("fullName", payload.fullName);
  // formData.append("email", payload.email);
  // formData.append("phone", payload.phone);
  // formData.append("organization", payload.organization ?? "");
  // formData.append("roleInterest", payload.roleInterest);
  // formData.append("profileImage", payload.profileImage);
  //
  // const response = await fetch("/api/join", {
  //   method: "POST",
  //   body: formData,
  // });
  //
  // if (!response.ok) {
  //   throw new Error("Failed to submit application");
  // }
  //
  // return response.json();

  console.log("Submitting join application:", payload);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Application submitted successfully",
  };
}