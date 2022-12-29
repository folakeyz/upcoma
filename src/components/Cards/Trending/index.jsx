import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import cover from "../../../assets/images/cover.jpeg";
import { userRank } from "../../Star";

const TrendCard = ({ song, play }) => {
  return (
    <div className={`${styles.text} ${styles.marginBottom}`}>
      <div className={styles.photo}>
        <div className={styles.img} onClick={play}>
          <img
            src={song && song.cover ? `${song?.cover}` : cover}
            alt="title"
            onClick={play}
          />
        </div>
      </div>
      <div className={`${styles.profile} ${styles.column}`}>
        <Link to={`/app/song/${song?._id}`}>
          <p>{song?.name}</p>
        </Link>
        <Link to={`/app/profile/${song?.user?._id}`}>
          {song?.artist} {userRank(song?.user?.rank)}
        </Link>
      </div>
    </div>
  );
};

export default TrendCard;
