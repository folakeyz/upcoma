import React, { useContext, useState } from "react";
import { BeatsCard, Player } from "../../../components";
import { AuthContext } from "../../../context";
import Layout from "../../../Layout";
import { useBeat, usePlayBeat } from "./hooks";

const Beats = () => {
  const beat = useBeat();
  const [playList, setPlaylist] = useState([]);

  const { mutate } = usePlayBeat();
  const { user } = useContext(AuthContext);
  const likedSongs = user?.likedSongs;

  const playlistHandler = (audio) => {
    let song = { ...audio, musicSrc: audio.song };
    setPlaylist((prev) => [...prev, song]);
    mutate(audio._id);
  };
  console.log(beat, "beats");
  return (
    <Layout>
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
