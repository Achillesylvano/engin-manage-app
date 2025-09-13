import { getOperateur } from "@/services/userService";
import { User } from "@/types";
import { usePaginatedQuery } from "./usePaginatedQuery";

export const useOperateur = (
  page: number,
  filters?: {
    matricule?: string;
    sort?: string;
  }
) => usePaginatedQuery<User>("operateur", page, filters, getOperateur);
