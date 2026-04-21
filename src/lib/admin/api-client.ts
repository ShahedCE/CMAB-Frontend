import axios from "axios";
import { clearAuthSession, getAccessToken } from "@/lib/admin/auth-storage";
const AUTH_ROUTES = [
  "/auth/login",
  "/auth/forgot-password",
  "/auth/verify-otp",
  "/auth/reset-password",
];

function isAuthRoute(url?: string) {
  if (!url) return false;
  return AUTH_ROUTES.some((route) => url.includes(route));
}

export const apiClient = axios.create({
  baseURL: "/api/admin",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  const skipAuthHeader = isAuthRoute(config.url);

  if (token && !skipAuthHeader) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl: string | undefined = error?.config?.url;
    const fromAuthRoute = isAuthRoute(requestUrl);

    if (status === 401 && !fromAuthRoute && typeof window !== "undefined") {
      clearAuthSession();
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  },
);
