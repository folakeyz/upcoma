import React, { useContext, useState } from "react";
import { Player, DJCard } from "../../../components";
import { AuthContext } from "../../../context";
import Layout from "../../../Layout";
import { useMix, usePlayMix } from "./hooks";

const DJBooth = () => {
  const [playList, setPlaylist] = useState([]);
  const dj = useMix();
  const { mutate } = usePlayMix();
  const { user } = useContext(AuthContext);
  const likedSongs = user?.likedDJ;

  const playlistHandler = (audio) => {
    let song = { ...audio, musicSrc: audio.song };
    setPlaylist((prev) => [...prev, song]);
    mutate(audio._id);
  };

  return (
    <Layout>
      <div className="pageContents">
        <div className="cardFlex">
          {dj?.map((item, i) => (
            <DJCard
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

export default DJBooth;
