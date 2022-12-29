import { axiosInstance } from "../../../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/constants";
import { toast } from "react-toastify";

const SERVER_ERROR = "There was an error contacting the server.";

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
