import axiosInstance from "@/config/axiosConfig";
import { PaginatedResponse, User } from "@/types";

export const getOperateur = async (
  page = 1,
  filters?: {
    matricule?: string;
    sort?: string;
  }
): Promise<PaginatedResponse<User>> => {
  const params = new URLSearchParams({ page: String(page) });
  if (filters?.matricule) {
    params.append("filter[numero_serie]", filters.matricule);
  }
  if (filters?.sort) {
    params.append("sort", filters.sort);
  }

  const res = await axiosInstance.get(`/api/operateur?${params.toString()}`);
  return res.data; // Laravel ResourceCollection + pagination
};
