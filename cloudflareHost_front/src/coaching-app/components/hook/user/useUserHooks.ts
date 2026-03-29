import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword, getMe, updateProfile } from "../../../services/user/api";
import type { ChangePasswordInput, UpdateProfileInput } from "../../interface/Interface";


export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await getMe();
      return res.user;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, 
  });

export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileInput) => updateProfile(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] }),
  });
};

export const useChangePassword = () =>
  useMutation({
    mutationFn: (data: ChangePasswordInput) => changePassword(data),
  });