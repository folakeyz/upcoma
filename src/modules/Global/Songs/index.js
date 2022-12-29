import React, { useContext, useState } from "react";
import { Player, SongCard } from "../../../components";
import { AuthContext } from "../../../context";
import Layout from "../../../Layout";
import { usePlaySong, useSong } from "./hooks";

const Song = () => {
  const [playList, setPlaylist] = useState([]);
  const song = useSong();
  const { mutate } = usePlaySong();
  const { user } = useContext(AuthContext);
  const likedSongs = user?.likedSongs;

  const playlistHandler = (audio) => {
    let song = { ...audio, musicSrc: audio.song };
    setPlaylist((prev) => [...prev, song]);
    mutate(audio._id);
  };
  return (
    <Layout>
      <div className="pageContents">
        <div className="cardFlex">
          {song?.map((item, i) => (
            <SongCard
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

export default Song;
