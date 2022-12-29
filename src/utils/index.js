import jwtDecode from "jwt-decode";
import { getStoredUser } from "../storage";

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
