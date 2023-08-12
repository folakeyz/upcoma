import { axiosInstance } from "../../../../../../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../../react-query/constants";
import { toast } from "react-toastify";
import { getStoredUser } from "../../../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getTBooking() {
  const data = await axiosInstance({
    url: "/booking/talents",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

export function useMyBooking() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.bookings],
    queryFn: () => getTBooking(),
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
