import { axiosInstance } from "../../../../../../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../../react-query/constants";
import { toast } from "react-toastify";
import { getStoredUser } from "../../../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function uploadEvent(formData) {
  const data = await axiosInstance({
    url: `/event`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

async function deleteEvent(formData) {
  const data = await axiosInstance({
    url: `/event/${formData}`,
    method: "DELETE",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

export function useUploadEvent() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => uploadEvent(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.event]);
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

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => deleteEvent(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.event]);
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
