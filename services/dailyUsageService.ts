// src/services/dailyUsageService.ts
import axiosInstance from "@/config/axiosConfig";
import type { DailyUsage, DailyUsageSortie, PaginatedResponse } from "@/types";

interface DailyUsageResponse {
  message: string;
  data: any;
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
// Crée une daily usage et renvoie uniquement les erreurs si elles existent

export const storeDailyUsage = async (
  data: DailyUsageSortie
): Promise<DailyUsageResponse> => {
  try {
    const res = await axiosInstance.post("/api/daily-usages", data);
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 422) {
      throw err.response.data.errors; // uniquement les erreurs de validation Laravel
    }
    throw err;
  }
};

// --- Mise à jour d’un DailyUsage existant ---
export const updateDailyUsage = async (
  id: number,
  payload: Partial<DailyUsage>
): Promise<DailyUsage> => {
  const res = await axiosInstance.put(`/daily-usages/${id}`, payload);
  return res.data.data; // retourne l’objet DailyUsage mis à jour
};
