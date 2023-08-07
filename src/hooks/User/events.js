import { axiosInstance } from "../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/constants";
import { toast } from "react-toastify";
import { getStoredUser } from "../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getEvents() {
  const data = await axiosInstance({
    url: "/event",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data?.data?.data;
}

async function attendEvent(formData) {
  const data = await axiosInstance({
    url: `/event/register/${formData["id"]}`,
    method: "PUT",
    data: { paymentResult: formData },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

export function useEvent() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.event],
    queryFn: () => getEvents(),
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

export function useAttendEvent() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (formData) => attendEvent(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.event]);
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
