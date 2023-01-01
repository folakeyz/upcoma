import { axiosInstance } from "../../../../axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toastOptions } from "../../../../utils";

const SERVER_ERROR = "There was an error contacting the server.";

const userSignup = async (formData) => {
  const data = await axiosInstance({
    url: "/auth",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export function useSignup() {
  const navigate = useNavigate();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => userSignup(formData),
    onSuccess: (data) => {
      toast.success("Registration Successful", {
        position: toast.POSITION.BOTTOM_CENTER,
        delay: 3000,
      });
      navigate("/login");
    },
    onError: (error) => {
      const err = error?.response?.data?.error
        ? error?.response?.data?.error
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return { mutate, isSuccess, reset };
}
