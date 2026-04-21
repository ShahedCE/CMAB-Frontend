import { apiClient } from "@/lib/admin/api-client";
import { clearAuthSession, setAuthSession } from "@/lib/admin/auth-storage";
import type { AuthLoginResponse } from "@/types/admin";

type LoginPayload = {
  email: string;
  password: string;
};

type EmailPayload = {
  email: string;
};

type VerifyOtpPayload = {
  email: string;
  otp: string;
};

type ResetPasswordPayload = {
  email: string;
  otp: string;
  newPassword: string;
};

// ki hocce ekhane??
// Ekhane "loginAdmin" function ta asynchronous vabe API call kore "/auth/login" endpoint-e, user-er email o password dia.
// Jodi login successful hoi, taile API theke "accessToken" ebong "user" data pai (AuthLoginResponse type).
// Ei function ei accessToken o user data local storage e (ba onno kono session store a) save kore setAuthSession function dia.
// Tarpor shei data ta return kore.

export async function loginAdmin(payload: LoginPayload) {
  const { data } = await apiClient.post<AuthLoginResponse>("/auth/login", payload);
  setAuthSession(data.accessToken, data.user);
  return data;
}

export async function forgotPassword(payload: EmailPayload) {
  const { data } = await apiClient.post("/auth/forgot-password", payload);
  return data;
}

export async function verifyOtp(payload: VerifyOtpPayload) {
  const { data } = await apiClient.post("/auth/verify-otp", payload);
  return data;
}

export async function resetPassword(payload: ResetPasswordPayload) {
  const { data } = await apiClient.post("/auth/reset-password", payload);
  return data;
}

export async function logoutAdmin() {
  try {
    await apiClient.post("/auth/logout");
  } finally {
    clearAuthSession();
  }
}
