import { AiOutlineFire } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import {
  BsBarChart,
  BsCupStraw,
  BsFillBookmarkStarFill,
  BsFillBootstrapFill,
  BsFillEmojiHeartEyesFill,
  BsMusicNoteBeamed,
  BsMusicPlayer,
  BsMusicPlayerFill,
  BsUpload,
  BsXDiamondFill,
} from "react-icons/bs";
import { FaDrum, FaLayerGroup, FaMusic } from "react-icons/fa";
import { IoIosRibbon, IoMdRibbon } from "react-icons/io";
import { GiMedallist } from "react-icons/gi";
export const artistLinks = [
  { route: "/", name: "Home", Icon: BiHomeAlt },
  { route: "/app/dashboard", name: "My Dashboard", Icon: BsXDiamondFill },
  { route: "/app/songs", name: "Songs", Icon: BsMusicNoteBeamed },
  { route: "/app/musician/song", name: "My Songs", Icon: BsMusicPlayerFill },
  { route: "/app/musician/song/upload", name: "Upload Songs", Icon: BsUpload },
  { route: "/app/playlist", name: "My Playlist", Icon: FaMusic },
  { route: "/app/bookings", name: "Bookings", Icon: BsFillBootstrapFill },
  {
    route: "/app/musician/bookings",
    name: "My Bookings",
    Icon: BsFillBookmarkStarFill,
  },
  { route: "/app/events", name: "Events", Icon: BsCupStraw },
  {
    route: "/app/musician/events",
    name: "Registered Events",
    Icon: BsCupStraw,
  },
  { route: "/app/competitions", name: "Competitions", Icon: IoIosRibbon },
  {
    route: "/app/musician/competition",
    name: "Registered Competition",
    Icon: IoMdRibbon,
  },
  { route: "/app/comedy", name: "Comedy", Icon: BsFillEmojiHeartEyesFill },
  { route: "/app/beats", name: "Beats", Icon: FaDrum },
  { route: "/app/dj", name: "DJ Booth", Icon: BsMusicPlayer },
  { route: "/app/services", name: "Services", Icon: FaLayerGroup },
];

export const trendLinks = [
  { route: "/app/trending", name: "Trending", Icon: BsBarChart },
  //   { route: "/app/trending", name: "Resource Hub", Icon: BsFillInfoCircleFill },
  { route: "/app/toptalents", name: "Top Talents", Icon: FaMusic },
  { route: "/app/topsongs", name: "Top Songs", Icon: AiOutlineFire },
];

export const djLinks = [
  { route: "/", name: "Home", Icon: BiHomeAlt },
  { route: "/app/dashboard", name: "My Dashboard", Icon: BsXDiamondFill },
  { route: "/app/songs", name: "Songs", Icon: BsMusicNoteBeamed },
  { route: "/app/playlist", name: "My Playlist", Icon: FaMusic },
  { route: "/app/beats", name: "Beats", Icon: FaDrum },
  { route: "/app/dj", name: "DJ Booth", Icon: BsMusicPlayer },
  { route: "/app/musician/beats", name: "My Beats", Icon: BsMusicPlayerFill },
  { route: "/app/musician/beats/upload", name: "Upload Beats", Icon: BsUpload },
  { route: "/app/musician/mixs", name: "My Mixtapes", Icon: BsMusicPlayerFill },
  {
    route: "/app/musician/mixs/upload",
    name: "Upload Mixtapes",
    Icon: BsUpload,
  },
  { route: "/app/bookings", name: "Bookings", Icon: BsFillBootstrapFill },
  {
    route: "/app/musician/bookings",
    name: "My Bookings",
    Icon: BsFillBookmarkStarFill,
  },
  { route: "/app/events", name: "Events", Icon: BsCupStraw },
  {
    route: "/app/musician/events",
    name: "Registered Events",
    Icon: BsCupStraw,
  },
  { route: "/app/competitions", name: "Competitions", Icon: IoIosRibbon },
  {
    route: "/app/musician/competition",
    name: "Registered Competition",
    Icon: IoMdRibbon,
  },
  { route: "/app/comedy", name: "Comedy", Icon: BsFillEmojiHeartEyesFill },
  { route: "/app/services", name: "Services", Icon: FaLayerGroup },
];

