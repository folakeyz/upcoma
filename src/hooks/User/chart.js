import { axiosInstance } from "../../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/constants";
import { toast } from "react-toastify";
//import { getStoredUser } from "../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getTrending() {
  const data = await axiosInstance({
    url: "/stream/all",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data?.data?.data;
}
async function getTalents() {
  const data = await axiosInstance({
    url: "/stream/talents",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data?.data?.data;
}
export function useTrending() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.stream],
    queryFn: () => getTrending(),
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

export function useTalents() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.talents],
    queryFn: () => getTalents(),
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

async function getTrends() {
  const data = await axiosInstance({
    url: "/trending",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data?.data?.data;
}

export function useTrends() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.trend],
    queryFn: () => getTrends(),
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
