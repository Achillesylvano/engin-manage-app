import {
  getDailyUsages,
  storeDailyUsage,
  updateDailyUsage,
} from "@/services/dailyUsageService"; // Services pour appels API vers Laravel
import type { DailyUsage } from "@/types"; // Typage TypeScript de DailyUsage
import {
  keepPreviousData, // utilitaire de TanStack Query pour garder les données précédentes pendant le rechargement
  useMutation, // hook pour gérer les mutations (POST/PUT/DELETE)
  useQuery, // hook pour récupérer et mettre en cache les données
  useQueryClient, // permet d’accéder au client TanStack Query pour invalider le cache
} from "@tanstack/react-query";
import { DailyUsageSortie, PaginatedResponse } from "../types";

interface DailyUsageResponse {
  message: string;
  data: any;
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
    queryKey: ["dailyUsages", page, filters], // cache différent pour chaque page + filtre
    queryFn: () => getDailyUsages(page, filters), // appelle le service qui récupère les données
    placeholderData: keepPreviousData, // affiche l’ancienne page pendant le chargement de la nouvelle
    // Remarque : si aucun filtre ou page n’a changé, TanStack Query renvoie les données du cache
  });
};

// --- Hook mise à jour d’un DailyUsage ---
// Ce hook gère la modification d’un DailyUsage existant.
// La mutation prend un objet contenant `id` et `payload` (les champs à modifier)
export const useUpdateDailyUsage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number; // ID de l’élément à mettre à jour
      payload: Partial<DailyUsage>; // Champs à modifier
    }) => updateDailyUsage(id, payload),
    onSuccess: () => {
      // Invalide le cache pour forcer la mise à jour de la liste
      queryClient.invalidateQueries({ queryKey: ["dailyUsages"] });
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
