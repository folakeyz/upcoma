import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ComedyCard, Player } from "../../../../../components";
import { AuthContext } from "../../../../../context";
import Layout from "../../../../../Layout";
import { useComedy } from "../../../../Global/Comedy/hooks";

const MyComedy = () => {
  const [playList, setPlaylist] = useState([]);
  const song = useComedy();
  const { user } = useContext(AuthContext);
  const likedSongs = user?.likedComedy;

  const playlistHandler = (audio) => {
    let song = { ...audio, musicSrc: audio.song };
    setPlaylist((prev) => [...prev, song]);
  };
  const mySongs = song.filter((x) => x?.user?._id === user?._id);
  return (
    <Layout>
      <div className="pageContents">
        <div className="btnContainer right">
          <Link to="/app/musician/comedy/manage" className="btn btnWhite">
            Manage Comedy
          </Link>
        </div>
        <div className="cardFlex">
          {mySongs?.map((item, i) => (
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

export default MyComedy;
