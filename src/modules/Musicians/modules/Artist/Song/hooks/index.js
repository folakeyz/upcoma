import { axiosInstance } from "../../../../../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../../react-query/constants";
import { toast } from "react-toastify";
import { getStoredUser } from "../../../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getGenres() {
  const data = await axiosInstance({
    url: "/genre",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

async function uploadSong(formData) {
  const data = await axiosInstance({
    url: `/song`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

async function deleteSong(formData) {
  const data = await axiosInstance({
    url: `/song`,
    method: "DELETE",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

export function useGenres() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.genre],
    queryFn: () => getGenres(),
    onError: (error) => {
      const err = error?.response?.data?.error
        ? error?.response?.data?.error
        : SERVER_ERROR;
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
  return data;
}

export function useUploadSong() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => uploadSong(formData),
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

export function useDeleteSong() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => deleteSong(formData),
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
