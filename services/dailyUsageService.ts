import axiosInstance from "@/config/axiosConfig";
import type {
  DailyUsage,
  DailyUsageRetour,
  DailyUsageSortie,
  PaginatedResponse,
} from "@/types";

interface DailyUsageResponse {
  message: string;
  data: any;
}

export const getDailyUsages = async (
  page = 1,
  filters?: {
    numero_serie?: string;
    operateur?: string;
    is_returned?: "0" | "1";
    sort?: string;
  }
): Promise<PaginatedResponse<DailyUsage>> => {
  const params = new URLSearchParams({ page: String(page) });

  if (filters?.numero_serie) {
    params.append("filter[numero_serie]", filters.numero_serie);
  }
  if (filters?.operateur) {
    params.append("filter[operateur]", filters.operateur);
  }
  if (filters?.is_returned !== undefined) {
    params.append("filter[is_returned]", filters.is_returned);
  }
  if (filters?.sort) {
    params.append("sort", filters.sort);
  }

  const res = await axiosInstance.get(`/api/daily-usages?${params.toString()}`);
  return res.data;
};

export const getDailyUsagesEncours = async (
  page = 1,
  filters?: {
    numero_serie?: string;
    operateur?: string;
    sort?: string;
  }
): Promise<PaginatedResponse<DailyUsage>> => {
  const params = new URLSearchParams({ page: String(page) });

  if (filters?.numero_serie) {
    params.append("filter[numero_serie]", filters.numero_serie);
  }
  if (filters?.operateur) {
    params.append("filter[operateur]", filters.operateur);
  }
  if (filters?.sort) {
    params.append("sort", filters.sort);
  }

  const res = await axiosInstance.get(
    `/api/daily-usages-encours?${params.toString()}`
  );
  return res.data;
};

export const storeDailyUsage = async (
  data: DailyUsageSortie
): Promise<DailyUsageResponse> => {
  try {
    const res = await axiosInstance.post("/api/daily-usages", data);
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 422) {
      throw err.response.data.errors;
    }
    throw err;
  }
};

export const updateDailyUsage = async (
  id: number,
  payload: DailyUsageRetour
): Promise<DailyUsageResponse> => {
  try {
    const res = await axiosInstance.patch(`/api/daily-usages/${id}`, payload);
    return res.data.data;
  } catch (error: any) {
    if (error.response.status === 422) {
      throw error.response.data.errors;
    }
    throw error;
  }
};
