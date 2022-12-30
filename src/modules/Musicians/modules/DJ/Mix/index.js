import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DJCard, Player } from "../../../../../components";
import { AuthContext } from "../../../../../context";
import Layout from "../../../../../Layout";
import { useMix } from "../../../../Global/DJBooth/hooks";

const MyMixTapes = () => {
  const [playList, setPlaylist] = useState();
  const dj = useMix();
  const { user } = useContext(AuthContext);
  const likedSongs = user?.likedDJ;

  const playlistHandler = (audio) => {
    let song = { ...audio, musicSrc: audio.song };
    setPlaylist((prev) => [...prev, song]);
  };
  const myMix = dj.filter((x) => x?.user?._id === user?._id);
  return (
    <Layout>
      <div className="pageContents">
        <div className="btnContainer right">
          <Link to="/app/musician/mixs/manage" className="btn btnWhite">
            Manage Mixs
          </Link>
        </div>
        <div className="cardFlex">
          {myMix?.map((item, i) => (
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

export default MyMixTapes;
