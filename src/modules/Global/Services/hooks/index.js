import { axiosInstance } from "../../../../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/constants";
import { toast } from "react-toastify";
import { getStoredUser } from "../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function uploadService(formData) {
  const data = await axiosInstance({
    url: `/service`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

async function deleteService(formData) {
  const data = await axiosInstance({
    url: `/service/${formData}`,
    method: "DELETE",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

export function useUploadService() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => uploadService(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.service]);
      toast.success("Success", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
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

export function useDeleteService() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => deleteService(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.song]);
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
