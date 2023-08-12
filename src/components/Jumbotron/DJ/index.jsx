import React, { useContext } from "react";
import styles from "../Song/styles.module.css";
import cover from "../../../assets/images/cover.jpeg";
import ShareButton from "react-web-share-button";
import { FaHeart, FaPlay, FaPlayCircle, FaShareAlt } from "react-icons/fa";
import { AuthContext } from "../../../context";
import { hooks } from "../../../hooks";
const DJJumbotron = ({ song, play, liked }) => {
  const { user } = useContext(AuthContext);
  const { mutate } = hooks.useLikeMix();
  const likeSongHandler = () => {
    mutate(song._id);
  };
  var like = liked?.includes(song?._id);

  return (
    <div className={styles.jumbo}>
      <div className={styles.profile}>
        <div className={styles.dp}>
          <img src={song?.cover ? `${song?.cover}` : cover} alt="Cover" />
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <h1>{song?.name}</h1>
          <p>{song?.artist}</p>
          <span>{song?.description}</span>
        </div>
        {/* actions */}
        <div className={styles.actions}>
          <button className="btn action">
            <FaPlayCircle />
            {song?.stream} Total Stream
          </button>
          {!like ? (
            <button
              className={`btn action`}
              disabled={!user}
              onClick={likeSongHandler}
              type="button"
            >
              <FaHeart />
              Like
            </button>
          ) : (
            <button
              className={`btn action btnOrange`}
              disabled={!user}
              onClick={likeSongHandler}
              type="button"
            >
              <FaHeart />
              {song?.likes?.length}
            </button>
          )}

          <span className="btn btnAction action">
            <FaShareAlt />
            <ShareButton
              title={song?.name}
              text={`listen to ${song?.name} by ${song?.artist}`}
              url={window.location.href}
              className={styles.menu}
            />
          </span>
          <button className="btn action" onClick={play}>
            <FaPlay />
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default DJJumbotron;
