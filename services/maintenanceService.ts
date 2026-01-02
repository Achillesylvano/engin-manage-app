import axiosInstance from "@/config/axiosConfig";
import { Maintenance, PaginatedResponse } from "@/types";

export const getMaintenances = async (
  page = 1,
  filters?: {
    type?: string;
    statut?: string;
    numero_serie?: string;
  }
): Promise<PaginatedResponse<Maintenance>> => {
  const params = new URLSearchParams({ page: String(page) });

  if (filters?.numero_serie) {
    params.append("filter[numero_serie]", filters.numero_serie);
  }

  if (filters?.type) {
    params.append("filter[type]", filters.type);
  }

  if (filters?.statut) {
    params.append("filter[statut]", filters.statut);
  }

  const res = await axiosInstance.get(`/api/maintenances?${params.toString()}`);
  return res.data;
};
