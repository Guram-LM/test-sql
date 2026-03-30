// hooks/useUsers.ts
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { $axios } from "../axios/Axios";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role?: string;
  isVerified: boolean;
  created_at: string;
}

export interface UserStats {
  total: number;
  last7Days: number;
  last30Days: number;
}

// ====================== STATISTICS ======================
export function useUserStats() {
  return useQuery({
    queryKey: ["admin", "users", "stats"],
    queryFn: async () => {
      const res = await $axios.get("/admin/users/stats");   
      return res.data.stats as UserStats;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

// ====================== INFINITE USERS ======================
export function useInfiniteUsers(search = "") {
  return useInfiniteQuery({
    queryKey: ["admin", "users", "infinite", search],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await $axios.get("/admin/users", {  
        params: {
          page: pageParam,
          limit: 20,
          search: search || undefined,
        },
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.totalPages) return undefined;
      return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
    },
    staleTime: 2 * 60 * 1000,
  });
}