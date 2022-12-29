import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { FaChevronDown } from "react-icons/fa";
import { userRank } from "../Star";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/theme-dark.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const ProfileLink = ({ user, profileHandler, logoutHandler }) => {
  return (
    <div className={styles.profile}>
      <div className="padding10">
        <Link to="/app/admin/events/view" className="btn btnOrange btnRadius">
          Events
        </Link>
      </div>
      {user?.role === "Artist" && (
        <div className="padding10">
          <Link
            to="/app/artiste/songs/upload"
            className="btn btnWhite btnRadius"
          >
            Upload Song
          </Link>
        </div>
      )}
      <Menu
        menuButton={
          <MenuButton className={styles.flex}>
            Hi {user?.firstname} {userRank(user?.rank)}!&nbsp;&nbsp;
            <FaChevronDown />
          </MenuButton>
        }
        transition
        theming="dark"
      >
        <MenuItem onClick={profileHandler}>My Profile</MenuItem>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileLink;
