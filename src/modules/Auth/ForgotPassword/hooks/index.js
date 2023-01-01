import { axiosInstance } from "../../../../axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { toastOptions } from "../../../../utils";

const SERVER_ERROR = "There was an error contacting the server.";

const userForgot = async (formData) => {
  const data = await axiosInstance({
    url: "/auth/login",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export function useForgotPwd() {
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => userForgot(formData),
    onSuccess: (data) => {
      toast.success("Successful", toastOptions);
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
