import { Fragment, lazy, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PublicPaths } from "./path";

// import SpecificLoader from "../utils/SpecificLoader";
// import { UserRoles } from "../utils/constants";
import { AuthContext } from "../context";

const privateRoutes = [
  /* Add paths for authorized users */
  {
    path: "dashboard",
    element: lazy(() => import("../modules/Home")),
    // element: SpecificLoader({
    //   [UserRoles.ADMIN]: lazy(() => import("../modules/HR/Dashboard")),
    //   [UserRoles.HR]: lazy(() => import("../modules/HR/Dashboard")),
    //   [UserRoles.STAFF]: lazy(() => import("../modules/User/Dashboard")),
    //   [UserRoles.MANAGER]: lazy(() => import("../modules/User/Dashboard")),
    //   [UserRoles.TEAM_LEAD]: lazy(() => import("../modules/User/Dashboard")),
    // }),
  },
  {
    path: "profile",
    element: lazy(() => import("../modules/Global/Profile")),
  },
  {
    path: "profile/edit",
    element: lazy(() => import("../modules/Global/Profile/Edit")),
  },
  {
    path: "chats",
    element: lazy(() => import("../modules/Global/Chat")),
  },
  {
    path: "songs",
    element: lazy(() => import("../modules/Global/Songs")),
  },
  {
    path: "song/:id",
    element: lazy(() => import("../modules/Global/Songs/SingleSong")),
  },
  {
    path: "services",
    element: lazy(() => import("../modules/Global/Services")),
  },
  {
    path: "playlist",
    element: lazy(() => import("../modules/Global/Playlist")),
  },
  {
    path: "playlist/:id",
    element: lazy(() => import("../modules/Global/Playlist/SinglePlaylist")),
  },
  {
    path: "events",
    element: lazy(() => import("../modules/Global/Events")),
  },
  {
    path: "event/:id",
    element: lazy(() => import("../modules/Global/Events/Single")),
  },
];

function Admin() {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to={`${PublicPaths.LOGIN}`} replace />;
  }
  return (
    <Routes>
      {privateRoutes.map(({ path, element: Element }) => (
        <Fragment key={path}>
          <Route key={path} path={path} element={<Element />} />
        </Fragment>
      ))}
    </Routes>
  );
}

export default Admin;
