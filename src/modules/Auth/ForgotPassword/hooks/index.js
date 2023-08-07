import { axiosInstance } from "../../../../axiosInstance";
import { useMutation } from "@tanstack/react-query";

const userForgot = async (formData) => {
  const data = await axiosInstance({
    url: "/auth/forgotPassword",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export function useForgotPwd() {
  const { mutate, isSuccess, reset, error, isError } = useMutation({
    mutationFn: (formData) => userForgot(formData),
  });
  return { mutate, isSuccess, reset, error, isError };
}
