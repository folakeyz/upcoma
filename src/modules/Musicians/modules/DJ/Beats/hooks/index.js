import { axiosInstance } from "../../../../../../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../../react-query/constants";
import { toast } from "react-toastify";
import { getStoredUser } from "../../../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function uploadBeat(formData) {
  const data = await axiosInstance({
    url: `/beat`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

async function deleteBeat(formData) {
  const data = await axiosInstance({
    url: `/beat/${formData}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

export function useUploadBeat() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => uploadBeat(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.beat]);
    },
    onError: (error) => {
      const err = error?.response?.data?.error
        ? error?.response?.data?.error
        : SERVER_ERROR;
      toast.error(err, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    },
  });
  return { mutate, isSuccess, reset };
}

export function useDeleteBeat() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => deleteBeat(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.beat]);
    },
    onError: (error) => {
      const err = error?.response?.data?.error
        ? error?.response?.data?.error
        : SERVER_ERROR;
      toast.error(err, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    },
  });
  return { mutate, isSuccess, reset };
}
