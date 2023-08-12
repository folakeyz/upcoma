import { lazy, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context";
// import { useAuthenticatedUser } from "../context/hooks";
// import { UserRoles } from "../utils/constants";
import { BasePaths, PrivatePaths } from "./path";

const paths = [
  {
    path: "",
    element: lazy(() => import("../modules/Home")),
  },
  {
    path: "login",
    element: lazy(() => import("../modules/Auth/Login")),
  },
  {
    path: "forgotPassword",
    element: lazy(() => import("../modules/Auth/ForgotPassword")),
  },
  {
    path: "resetPassword/:token",
    element: lazy(() => import("../modules/Auth/ResetPassword")),
  },
  {
    path: "signup",
    element: lazy(() => import("../modules/Auth/Signup")),
  },
  {
    path: "privacy",
    element: lazy(() => import("../modules/Auth/Privacy")),
  },
  {
    path: "terms",
    element: lazy(() => import("../modules/Auth/TC")),
  },
  {
    path: "/app/songs",
    element: lazy(() => import("../modules/Global/Songs")),
  },
  {
    path: "*",
    element: lazy(() => import("../modules/NotFound")),
  },
];

function Auth() {
  const { user } = useContext(AuthContext);
  if (user) {
    return (
      <Navigate to={`${BasePaths.MAIN}${PrivatePaths.DASHBOARD}`} replace />
    );
  }

  return (
    <Routes>
      {/* <Route path="" element={<Navigate to={PublicPaths.HOME} replace />} /> */}
      {paths.map(({ path, element: Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
    </Routes>
  );
}

export default Auth;
