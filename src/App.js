import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "./context";
import {
  Comedy,
  GlobalProfile,
  Home,
  Login,
  Signup,
  Song,
  SingleSong,
  SingleComedy,
  Playlist,
  SinglePlaylist,
  Booking,
  Beats,
  SingleBeat,
  DJBooth,
  SingleDJ,
  Events,
  SingleEvent,
  MySongs,
  UploadSong,
  ManageSongs,
} from "./modules";
import Dashbboard from "./modules/Musicians/modules/Global/Dashboard";

function App() {
  const Stack = () => {
    return (
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/app/songs" exact element={<Song />} />
        <Route path="/app/song/:id" exact element={<SingleSong />} />
        <Route path="/app/profile/:id" exact element={<GlobalProfile />} />
        <Route path="/app/comedy" exact element={<Comedy />} />
        <Route path="/app/comedy/:id" exact element={<SingleComedy />} />
        <Route path="/app/playlist" exact element={<Playlist />} />
        <Route path="/app/playlist/:id" exact element={<SinglePlaylist />} />
        <Route path="/app/bookings" exact element={<Booking />} />
        <Route path="/app/beats" exact element={<Beats />} />
        <Route path="/app/beat/:id" exact element={<SingleBeat />} />
        <Route path="/app/dj" exact element={<DJBooth />} />
        <Route path="/app/dj/:id" exact element={<SingleDJ />} />
        <Route path="/app/events" exact element={<Events />} />
        <Route path="/app/event/:id" exact element={<SingleEvent />} />
      </Routes>
    );
  };

  const AuthStack = () => {
    return (
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/app/songs" exact element={<Song />} />
        <Route path="/app/song/:id" exact element={<SingleSong />} />
        <Route path="/app/profile/:id" exact element={<GlobalProfile />} />
        <Route path="/app/comedy" exact element={<Comedy />} />
        <Route path="/app/comedy/:id" exact element={<SingleComedy />} />
        <Route path="/app/playlist" exact element={<Playlist />} />
        <Route path="/app/playlist/:id" exact element={<SinglePlaylist />} />
        <Route path="/app/bookings" exact element={<Booking />} />
        <Route path="/app/beats" exact element={<Beats />} />
        <Route path="/app/beat/:id" exact element={<SingleBeat />} />
        <Route path="/app/dj" exact element={<DJBooth />} />
        <Route path="/app/dj/:id" exact element={<SingleDJ />} />
        <Route path="/app/events" exact element={<Events />} />
        <Route path="/app/event/:id" exact element={<SingleEvent />} />
        <Route path="/app/dashboard" exact element={<Dashbboard />} />
        <Route path="/app/musician/song" exact element={<MySongs />} />
        <Route
          path="/app/musician/song/upload"
          exact
          element={<UploadSong />}
        />
        <Route
          path="/app/musician/song/manage"
          exact
          element={<ManageSongs />}
        />
      </Routes>
    );
  };

  const AuthGate = () => {
    const { user } = useContext(AuthContext);

    if (user) {
      return <AuthStack />;
    }
    return <Stack />;
  };

  return (
    <Router>
      <AuthContextProvider>
        <AuthGate />
      </AuthContextProvider>
    </Router>
  );
}

export default App;
