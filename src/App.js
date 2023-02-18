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
  MyBookings,
  RegisteredEvents,
  Competition,
  SingleCompetition,
  RegisteredCompetitions,
  MyMixTapes,
  UploadMixTape,
  ManageMix,
  MyBeats,
  ManageBeats,
  UploadBeat,
  MyComedy,
  UploadComedy,
  ManageComedy,
  MyEvents,
  UploadEvent,
  ManageEvent,
  MyCompetitions,
  UploadCompetition,
  ManageCompetition,
  Chats,
  Notifications,
  Profile,
  Services,
  Trending,
  TopSongs,
  TopTalents,
  ForgotPassword,
  ResetPassword,
  EditProfile,
  MyWatchlist,
} from "./modules";
import Dashbboard from "./modules/Musicians/modules/Global/Dashboard";

function App() {
  const Stack = () => {
    return (
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/forgotPassword" exact element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" exact element={<ResetPassword />} />
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
        <Route path="/app/competitions" exact element={<Competition />} />
        <Route
          path="/app/competition/:id"
          exact
          element={<SingleCompetition />}
        />
        <Route path="/app/trending" exact element={<Trending />} />
        <Route path="/app/topsongs" exact element={<TopSongs />} />
        <Route path="/app/toptalents" exact element={<TopTalents />} />
      </Routes>
    );
  };

  const AuthStack = () => {
    return (
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/app/profile" exact element={<Profile />} />
        <Route path="/app/profile/edit" exact element={<EditProfile />} />
        <Route path="/app/songs" exact element={<Song />} />
        <Route path="/app/chats" exact element={<Chats />} />
        <Route path="/app/notifications" exact element={<Notifications />} />
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
        <Route path="/app/musician/bookings" exact element={<MyBookings />} />
        <Route
          path="/app/musician/events"
          exact
          element={<RegisteredEvents />}
        />
        <Route path="/app/competitions" exact element={<Competition />} />
        <Route
          path="/app/competition/:id"
          exact
          element={<SingleCompetition />}
        />
        <Route
          path="/app/musician/competition"
          exact
          element={<RegisteredCompetitions />}
        />
        <Route path="/app/musician/mixs" exact element={<MyMixTapes />} />
        <Route
          path="/app/musician/mixs/upload"
          exact
          element={<UploadMixTape />}
        />
        <Route path="/app/musician/mixs/manage" exact element={<ManageMix />} />
        <Route path="/app/musician/beats" exact element={<MyBeats />} />
        <Route
          path="/app/musician/beats/upload"
          exact
          element={<UploadBeat />}
        />
        <Route
          path="/app/musician/beats/manage"
          exact
          element={<ManageBeats />}
        />
        <Route path="/app/musician/comedy" exact element={<MyComedy />} />
        <Route
          path="/app/musician/comedy/upload"
          exact
          element={<UploadComedy />}
        />
        <Route
          path="/app/musician/comedy/manage"
          exact
          element={<ManageComedy />}
        />
        <Route path="/app/musician/admin/events" exact element={<MyEvents />} />
        <Route
          path="/app/musician/admin/events/upload"
          exact
          element={<UploadEvent />}
        />
        <Route
          path="/app/musician/admin/events/manage"
          exact
          element={<ManageEvent />}
        />
        <Route
          path="/app/musician/admin/competition"
          exact
          element={<MyCompetitions />}
        />
        <Route
          path="/app/musician/admin/competition/upload"
          exact
          element={<UploadCompetition />}
        />
        <Route
          path="/app/musician/competition/manage"
          exact
          element={<ManageCompetition />}
        />
        <Route path="/app/services" exact element={<Services />} />
        <Route path="/app/trending" exact element={<Trending />} />
        <Route path="/app/topsongs" exact element={<TopSongs />} />
        <Route path="/app/toptalents" exact element={<TopTalents />} />
        <Route path="/app/watchlist" exact element={<MyWatchlist />} />
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
