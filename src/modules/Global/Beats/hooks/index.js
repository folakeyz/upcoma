import { axiosInstance } from "../../../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/constants";
import { toast } from "react-toastify";
import { getStoredUser } from "../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getBeat() {
  const data = await axiosInstance({
    url: "/beat",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data?.data?.data;
}

async function playBeat(formData) {
  const data = await axiosInstance({
    url: `/beat/play/${formData}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data?.data?.data;
}

async function buyBeat(formData) {
  const data = await axiosInstance({
    url: `/beat/buy/new/beat/${formData["id"]}`,
    method: "PUT",
    data: { paymentResult: formData },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

async function postComment(formData) {
  const data = await axiosInstance({
    url: `/beat/user/comments/${formData["id"]}`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

async function likeBeat(formData) {
  const data = await axiosInstance({
    url: `/beat/like/${formData}`,
    method: "PUT",
    //data: { id: formData },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

export function useBeat() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.beat],
    queryFn: () => getBeat(),
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

export function usePlayBeat() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (formData) => playBeat(formData),
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

export function useLikeBeat() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (formData) => likeBeat(formData),
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

export function usePostComment() {
  const queryClient = useQueryClient();
  const { mutate, reset, isSuccess } = useMutation({
    mutationFn: (formData) => postComment(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.beat]);
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

export function useBuyBeat() {
  const queryClient = useQueryClient();
  const { mutate, reset, isSuccess } = useMutation({
    mutationFn: (formData) => buyBeat(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.beat]);
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
