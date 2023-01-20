import { createContext, useEffect, useState } from "react";
import { getDecodedJWT, isAuthenticated } from "../utils";
import { getStoredUser } from "../storage";
import { useAuthenticatedUser } from "../modules/Auth/Login/hooks";

export const AuthContext = createContext({
  user: {},
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  updateUser: (data) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(undefined);
  const userDetails = useAuthenticatedUser();

  useEffect(() => {
    const data = getStoredUser();
    if (data) {
      setAuthToken(data.token);
    }
  }, []);

  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);

  useEffect(() => {
    if (!isAuthenticated) {
      logout();
    }
  }, []);
  console.log(user);
  function authenticate(token) {
    setAuthToken(token.data.token);
    const { user: profile } = getDecodedJWT();
    setUser(profile);
  }
  function updateUser(data) {
    setUser(data);
  }
  function logout() {
    setUser(undefined);
    setAuthToken(null);
    localStorage.removeItem("user");
  }

  const value = {
    user: user,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    updateUser: updateUser,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
