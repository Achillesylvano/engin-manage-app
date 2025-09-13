import { PaginatedResponse } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function usePaginatedQuery<T>(
  key: string,
  page: number,
  filters: Record<string, any> | undefined,
  fetchFn: (
    page: number,
    filters?: Record<string, any>
  ) => Promise<PaginatedResponse<T>>
) {
  return useQuery<PaginatedResponse<T>, Error>({
    queryKey: [key, page, filters],
    queryFn: () => fetchFn(page, filters),
    placeholderData: keepPreviousData,
  });
}
