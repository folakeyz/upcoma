import { axiosInstance } from "../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/constants";
import { toast } from "react-toastify";
import { getStoredUser } from "../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getBooking() {
  const data = await axiosInstance({
    url: "/booking/me",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

async function createBooking(formData) {
  const data = await axiosInstance({
    url: `/booking`,
    method: "POST",
    data: formData,
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
    queryKey: [queryKeys.book],
    queryFn: () => getBooking(),
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

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => createBooking(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.book]);
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
  return { mutate, isSuccess, reset };
}
