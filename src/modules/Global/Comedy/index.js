import React, { useContext, useState } from "react";
import { Player, ComedyCard } from "../../../components";
import { AuthContext } from "../../../context";
import Layout from "../../../Layout";
import { useComedy } from "./hooks";

const Comedy = () => {
  const [playList, setPlaylist] = useState([]);
  const comedy = useComedy();
  // const { mutate } = usePlaySong();
  const { user } = useContext(AuthContext);
  const likedSongs = user?.likedComedy;

  const playlistHandler = (audio) => {
    let song = { ...audio, musicSrc: audio.song };
    setPlaylist((prev) => [...prev, song]);
    // mutate(audio._id);
  };
  console.log(comedy, "comedy");
  console.log(user, "user");
  return (
    <Layout>
      <div className="pageContents">
        <div className="cardFlex">
          {comedy?.map((item, i) => (
            <ComedyCard
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

export default Comedy;
