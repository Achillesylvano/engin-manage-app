// src/hooks/useDailyUsages.ts

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

// --- Typage pour les réponses paginées de Laravel ---
interface PaginatedResponse<T> {
  data: T[]; // Les éléments de la page actuelle
  meta: {
    current_page: number; // numéro de la page actuelle
    last_page: number; // dernière page disponible
    per_page: number; // nombre d'éléments par page
    total: number; // nombre total d'éléments
  };
  links: {
    first: string; // lien vers la première page
    last: string; // lien vers la dernière page
    prev: string | null; // lien vers la page précédente
    next: string | null; // lien vers la page suivante
  };
}

// --- Hook récupération paginée avec filtres ---
// Ce hook permet de récupérer les DailyUsages de façon paginée et filtrée.
// TanStack Query met en cache les pages et gère automatiquement le loading/error.
// Le paramètre `filters` est optionnel et peut inclure plusieurs critères.
export const useDailyUsages = (
  page: number,
  filters?: {
    numero_serie?: string; // recherche par numéro de série de l'engin
    operateur?: string; // filtre par nom de l'opérateur
    is_returned?: "0" | "1"; // 0 = sortie, 1 = retour (adapté au backend)
    sort?: string; // tri optionnel, ex: "-date_usage"
  }
) => {
  return useQuery<PaginatedResponse<DailyUsage>, Error>({
    queryKey: ["dailyUsages", page, filters], // cache différent pour chaque page + filtre
    queryFn: () => getDailyUsages(page, filters), // appelle le service qui récupère les données
    placeholderData: keepPreviousData, // affiche l’ancienne page pendant le chargement de la nouvelle
    // Remarque : si aucun filtre ou page n’a changé, TanStack Query renvoie les données du cache
  });
};

// --- Hook création d’un DailyUsage ---
// Ce hook gère la création d’un nouveau DailyUsage côté backend.
// Après la réussite de la mutation, on invalide la query pour rafraîchir la liste.
export const useStoreDailyUsage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<DailyUsage>) => storeDailyUsage(payload),
    onSuccess: () => {
      // Invalide les queries liées à 'dailyUsages' pour forcer le rechargement
      queryClient.invalidateQueries({ queryKey: ["dailyUsages"] });
    },
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
