import { axiosInstance } from "../../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/constants";
import { toast } from "react-toastify";
import { getStoredUser } from "../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getRegEvents() {
  const data = await axiosInstance({
    url: "/event/myEvents",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

export function useRegEvent() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.regEvent],
    queryFn: () => getRegEvents(),
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
