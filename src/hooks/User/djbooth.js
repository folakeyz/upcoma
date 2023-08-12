import { axiosInstance } from "../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/constants";
import { toast } from "react-toastify";
import { getStoredUser } from "../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getMix() {
  const data = await axiosInstance({
    url: "/dj",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data?.data?.data;
}

async function playMix(formData) {
  const data = await axiosInstance({
    url: `/dj/play/${formData}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data?.data?.data;
}

async function postComment(formData) {
  const data = await axiosInstance({
    url: `/dj/user/comments/${formData["id"]}`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

async function likeMix(formData) {
  const data = await axiosInstance({
    url: `/dj/like/${formData}`,
    method: "PUT",
    //data: { id: formData },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

export function useMix() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.mix],
    queryFn: () => getMix(),
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

export function usePlayMix() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (formData) => playMix(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.trend]);
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

export function useLikeMix() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (formData) => likeMix(formData),
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

export function usePostMixComment() {
  const queryClient = useQueryClient();
  const { mutate, reset, isSuccess } = useMutation({
    mutationFn: (formData) => postComment(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.mix]);
      toast.success("Comment posted", {
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
  return { mutate, reset, isSuccess };
}
