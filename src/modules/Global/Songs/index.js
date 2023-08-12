import React, { useContext, useEffect, useState } from "react";
import { Player, SongCard } from "../../../components";
import { AuthContext } from "../../../context";
import Layout from "../../../layout";
import { hooks } from "../../../hooks";
import { toast } from "react-toastify";
import PlaylistModal from "../../Home/PlaylistModal";
import { Input, Select } from "mtforms";
import styles from "../Profile/styles.module.css";
const Songs = () => {
  const [playList, setPlaylist] = useState([]);
  const [open, setOpen] = useState();
  const [formData, setFormData] = useState({});
  const [songData, setSongData] = useState({
    name: "",
    artistName: "",
    genre: "",
  });
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

  const handleSongChange = (name, value) => {
    setSongData({ ...songData, [name]: value });
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
  const genre = hooks.useGenres();

  const [filteredSongs, setFilteredSongs] = useState([]);

  // Call filterSongs whenever form data changes
  useEffect(() => {
    const filterSongs = () => {
      const filtered = song.filter((item) => {
        const nameMatch =
          item.name &&
          item.name.toLowerCase().includes(songData.name.toLowerCase());
        const artistMatch =
          item.artist &&
          item.artist.toLowerCase().includes(songData.artistName.toLowerCase());
        const genreMatch =
          songData.genre === "" ||
          (item.genre._id && item.genre._id === songData.genre);
        return nameMatch && artistMatch && genreMatch;
      });
      setFilteredSongs(filtered);
    };
    filterSongs();
  }, [songData, song]);

  return (
    <Layout name="Songs">
      <div className="pageContents">
        <div className={styles.filterContainer}>
          <div className={styles.large}>Filter Songs by:</div>
          <Input
            name="name"
            label="Song Name"
            type="text"
            value={songData["name"]}
            onChange={handleSongChange}
            size="small"
          />
          <Input
            name="artistName"
            label="Artist Name"
            type="text"
            value={songData["artistName"]}
            onChange={handleSongChange}
            size="small"
          />
          <Select
            name="genre"
            value={songData["genre"]}
            onChange={handleSongChange}
            data={genre}
            filter="name"
            filterValue="_id"
            label="Genre"
            size="small"
          />
        </div>
        <div className="cardFlex">
          {filteredSongs?.map((item, i) => (
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
