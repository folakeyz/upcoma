import { axiosInstance } from "../../../../axiosInstance";
import { useMutation } from "@tanstack/react-query";

const userReset = async (formData) => {
  const data = await axiosInstance({
    url: `/auth/resetpassword/${formData["token"]}`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export function useReset() {
  const { mutate, isSuccess, reset, error, isError } = useMutation({
    mutationFn: (formData) => userReset(formData),
  });
  return { mutate, isSuccess, reset, error, isError };
}
