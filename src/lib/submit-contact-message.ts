import type { ContactMessagePayload } from "@/types/contact";

export async function submitContactMessage(data: ContactMessagePayload) {
  // Placeholder for future backend integration.
  //
  // Future flow:
  // Form Submit -> API -> DB Insert -> Admin Notification
  //
  // Backend will later:
  // 1. Insert message into database
  // 2. Trigger admin notification (dashboard alert / email)
  //
  // Example:
  // const response = await fetch("/api/contact", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // });
  //
  // if (!response.ok) {
  //   throw new Error("Failed to submit contact message");
  // }
  //
  // return response.json();

  console.log("Submitting contact message:", data);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Message submitted successfully",
  };
}