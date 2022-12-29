import React from "react";
import { Link } from "react-router-dom";
import { BiBookBookmark, BiHomeAlt } from "react-icons/bi";
import { RiCalendarEventFill } from "react-icons/ri";
import {
  BsBarChart,
  BsFillInfoCircleFill,
  BsMusicPlayer,
} from "react-icons/bs";
import { FaDrum, FaMusic, FaPlayCircle, FaListAlt } from "react-icons/fa";
import { AiOutlineFire } from "react-icons/ai";
import styles from "./styles.module.css";

const LabelLink = () => {
  return (
    <>
      <div className={styles.links}>
        <ul>
          <li>
            <Link to="/">
              <BiHomeAlt />
              Home
            </Link>
          </li>
          <li>
            <Link to="/app/songs">
              <FaPlayCircle /> Songs
            </Link>
          </li>
          <li>
            <Link to="/app/playlist">
              <FaListAlt /> My Playlist
            </Link>
          </li>
          <li>
            <Link to="/app/bookings">
              <BiBookBookmark /> Book Talent
            </Link>
          </li>

          <li>
            <Link to="/app/comedy">
              <RiCalendarEventFill />
              Comedy
            </Link>
          </li>
          <li>
            <Link to="/app/beats">
              <FaDrum />
              Beats
            </Link>
          </li>
          <li>
            <Link to="/app/dj">
              <BsMusicPlayer />
              Dj Booth
            </Link>
          </li>
          <li>
            <Link to="/app/competitons">
              <BsFillInfoCircleFill /> Competitions
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.links}>
        <p>Charts</p>
        <ul>
          <li>
            <Link to="/app/trending">
              <BsBarChart /> Trending
            </Link>
          </li>
          <li>
            <Link to="/#">
              <BsFillInfoCircleFill /> Resource Hub
            </Link>
          </li>
          <li>
            <Link to="/app/topsongs">
              <FaMusic /> Top Songs
            </Link>
          </li>
          <li>
            <Link to="/app/toptalents">
              <AiOutlineFire />
              Top Talent
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LabelLink;
