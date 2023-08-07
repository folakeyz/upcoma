import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import cover from "../../../assets/images/cover.jpeg";

const PlaylistCard = ({ songs }) => {
  return (
    <Link to={`/app/playlist/${songs._id}`} className={`${styles.card}`}>
      <div className={styles.photo}>
        <div className={styles.img}>
          <img
            src={songs && songs.cover ? `${songs?.cover}` : cover}
            alt="title"
          />
        </div>
      </div>
      <div className={`${styles.profile} column`}>
        <p>{songs?.name}</p>
      </div>
    </Link>
  );
};

export default PlaylistCard;
