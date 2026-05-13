import axios from "axios";
import type { Archive, ArchiveQuery } from "@/types/archive";
const API_BASE_URL =
  process.env.BACKEND_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:4001";

export function getFileUrl(path?: string | null) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL}${path}`;
}

export async function getArchives(query?: ArchiveQuery): Promise<Archive[]> {
  const params = new URLSearchParams();

  if (query?.search) params.set("search", query.search);
  if (query?.category) params.set("category", query.category);
  if (query?.division) params.set("division", query.division);
  if (query?.year) params.set("year", query.year);

  const url = `${API_BASE_URL}/archives${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const { data } = await axios.get(url);

  return Array.isArray(data) ? data : data.data ?? [];
}

export async function getArchiveById(id: string): Promise<Archive> {
  const { data } = await axios.get(`${API_BASE_URL}/archives/${id}`);
  return data;
}