import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { FaBell, FaChevronDown, FaFacebookMessenger } from "react-icons/fa";
import { userRank } from "../Star";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/theme-dark.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const ProfileLink = ({ user, profileHandler, logoutHandler }) => {
  return (
    <div className={styles.profile}>
      {/* <div className=""> */}
      <Link to="/app/chats" className="btn">
        <FaFacebookMessenger />
      </Link>
      {/* </div> */}
      {/* <div className=""> */}
      <Link to="/app/notifications" className="btn">
        <FaBell />
      </Link>
      {/* </div> */}
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
