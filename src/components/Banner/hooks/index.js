import { axiosInstance } from "../../../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/constants";
import { toast } from "react-toastify";

const SERVER_ERROR = "There was an error contacting the server.";

async function getBanner() {
  const data = await axiosInstance({
    url: "/banner",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data?.data?.data;
}

export function useBanner() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.banner],
    queryFn: () => getBanner(),
    onError: (error) => {
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
  return data;
}
