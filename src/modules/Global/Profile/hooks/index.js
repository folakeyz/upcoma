import { axiosInstance } from "../../../../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/constants";
import { getStoredUser } from "../../../../storage";

async function updateProfile(formData) {
  const data = await axiosInstance({
    url: `/auth/me`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

async function updatePhoto(formData) {
  const data = await axiosInstance({
    url: `/auth/photo`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => updateProfile(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.user]);
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}

export function useUploadPhoto() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => updatePhoto(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.user]);
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}
