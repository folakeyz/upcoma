import { axiosInstance } from "../../../../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/constants";
import { toast } from "react-toastify";

const SERVER_ERROR = "There was an error contacting the server.";

async function getArtist() {
  const data = await axiosInstance({
    url: "/auth",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const artist = data?.data?.data.filter((x) => x.role === "Artist");
  return artist;
}

export function useArtist() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.artist],
    queryFn: () => getArtist(),
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
