import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { getStoredUser } from "../storage";
const SERVER_ERROR = "There was an error contacting the server.";
export const getDecodedJWT = () => {
  try {
    const token = getStoredUser().token;
    const decoded = jwtDecode(token);
    return decoded;
  } catch (e) {
    return null;
  }
};

export const isAuthenticated = () => {
  try {
    const decode = getDecodedJWT();
    if (decode) {
      const { exp } = decode;
      const currentTime = Date.now() / 1000;
      return exp > currentTime;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const toastOptions = {
  position: toast.POSITION.BOTTOM_CENTER,
  autoClose: 8000,
  draggable: true,
  theme: "dark",
  pauseOnHover: true,
};

export const errorMessage = (error) => {
  const err = error?.response?.data?.error
    ? error?.response?.data?.error
    : SERVER_ERROR;
  return err;
};
