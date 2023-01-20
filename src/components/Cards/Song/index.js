import React, { useContext } from "react";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaEllipsisV,
  FaShareAlt,
  FaDownload,
  FaClipboardList,
  FaRegHeart,
} from "react-icons/fa";
import cover from "../../../assets/images/cover.jpeg";
import { RiPlayCircleFill } from "react-icons/ri";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/theme-dark.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import ShareButton from "react-web-share-button";
import { useLikeSong } from "../../../modules/Global/Songs/hooks";
import { AuthContext } from "../../../context";

const SongCard = ({ song, play, liked = [], myPlaylist }) => {
  const { mutate } = useLikeSong();
  const likeSongHandler = (id) => {
    mutate(song?._id);
  };
  const navigate = useNavigate();

  // var like = liked?.includes(song?._id);

  const redirect = () => {
    navigate(`/app/song/${song._id}`);
  };

  const { user } = useContext(AuthContext);

  var like = false;
  for (var i = 0; i < liked.length; i++) {
    if (liked[i]._id === song?._id) {
      like = true;
      break;
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.img} onClick={redirect}>
        <img src={song.cover ? `${song.cover}` : cover} alt="title" />
      </div>

      {/* <div className={styles.overlay}>
        <RiPlayCircleFill onClick={play} />
      </div> */}

      <div className={styles.text}>
        <div className={styles.circle} onClick={play}>
          <RiPlayCircleFill />
        </div>
        <div className={styles.profile}>
          <Link to={`/app/song/${song?._id}`}>
            <p>{song?.name}</p>
          </Link>

          <Link to={`/app/profile/${song?.user?._id}`}>
            {song?.artist.slice(0, 18)}
            {song?.artist.length > 18 && "..."}
          </Link>
        </div>
        <div className={styles.properties}>
          {user && (
            <>
              {like ? (
                <FaHeart
                  onClick={() => likeSongHandler(song?._id)}
                  color="#5b845a"
                />
              ) : (
                <FaRegHeart onClick={() => likeSongHandler(song?._id)} />
              )}
            </>
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
            <MenuItem onClick={play}>
              <FaClipboardList />
              &nbsp;&nbsp;Add to Playlist
            </MenuItem>
            {user && (
              <MenuItem onClick={myPlaylist}>
                <FaClipboardList />
                &nbsp;&nbsp;Add to My Playlist
              </MenuItem>
            )}
            <MenuItem className={styles.menu}>
              <FaShareAlt />
              &nbsp;&nbsp;
              <ShareButton
                title={song?.name}
                text={`listen to ${song?.name} by ${song?.artist}`}
                url={window.location.href}
                className={styles.menu}
              />
            </MenuItem>
            <MenuItem>
              <FaDownload />
              &nbsp;&nbsp;Download
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
