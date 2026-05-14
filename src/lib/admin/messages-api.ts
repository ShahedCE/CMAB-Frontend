import { apiClient } from "./api-client";
import type { Message, MessageQuery } from "@/types/message";

export type MessagePayload = {
  organizationName: string;
  fatherName: string;
  message: string;
};

export async function getAdminMessages(
  query?: MessageQuery
): Promise<Message[]> {
  const { data } = await apiClient.get("/messages", { params: query });

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;

  return [];
}

export async function getAdminMessageById(id: string): Promise<Message> {
  const { data } = await apiClient.get(`/messages/${id}`);
  return data?.data ?? data;
}

export async function createMessage(payload: MessagePayload) {
  const { data } = await apiClient.post("/messages", payload);
  return data;
}

export async function updateMessage(id: string, payload: MessagePayload) {
  const { data } = await apiClient.patch(`/messages/${id}`, payload);
  return data;
}

export async function deleteMessage(id: string) {
  const { data } = await apiClient.delete(`/messages/${id}`);
  return data;
}