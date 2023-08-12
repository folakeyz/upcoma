import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BeatsCard, Player } from "../../../../../components";
import { AuthContext } from "../../../../../context";
import Layout from "../../../../../Layout";
import { useBeat } from "../../../../Global/Beats/hooks";

const MyBeats = () => {
  const [playList, setPlaylist] = useState();
  const dj = useBeat();
  const { user } = useContext(AuthContext);
  const likedSongs = user?.likedBeats;

  const playlistHandler = (audio) => {
    let song = { ...audio, musicSrc: audio.song };
    setPlaylist((prev) => [...prev, song]);
  };
  const myMix = dj.filter((x) => x?.user?._id === user?._id);
  return (
    <Layout name="My Beats">
      <div className="pageContents">
        <div className="btnContainer right">
          <Link to="/app/musician/beats/manage" className="btn btnWhite">
            Manage Beats
          </Link>
        </div>
        <div className="cardFlex">
          {myMix?.map((item, i) => (
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

export default MyBeats;
