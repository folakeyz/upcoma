import { axiosInstance } from "../../../../../../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../../react-query/constants";
import { toast } from "react-toastify";
import { getStoredUser } from "../../../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getAnalytics() {
  const data = await axiosInstance({
    url: "/analytics",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

export function useAnalytics() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.analytics],
    queryFn: () => getAnalytics(),
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
