import { axiosInstance } from "../../../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/constants";
import { toast } from "react-toastify";
import { getStoredUser } from "../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getUsers() {
  const data = await axiosInstance({
    url: "/auth",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data?.data?.data;
}

async function followUser(formData) {
  const data = await axiosInstance({
    url: `/auth/follow/artist/${formData}`,
    method: "PUT",
    //data: { id: formData },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

async function likeUser(formData) {
  const data = await axiosInstance({
    url: `/auth/like/${formData}`,
    method: "PUT",
    //data: { id: formData },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

async function watchlist(formData) {
  const data = await axiosInstance({
    url: `/auth/watchlist/${formData}`,
    method: "PUT",
    //data: { id: formData },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

export function useUsers() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.users],
    queryFn: () => getUsers(),
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

export function useFollow() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (formData) => followUser(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.user]);
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
  return { mutate };
}

export function useLike() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (formData) => likeUser(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.user]);
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
  return { mutate };
}

export function useWatchlist() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (formData) => watchlist(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.user]);
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
  return { mutate };
}
