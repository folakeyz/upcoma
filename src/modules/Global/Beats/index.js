import React, { useContext, useState } from "react";
import { BeatsCard, Player } from "../../../components";
import { AuthContext } from "../../../context";
import Layout from "../../../layout";
import { hooks } from "../../../hooks";

const Beats = () => {
  const beat = hooks.useBeat();
  const [playList, setPlaylist] = useState([]);

  const { mutate } = hooks.usePlayBeat();
  const { user } = useContext(AuthContext);
  const likedSongs = user?.likedBeats;

  const playlistHandler = (audio) => {
    let song = { ...audio, musicSrc: audio.song };
    setPlaylist((prev) => [...prev, song]);
    mutate(audio._id);
  };

  return (
    <Layout name="Beats">
      <div className="pageContents">
        <div className="cardFlex">
          {beat?.map((item, i) => (
            <BeatsCard
              key={i}
              song={item}
              play={() => playlistHandler(item)}
              liked={likedSongs}
            />
          ))}
        </div>
        <Player playlist={playList} />
      </div>
    </Layout>
  );
};

export default Beats;
