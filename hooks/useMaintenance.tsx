import { getMaintenances } from "@/services/maintenanceService";
import { Maintenance, PaginatedResponse } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useMaintenance = (
  page: number,
  filters?: { type?: string; statut?: string; numero_serie?: string }
) => {
  return useQuery<PaginatedResponse<Maintenance>, Error>({
    queryKey: ["maintenances", page, filters],
    queryFn: () => getMaintenances(page, filters),
    placeholderData: keepPreviousData,
  });
};
