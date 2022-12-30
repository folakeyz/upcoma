import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Player, ComedyCard } from "../../../components";
import { AuthContext } from "../../../context";
import Layout from "../../../Layout";
import PlaylistModal from "../../Home/PlaylistModal";
import { usePlaylist, useUpdatePlaylist } from "../Playlist/hooks";
import { useComedy } from "./hooks";

const Comedy = () => {
  const [playList, setPlaylist] = useState([]);
  const [open, setOpen] = useState();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const comedy = useComedy();
  // const { mutate } = usePlaySong();
  const { user } = useContext(AuthContext);
  const likedSongs = user?.likedComedy;

  const playlistHandler = (audio) => {
    let song = { ...audio, musicSrc: audio.song };
    setPlaylist((prev) => [...prev, song]);
    // mutate(audio._id);
  };

  const playlist = usePlaylist();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };
  const { mutate: add, isSuccess, reset } = useUpdatePlaylist();

  const submitHandler = () => {
    const data = {
      id: formData["playlist"],
      songs: JSON.stringify([formData["id"]]),
      _sid: "Comedy",
    };
    add(data);
  };
  const openHandler = (item) => {
    setOpen(!open);
    setFormData({ ...formData, id: item._id });
  };
  if (isSuccess) {
    reset();
    setOpen(false);
    setFormData("");
    toast.success("Added to Playlist", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }
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
              //myPlaylist={() => openHandler(item)}
            />
          ))}
        </div>
        <PlaylistModal
          setErrors={setErrors}
          submitHandler={submitHandler}
          open={open}
          errors={errors}
          formData={formData}
          handleChange={handleChange}
          validationHandler={validationHandler}
          playlist={playlist}
          setOpen={setOpen}
        />
        <Player playlist={playList} />
      </div>
    </Layout>
  );
};

export default Comedy;
