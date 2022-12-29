import React from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

const Player = ({ playlist = [] }) => {
  return (
    <>
      <ReactJkMusicPlayer
        mode={playlist.length > 0 ? "full" : "mini"}
        showDownload={false}
        toggleMode={true}
        audioLists={playlist}
        quietUpdate={true}
        glassBg={true}
        showReload={false}
        defaultPosition={{ right: 0, bottom: 10 }}
        remember={true}
        autoPlay={true}
      />
    </>
  );
};

export default Player;
