import { apiClient } from "./api-client";
import type {
  ExecutiveMember,
  ExecutiveMemberQuery,
} from "@/types/executive-member";

export type ExecutiveMemberPayload = {
  name: string;
  designation: string;
  phone?: string;
  email?: string;
  isActive?: boolean;
  image?: File | null;
};

function toFormData(payload: ExecutiveMemberPayload) {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("designation", payload.designation);

  if (payload.phone) formData.append("phone", payload.phone);
  if (payload.email) formData.append("email", payload.email);

  if (typeof payload.isActive === "boolean") {
    formData.append("isActive", String(payload.isActive));
  }

  if (payload.image) {
    formData.append("image", payload.image);
  }

  return formData;
}

export async function getAdminExecutiveMembers(
  query?: ExecutiveMemberQuery
): Promise<ExecutiveMember[]> {
  const { data } = await apiClient.get("/executive-members", {
    params: query,
  });

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;

  return [];
}

export async function getAdminExecutiveMemberById(
  id: string
): Promise<ExecutiveMember> {
  const { data } = await apiClient.get(`/executive-members/${id}`);
  return data?.data ?? data;
}

export async function createExecutiveMember(payload: ExecutiveMemberPayload) {
  const { data } = await apiClient.post(
    "/executive-members",
    toFormData(payload)
  );

  return data;
}

export async function updateExecutiveMember(
  id: string,
  payload: ExecutiveMemberPayload
) {
  const { data } = await apiClient.patch(
    `/executive-members/${id}`,
    toFormData(payload)
  );

  return data;
}

export async function deleteExecutiveMember(id: string) {
  const { data } = await apiClient.delete(`/executive-members/${id}`);
  return data;
}