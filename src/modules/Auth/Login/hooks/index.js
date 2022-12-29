import { axiosInstance } from "../../../../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context";
import { setStoredUser } from "../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

const userLogin = async (formData) => {
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

export function useLogin() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => userLogin(formData),
    onSuccess: (data) => {
      toast.success("Login Successful", {
        position: toast.POSITION.BOTTOM_CENTER,
        delay: 3000,
      });
      setStoredUser(data);
      authCtx.authenticate(data);
      queryClient.invalidateQueries([queryKeys.user]);
      navigate("/");
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
