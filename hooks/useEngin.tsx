import { getEnginsDisponibles, getEnginsSortie } from "@/services/enginService";
import { Engin } from "@/types";
import { usePaginatedQuery } from "./usePaginatedQuery";

export const useEnginDisponibles = (
  page: number,
  filters?: { numero_serie?: string; designation?: string; sort?: string }
) =>
  usePaginatedQuery<Engin>(
    "enginDisponibles",
    page,
    filters,
    getEnginsDisponibles
  );

export const useEnginSortie = (
  page: number,
  filters?: { numero_serie?: string; designation?: string; sort?: string }
) => usePaginatedQuery<Engin>("enginSortie", page, filters, getEnginsSortie);
