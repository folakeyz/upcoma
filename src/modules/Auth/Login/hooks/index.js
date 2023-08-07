import { axiosInstance } from "../../../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context";
import { getStoredUser, setStoredUser } from "../../../../storage";
import { isAuthenticated, toastOptions } from "../../../../utils";

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

const userProfile = async () => {
  const data = await axiosInstance({
    url: "/auth/me",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().token}`,
    },
  });
  return data?.data?.data;
};

export function useLogin() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => userLogin(formData),
    onSuccess: (data) => {
      toast.success("Login Successful", toastOptions);
      setStoredUser(data);
      authCtx.authenticate(data);
      queryClient.invalidateQueries([queryKeys.user]);
      navigate("/");
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

export function useAuthenticatedUser() {
  const authCtx = useContext(AuthContext);
  const fallback = undefined;
  const { data = fallback } = useQuery({
    enabled: isAuthenticated(),
    queryKey: [queryKeys.user],
    queryFn: () => userProfile(),
    onSuccess: (data) => {
      authCtx.updateUser(data);
    },
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
