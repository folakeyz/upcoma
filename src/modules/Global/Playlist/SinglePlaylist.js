import { useIsMutating } from "@tanstack/react-query";
import { Button, Select } from "mtforms";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Player, TrendCard } from "../../../components";
import Layout from "../../../Layout";
import { useSong } from "../Songs/hooks";
import { usePlaylist, useUpdatePlaylist } from "./hooks";
import styles from "./styles.module.css";

const SinglePlaylist = () => {
  const { id } = useParams();
  const loading = useIsMutating();
  const playlist = usePlaylist();
  const orin = useSong();
  const single = playlist?.find((x) => x._id === id);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [songs, setSongs] = useState([]);
  const [playList, setPlayList] = useState([]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const addSongHandler = () => {
    const exist = songs.find((x) => x === formData["song"]);
    if (exist) return;
    setSongs([...songs, formData["song"]]);
  };

  const getSongDetails = (id) => {
    const mySongs = orin.find((x) => x._id === id);
    return mySongs;
  };
  const removeSongHandler = (item) => {
    const filter = songs.filter((x) => x !== item);
    setSongs(filter);
  };
  const { mutate, isSuccess, reset } = useUpdatePlaylist();
  const submitHandler = () => {
    if (songs.length === 0) {
      return toast.error("Add a Song", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    const data = { id: id, songs: JSON.stringify(songs) };
    mutate(data);
  };
  if (isSuccess) {
    reset();
    setOpen(false);
    setFormData("");
    setSongs([]);
  }

  const playlistHandler = (audio) => {
    if (audio.length === 0) return toast.error("No song on this playlist");
    for (var i = 0; audio.length > i; i++) {
      let song = { ...audio[i], musicSrc: audio[i].song };
      setPlayList((prev) => [...prev, song]);
    }
  };

  return (
    <Layout name="My Playlist">
      <div className="pageContents">
        <div className="btnContainer right">
          <button
            type="button"
            className="btn action"
            onClick={() => setOpen(!open)}
          >
            Add Songs to Playlist
          </button>
          <button
            type="button"
            className="btn btnOrange"
            onClick={() => playlistHandler(single?.song)}
          >
            Play
          </button>
        </div>
        <div className="modalTitle colorWhite">{single?.name}</div>
        <div className="col">
          {single?.song?.map((item, i) => (
            <TrendCard song={item} play={playlistHandler} key={i} />
          ))}
        </div>
        <Modal
          isVisible={open}
          size="xl"
          content={
            <div className={styles.songContainer}>
              <div className={styles.songList}>
                {songs?.map((item, i) => (
                  <div key={i} className="trending">
                    <div className={styles.card}>
                      <TrendCard song={getSongDetails(item)} />
                    </div>
                    <div className="card-1">
                      <Button
                        type="button"
                        title="Remove"
                        className={`btnDanger ${styles.margin}`}
                        onClick={() => removeSongHandler(item)}
                        size="small"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Select
                name="song"
                value={formData["song"]}
                onChange={handleChange}
                data={orin}
                filter="name"
                filterValue="_id"
                className="whiteBorder"
                validationHandler={validationHandler}
                error={errors.song}
                label="Select Song"
                labelClassName="whiteLabel"
              />
              <Button
                type="button"
                title="Add Song"
                className={`btnGreen ${styles.margin}`}
                onClick={addSongHandler}
                size="small"
              />

              <Button
                type="button"
                title="Save Playlist"
                className={`btnGreen ${styles.margin}`}
                onClick={submitHandler}
                size="small"
                loading={loading === 1}
              />
            </div>
          }
          onClose={() => setOpen(!open)}
        />
        <Player playlist={playList} />
      </div>
    </Layout>
  );
};

export default SinglePlaylist;
