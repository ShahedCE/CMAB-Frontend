import { apiClient } from "./api-client";
import type { Archive, ArchiveQuery } from "@/types/archive";

export async function getAdminArchives(query?: ArchiveQuery): Promise<Archive[]> {
  const { data } = await apiClient.get("/archives", { params: query });
  return Array.isArray(data) ? data : data.data ?? [];
}

export async function getAdminArchiveById(id: string): Promise<Archive> {
  const { data } = await apiClient.get(`/archives/${id}`);
  return data;
}

export async function createArchive(formData: FormData) {
  const { data } = await apiClient.post("/archives", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updateArchive(id: string, formData: FormData) {
  const { data } = await apiClient.patch(`/archives/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function deleteArchive(id: string) {
  const { data } = await apiClient.delete(`/archives/${id}`);
  return data;
}