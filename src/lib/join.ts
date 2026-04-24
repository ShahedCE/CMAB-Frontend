const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function createJoinRequest(formData: FormData) {
  const res = await fetch(`${BASE_URL}/join-requests`, {
    method: "POST",
    body: formData, // 🔥 important (NO JSON)
  });

  if (!res.ok) {
    throw new Error("Failed to submit join request");
  }

  return res.json();
}