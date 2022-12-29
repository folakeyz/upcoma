import { createContext, useEffect, useState } from "react";
import { getDecodedJWT, isAuthenticated } from "../utils";
import { getStoredUser } from "../storage";

export const AuthContext = createContext({
  user: {},
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const data = getStoredUser();
    if (data) {
      const { user: profile } = getDecodedJWT();
      setUser(profile);
      setAuthToken(data.token);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      logout();
    }
  }, []);

  function authenticate(token) {
    setAuthToken(token.data.token);
    const { user: profile } = getDecodedJWT();
    setUser(profile);
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
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
