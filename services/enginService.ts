import axiosInstance from "@/config/axiosConfig";
import { Engin } from "@/types";

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

export const getEnginsDisponibles = async (
  page = 1,
  filters?: {
    numero_serie?: string;
    designation?: string;
    sort?: string;
  }
): Promise<PaginatedResponse<Engin>> => {
  const params = new URLSearchParams({ page: String(page) });
  if (filters?.numero_serie) {
    params.append("filter[numero_serie]", filters.numero_serie);
  }
  if (filters?.designation) {
    params.append("filter[designation]", filters.designation);
  }
  if (filters?.sort) {
    params.append("sort", filters.sort);
  }

  const res = await axiosInstance.get(
    `/api/engin-disponibles?${params.toString()}`
  );
  return res.data;
};

export const getEnginsSortie = async (
  page = 1,
  filters?: {
    numero_serie?: string;
    designation?: string;
    sort?: string;
  }
): Promise<PaginatedResponse<Engin>> => {
  const params = new URLSearchParams({ page: String(page) });
  if (filters?.numero_serie) {
    params.append("filter[numero_serie]", filters.numero_serie);
  }
  if (filters?.designation) {
    params.append("filter[designation]", filters.designation);
  }
  if (filters?.sort) {
    params.append("sort", filters.sort);
  }

  const res = await axiosInstance.get(`/api/engin-sortie?${params.toString()}`);
  return res.data;
};
