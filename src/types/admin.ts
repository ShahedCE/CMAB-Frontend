export type AdminRole = "admin" | "editor" | "manager";

export type AdminUser = {
  id: string;
  email: string;
  role: AdminRole | string;
};

export type AuthLoginResponse = {
  accessToken: string;
  user: AdminUser;
};

export type NotificationItem = {
  id: string;
  type: string;
  title: string;
  body: string;
  sourceType: string;
  sourceId: string;
  createdAt: string;
  isRead: boolean;
};
