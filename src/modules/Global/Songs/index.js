import React, { useContext, useState } from "react";
import { Player, SongCard } from "../../../components";
import { AuthContext } from "../../../context";
import Layout from "../../../layout";
import { hooks } from "../../../hooks";
import { toast } from "react-toastify";
import PlaylistModal from "../../Home/PlaylistModal";
import { Input, Select } from "mtforms";
import styles from '../Profile/styles.module.css'
const Songs = () => {
  const [playList, setPlaylist] = useState([]);
  const [open, setOpen] = useState();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const song = hooks.useSong();
  const { mutate } = hooks.usePlaySong();
  const { user } = useContext(AuthContext);
  const likedSongs = user?.likedSongs;

  const playlistHandler = (audio) => {
    let song = { ...audio, musicSrc: audio.song };
    setPlaylist((prev) => [...prev, song]);
    mutate(audio._id);
  };

  const playlist = hooks.usePlaylist();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };
  const { mutate: add, isSuccess, reset } = hooks.useUpdatePlaylist();

  const submitHandler = () => {
    const data = {
      id: formData["playlist"],
      songs: JSON.stringify([formData["id"]]),
      _sid: "Song",
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
  const genre = hooks.useGenres()
  return (
    <Layout name="Songs">
      <div className="pageContents">
        <div>
        <Input
                name="name"
                label="Name"
                type="text"
                value={formData["name"]}
                onChange={handleChange}
                required={true}
                className={styles.white}
                validationHandler={validationHandler}
                error={errors.name}
              />
              

              <Select
              name="genre"
              value={formData["genre"]}
              onChange={handleChange}
              required={true}
              data={genre}
              filter="name"
              filterValue="_id"
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.genre}
              label="Genre"
              labelClassName="whiteLabel"
            />
        </div>
        <div className="cardFlex">
          {song?.map((item, i) => (
            <SongCard
              key={i}
              song={item}
              play={() => playlistHandler(item)}
              liked={likedSongs}
              myPlaylist={() => openHandler(item)}
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

export default Songs;
