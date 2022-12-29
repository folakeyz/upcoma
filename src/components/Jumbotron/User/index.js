import React, { useContext } from "react";
import styles from "./styles.module.css";

import ShareButton from "react-web-share-button";
import { FaHeart, FaShareAlt, FaUsers } from "react-icons/fa";
import { AuthContext } from "../../../context";
import { Avatar } from "../../Avatar";
import {
  useFollow,
  useLike,
} from "../../../modules/Global/GlobalProfile/hooks";

const UserJumbotron = ({ profile }) => {
  const { user } = useContext(AuthContext);
  const { mutate } = useLike();
  const likeSongHandler = () => {
    mutate(profile._id);
  };
  var like = profile?.likes?.includes(user?._id);
  var followed = profile?.followers?.includes(user?._id);

  const { mutate: follow } = useFollow();
  const followUser = () => {
    follow(profile._id);
  };

  console.log(user, "users");

  return (
    <div className={styles.jumbo}>
      <div className={styles.profile}>
        <div className={styles.dp}>
          {profile?.photo ? (
            <img src={profile?.photo} alt={profile?.firstname} />
          ) : (
            Avatar(profile?.gender)
          )}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <h1>{profile?.firstname + " " + profile?.lastname}</h1>
          <span>{profile?.bio}</span>
        </div>
        {/* actions */}
        <div className={styles.actions}>
          <button
            className={`btn action ${followed && "btnOrange"}`}
            type="button"
            onClick={followUser}
            disabled={!user}
          >
            <FaUsers />
            {profile?.followers?.length} Followers
          </button>
          <button
            className={`btn action ${like && "btnOrange"}`}
            disabled={!user}
            onClick={likeSongHandler}
            type="button"
          >
            <FaHeart />
            {profile?.likes?.length} Like
          </button>

          <span className="btn btnAction action">
            <FaShareAlt />
            <ShareButton
              title={profile?.name}
              text={`Share ${profile?.stagename} profile`}
              url={window.location.href}
              className={styles.menu}
            />
          </span>
          {/* <button className="btn action" onClick={play}>
            <FaPlay />
            Play Song
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default UserJumbotron;
