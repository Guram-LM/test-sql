import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $axios } from "../../../component/axios/Axios";

export interface ScheduledPost {
  id: number;
  title_ka: string;
  title_en?: string;
  content_ka?: string;
  content_en?: string;
  icon?: string;
  publish_date: string;
  publish_time: string;
  timezone: string;
  utcOffset: number;
  publishUtc: string;
  status: "scheduled" | "published" | "publishing" | "failed" | "cancelled";
  published_at?: string;
  created_at: string;
}

export interface CreateScheduledPostPayload {
  title_ka: string;
  title_en: string;
  content_ka?: string;
  content_en?: string;
  icon?: string;
  publish_date: string;
  publish_time: string;
  timezone?: string;
  utcOffset?: number;
}

// ── Queries ───────────────────────────────────────────────────
export function useFetchScheduledPosts() {
  return useQuery({
    queryKey: ["scheduled-posts"],
    queryFn: async () => {
      const res = await $axios.get("/scheduled-posts/admin/all");
      return res.data.data as ScheduledPost[];
    },
  });
}

// ── Mutations ─────────────────────────────────────────────────
export function useCreateScheduledPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateScheduledPostPayload) => {
      const res = await $axios.post("/scheduled-posts", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-posts"] });
    },
  });
}

export function useUpdateScheduledPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: Partial<CreateScheduledPostPayload> }) => {
      const res = await $axios.put(`/scheduled-posts/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-posts"] });
    },
  });
}


// ── Hard Delete ───────────────────────────────────────────────
export function useDeleteScheduledPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await $axios.delete(`/scheduled-posts/${id}`);
      return res.data;
    },
    onSuccess: () => {        

      queryClient.invalidateQueries({ queryKey: ["scheduled-posts"] });
    },
    onError: (err: any) => {
      console.error("❌ Hard Delete failed:", err?.response?.data || err?.message || err);
    },
  });
}