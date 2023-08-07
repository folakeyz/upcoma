import React from "react";
import { FaEllipsisV, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import cover from "../../../assets/images/cover.jpeg";
import userRank from "../../Star";
import styles from "./styles.module.css";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/theme-dark.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const UserCard = ({ user }) => {
  const f = [];
  var like = f.includes(user?._id);
  const likeArtist = () => {};
  const follow = () => {};
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <img src={user.photo ? `${user.photo}` : cover} alt="User DP" />
      </div>
      <div className={styles.text}>
        <div className={styles.profile}>
          <Link to={`/app/profile/${user?._id}`}>
            {user.stagename ? user?.stagename : user?.firstname}
            {userRank(user?.rank)}
          </Link>
        </div>
        <div className={styles.actions}>
          {like ? (
            <FaHeart onClick={() => likeArtist(user?._id)} color="#5b845a" />
          ) : (
            <FaRegHeart onClick={() => likeArtist(user?._id)} />
          )}
          <Menu
            menuButton={
              <MenuButton className={styles.menu}>
                <FaEllipsisV />
              </MenuButton>
            }
            transition
            theming="dark"
          >
            <MenuItem onClick={follow}>Follow</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
