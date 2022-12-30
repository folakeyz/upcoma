import { axiosInstance } from "../../../../../../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../../react-query/constants";
import { toast } from "react-toastify";
import { getStoredUser } from "../../../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function uploadComp(formData) {
  const data = await axiosInstance({
    url: `/competition`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

async function deleteComp(formData) {
  const data = await axiosInstance({
    url: `/competition/${formData}`,
    method: "DELETE",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

export function useUploadComp() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => uploadComp(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.competition]);
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

export function useDeleteComp() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => deleteComp(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.competition]);
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
