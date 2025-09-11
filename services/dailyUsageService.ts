// src/services/dailyUsageService.ts
import axiosInstance from "@/config/axiosConfig";
import type { DailyUsage } from "@/types";

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

// --- Récupération avec pagination et filtres ---
export const getDailyUsages = async (
  page = 1,
  filters?: {
    numero_serie?: string;
    operateur?: string;
    is_returned?: "0" | "1"; // 0 = sortie, 1 = retour
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
  return res.data; // Laravel ResourceCollection + pagination
};

// --- Création d’un nouveau DailyUsage ---
export const storeDailyUsage = async (
  payload: Partial<DailyUsage>
): Promise<DailyUsage> => {
  const res = await axiosInstance.post("/daily-usages", payload);
  return res.data.data; // retourne l’objet DailyUsage créé
};

// --- Mise à jour d’un DailyUsage existant ---
export const updateDailyUsage = async (
  id: number,
  payload: Partial<DailyUsage>
): Promise<DailyUsage> => {
  const res = await axiosInstance.put(`/daily-usages/${id}`, payload);
  return res.data.data; // retourne l’objet DailyUsage mis à jour
};