export const comedyLinks = [
  { route: "/", name: "Home", Icon: BiHomeAlt },
  { route: "/app/dashboard", name: "My Dashboard", Icon: BsXDiamondFill },
  { route: "/app/songs", name: "Songs", Icon: BsMusicNoteBeamed },
  { route: "/app/playlist", name: "My Playlist", Icon: FaMusic },
  { route: "/app/comedy", name: "Comedy", Icon: BsFillEmojiHeartEyesFill },
  {
    route: "/app/musician/comedy",
    name: "My Comedy",
    Icon: BsFillEmojiHeartEyesFill,
  },
  {
    route: "/app/musician/comedy/upload",
    name: "Upload Comedy",
    Icon: BsUpload,
  },
  { route: "/app/bookings", name: "Bookings", Icon: BsFillBootstrapFill },
  {
    route: "/app/musician/bookings",
    name: "My Bookings",
    Icon: BsFillBookmarkStarFill,
  },
  { route: "/app/events", name: "Events", Icon: BsCupStraw },
  {
    route: "/app/musician/events",
    name: "Registered Events",
    Icon: BsCupStraw,
  },
  { route: "/app/competitions", name: "Competitions", Icon: IoIosRibbon },
  {
    route: "/app/musician/competition",
    name: "Registered Competition",
    Icon: IoMdRibbon,
  },

  { route: "/app/beats", name: "Beats", Icon: FaDrum },
  { route: "/app/dj", name: "DJ Booth", Icon: BsMusicPlayer },
  { route: "/app/services", name: "Services", Icon: FaLayerGroup },
];

export const prodLinks = [
  { route: "/", name: "Home", Icon: BiHomeAlt },
  { route: "/app/dashboard", name: "My Dashboard", Icon: BsXDiamondFill },
  { route: "/app/playlist", name: "My Playlist", Icon: FaMusic },
  { route: "/app/songs", name: "Songs", Icon: BsMusicNoteBeamed },
  { route: "/app/events", name: "Events", Icon: BsCupStraw },
  {
    route: "/app/musician/admin/events",
    name: "My Events",
    Icon: BsCupStraw,
  },
  {
    route: "/app/musician/admin/events/upload",
    name: "Upload Events",
    Icon: BsUpload,
  },
  { route: "/app/competitions", name: "Competitions", Icon: IoIosRibbon },
  {
    route: "/app/musician/admin/competition",
    name: "My Competition",
    Icon: IoMdRibbon,
  },
  {
    route: "/app/musician/admin/competition/upload",
    name: "Upload Competitions",
    Icon: BsUpload,
  },
  { route: "/app/bookings", name: "Bookings", Icon: BsFillBootstrapFill },
  {
    route: "/app/musician/bookings",
    name: "My Bookings",
    Icon: BsFillBookmarkStarFill,
  },
  { route: "/app/musician/beats", name: "My Beats", Icon: BsMusicPlayerFill },
  { route: "/app/musician/beats/upload", name: "Upload Beats", Icon: BsUpload },
  { route: "/app/musician/mixs", name: "My Mixtapes", Icon: BsMusicPlayerFill },
  {
    route: "/app/musician/mixs/upload",
    name: "Upload Mixtapes",
    Icon: BsUpload,
  },
  { route: "/app/watchlist", name: "My Watchlist", Icon: GiMedallist },
  { route: "/app/comedy", name: "Comedy", Icon: BsFillEmojiHeartEyesFill },
  { route: "/app/beats", name: "Beats", Icon: FaDrum },
  { route: "/app/dj", name: "DJ Booth", Icon: BsMusicPlayer },
  { route: "/app/services", name: "Services", Icon: FaLayerGroup },
];

export const globalLinks = [
  { route: "/", name: "Home", Icon: BiHomeAlt },
  { route: "/app/songs", name: "Songs", Icon: BsMusicNoteBeamed },
  { route: "/app/events", name: "Events", Icon: BsCupStraw },
  { route: "/app/competitions", name: "Competitions", Icon: IoIosRibbon },
  { route: "/app/comedy", name: "Comedy", Icon: BsFillEmojiHeartEyesFill },
  { route: "/app/beats", name: "Beats", Icon: FaDrum },
  { route: "/app/dj", name: "DJ Booth", Icon: BsMusicPlayer },
];

export const userLinks = [
  { route: "/", name: "Home", Icon: BiHomeAlt },
  { route: "/app/songs", name: "Songs", Icon: BsMusicNoteBeamed },
  { route: "/app/playlist", name: "My Playlist", Icon: FaMusic },
  { route: "/app/bookings", name: "Bookings", Icon: BsFillBootstrapFill },
  { route: "/app/events", name: "Events", Icon: BsCupStraw },
  { route: "/app/competitions", name: "Competitions", Icon: IoIosRibbon },
  { route: "/app/comedy", name: "Comedy", Icon: BsFillEmojiHeartEyesFill },
  { route: "/app/beats", name: "Beats", Icon: FaDrum },
  { route: "/app/dj", name: "DJ Booth", Icon: BsMusicPlayer },
  { route: "/app/services", name: "Services", Icon: FaLayerGroup },
];
