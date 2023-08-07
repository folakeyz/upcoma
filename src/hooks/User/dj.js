import { axiosInstance } from "../../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/constants";
import { toast } from "react-toastify";

const SERVER_ERROR = "There was an error contacting the server.";

async function getDJ() {
  const data = await axiosInstance({
    url: "/auth",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = data?.data?.data.filter((x) => x.role === "DJ");
  return res;
}

export function useDJ() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.dj],
    queryFn: () => getDJ(),
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
