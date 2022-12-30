import { axiosInstance } from "../../../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/constants";
import { toast } from "react-toastify";
import { getStoredUser } from "../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getCompetitions() {
  const data = await axiosInstance({
    url: "/competition",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data?.data?.data;
}

async function joinCompetition(formData) {
  const data = await axiosInstance({
    url: `/competition/register/${formData["id"]}`,
    method: "PUT",
    data: { paymentResult: formData },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
}

export function useCompetition() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.event],
    queryFn: () => getCompetitions(),
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

export function useJoinCompetition() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (formData) => joinCompetition(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.competition]);
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
