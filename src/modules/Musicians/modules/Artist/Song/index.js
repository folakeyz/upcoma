import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Player, SongCard } from "../../../../../components";
import { AuthContext } from "../../../../../context";
import Layout from "../../../../../Layout";
import { useSong } from "../../../../Global/Songs/hooks";

const MySongs = () => {
  const [playList, setPlaylist] = useState([]);
  const song = useSong();
  const { user } = useContext(AuthContext);
  const likedSongs = user?.likedSongs;

  const playlistHandler = (audio) => {
    let song = { ...audio, musicSrc: audio.song };
    setPlaylist((prev) => [...prev, song]);
  };
  const mySongs = song.filter((x) => x?.user?._id === user?._id);
  return (
    <Layout>
      <div className="pageContents">
        <div className="btnContainer right">
          <Link to="/app/musician/song/manage" className="btn btnWhite">
            Manage Songs
          </Link>
        </div>
        <div className="cardFlex">
          {mySongs?.map((item, i) => (
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

export default MySongs;
