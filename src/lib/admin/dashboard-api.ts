import { apiClient } from "@/lib/admin/api-client";
import type { NotificationItem } from "@/types/admin";

export interface JoinApplicationEducation {
  degree: string;
  institution: string;
  result: string;
  passingYear: string;
}

export type JoinRequestItem = {
  id: string;
  fullNameBn: string;
  fullNameEn: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  nationalId: string;
  medicalRegNo: string;
  membershipType: string;
  email: string;
  mobile: string;
  phone?: string;
  presentVillage: string;
  presentPost: string;
  presentThana: string;
  presentDistrict: string;
  permanentVillage: string;
  permanentPost: string;
  permanentThana: string;
  permanentDistrict: string;
  specialty?: string;
  educationEntries: JoinApplicationEducation[];
  entryFee: number;
  annualFee: number;
  lifetimeFee: number;
  workplaceTypes: string[];
  declarationAccepted: boolean;
  notes: string;
  profileImageUrl?: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
};
export type MemberItem = {
  id: string;
  fullNameBn: string;
  email: string;
  mobile: string;
  status: "active" | "inactive";
  createdAt: string;
};

export type MemberPayload = {
  fullNameBn: string;
  email: string;
  mobile: string;
  status: "active" | "inactive";
};

export type ContactMessageItem = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
};

export type ActivityItem = {
  id: string;
  title: string;
  date: string;
  location?: string;
};

export type ActivityPayload = {
  title: string;
  date: string;
  location?: string;
};

// =========================
// Notifications API
// =========================

export async function getNotifications(page = 1, limit = 10) {
  const { data } = await apiClient.get("/notifications", {
    params: { page, limit },
  });
  return data;
}

export async function getUnreadNotificationCount() {
  const { data } = await apiClient.get("/notifications/unread-count");
  return data;
}

export async function markNotificationAsRead(id: string) {
  const { data } = await apiClient.patch(`/notifications/${id}/read`);
  return data;
}

// =========================
// Join Requests API
// =========================

export async function getJoinRequests(params?: Record<string, unknown>) {
  const { data } = await apiClient.get<JoinRequestItem[]>("/join-requests", {
    params,
  });
  return data;
}

export async function getJoinRequestById(id: string) {
  const { data } = await apiClient.get<JoinRequestItem>(`/join-requests/${id}`);
  return data;
}

export async function approveJoinRequest(id: string) {
  const { data } = await apiClient.patch(`/join-requests/${id}/approve`);
  return data;
}

export async function rejectJoinRequest(id: string) {
  const { data } = await apiClient.patch(`/join-requests/${id}/reject`);
  return data;
}

// optional public create join request
export async function createJoinRequest(formData: FormData) {
  const { data } = await apiClient.post("/join-requests", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

// =========================
// Members API
// =========================

export async function getMembers(params?: Record<string, unknown>) {
  const { data } = await apiClient.get<MemberItem[]>("/members", {
    params,
  });
  return data;
}

export async function getMemberById(id: string) {
  const { data } = await apiClient.get<MemberItem>(`/members/${id}`);
  return data;
}

// image required on create
export async function createMember(formData: FormData) {
  const { data } = await apiClient.post<MemberItem>("/members", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function updateMember(id: string, formData: FormData) {
  const { data } = await apiClient.patch<MemberItem>(`/members/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function deleteMember(id: string) {
  const { data } = await apiClient.delete(`/members/${id}`);
  return data;
}

// =========================
// Contact API
// =========================

export async function getContacts() {
  const { data } = await apiClient.get<ContactMessageItem[]>("/contact");
  return data;
}

export async function getContactById(id: string) {
  const { data } = await apiClient.get<ContactMessageItem>(`/contact/${id}`);
  return data;
}

export async function markContactAsRead(id: string) {
  const { data } = await apiClient.patch(`/contact/${id}/read`);
  return data;
}

// optional public contact form submit
export async function createContact(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { data } = await apiClient.post("/contact", payload);
  return data;
}

// =========================
// Activities API
// =========================

export async function getActivities(params?: Record<string, unknown>) {
  const { data } = await apiClient.get<ActivityItem[]>("/activities", {
    params,
  });
  return data;
}

export async function getActivityById(id: string) {
  const { data } = await apiClient.get<ActivityItem>(`/activities/${id}`);
  return data;
}

export async function createActivity(formData: FormData) {
  const { data } = await apiClient.post<ActivityItem>("/activities", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function updateActivity(id: string, formData: FormData) {
  const { data } = await apiClient.patch<ActivityItem>(`/activities/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function deleteActivity(id: string) {
  const { data } = await apiClient.delete(`/activities/${id}`);
  return data;
}