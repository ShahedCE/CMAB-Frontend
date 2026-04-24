import { apiClient } from "./admin/api-client";

export async function createContact(payload: {
  name: string;
  email: string;
  message: string;
}) {
  const { data } = await apiClient.post("/contact", payload);
  return data;
}
