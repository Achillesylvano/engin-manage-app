import {
  getDailyUsages,
  getDailyUsagesEncours,
  storeDailyUsage,
  updateDailyUsage,
} from "@/services/dailyUsageService";
import type { DailyUsage, DailyUsageRetour } from "@/types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DailyUsageSortie, PaginatedResponse } from "../types";

interface DailyUsageResponse {
  message: string;
  data: any;
}

interface UpdateParams {
  id: number;
  payload: DailyUsageRetour;
}

export const useDailyUsages = (
  page: number,
  filters?: {
    numero_serie?: string;
    operateur?: string;
    is_returned?: "0" | "1";
    sort?: string;
  }
) => {
  return useQuery<PaginatedResponse<DailyUsage>, Error>({
    queryKey: ["dailyUsages", page, filters],
    queryFn: () => getDailyUsages(page, filters),
    placeholderData: keepPreviousData,
  });
};

export const useDailyUsagesEncours = (
  page: number,
  filters?: {
    numero_serie?: string;
    operateur?: string;
    sort?: string;
  }
) => {
  return useQuery<PaginatedResponse<DailyUsage>, Error>({
    queryKey: ["dailyUsagesEncours", page, filters],
    queryFn: () => getDailyUsagesEncours(page, filters),
    placeholderData: keepPreviousData,
  });
};

export const useUpdateDailyUsage = () => {
  const queryClient = useQueryClient();

  return useMutation<DailyUsageResponse, any, UpdateParams>({
    mutationFn: ({ id, payload }) => updateDailyUsage(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyUsages"] });
      queryClient.invalidateQueries({ queryKey: ["dailyUsagesEncours"] }); // si utilisé
    },
  });
};

export const useCreateDailyUsage = () => {
  const queryClient = useQueryClient();

  return useMutation<DailyUsageResponse, any, DailyUsageSortie>({
    mutationFn: storeDailyUsage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyUsages"] });
    },
  });
};
