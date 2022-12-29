import { axiosInstance } from "../../../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/constants";
import { toast } from "react-toastify";
import { getStoredUser } from "../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getComedy() {
  const data = await axiosInstance({
    url: "/comedy",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data?.data?.data;
}

async function playComedy(formData) {
  const data = await axiosInstance({
    url: `/comedy/play/${formData}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data?.data?.data;
}

async function postComment(formData) {
  const data = await axiosInstance({
    url: `/comedy/user/comments/${formData["id"]}`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

async function likeComedy(formData) {
  const data = await axiosInstance({
    url: `/comedy/like/${formData}`,
    method: "PUT",
    //data: { id: formData },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

export function useComedy() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.comedy],
    queryFn: () => getComedy(),
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

export function usePlayComedy() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (formData) => playComedy(formData),
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

export function useLikeComedy() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (formData) => likeComedy(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.user, queryKeys.comedy]);
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
      queryClient.invalidateQueries([queryKeys.comedy]);
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
