import React, { useContext, useState } from "react";
import { CommentsCard, Player, SongJumbotron } from "../../../components";
import { AuthContext } from "../../../context";
import Layout from "../../../layout";
import { hooks } from "../../../hooks";
import { toast } from "react-toastify";
import { Button, FormGroup, Textarea } from "mtforms";
import styles from "../Profile/styles.module.css";
import { Rating } from "react-simple-star-rating";
import { useIsMutating } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
const Songs = () => {
  const loading = useIsMutating();

  const [playList, setPlaylist] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const song = hooks.useSong();
  const singleSong = song.find((x) => x._id === id);
  const { mutate } = hooks.usePlaySong();
  const liked = user?.likedSongs;

  const playlistHandler = (audio) => {
    let song = { ...audio, musicSrc: audio.song };
    setPlaylist((prev) => [...prev, song]);
    mutate(audio._id);
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleRating = (rate) => {
    setFormData({ ...formData, rating: rate });
  };

  const { mutate: post, reset, isSuccess } = hooks.usePostComment();
  const submitHandler = () => {
    if (!formData["rating"])
      return toast.error("Please Rate this song", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    const data = { id: id, ...formData };
    post(data);
  };
  if (isSuccess) {
    reset();
    setFormData("");
  }

  return (
    <Layout name="Songs">
      <div className="pageContents">
        <SongJumbotron
          song={singleSong}
          play={() => playlistHandler(singleSong)}
          liked={liked}
        />
        {/* Comments */}
        <div className="comments">
          Comments
          {singleSong?.comments?.map((item, i) => (
            <CommentsCard key={i} item={item} />
          ))}
        </div>

        <div className="postComment">
          <div className="postTitle">
            <h3>Post a Comment</h3>
          </div>

          <FormGroup
            onSubmit={submitHandler}
            validation={formData}
            errors={errors}
            setErrors={setErrors}
          >
            <div className="inputContainer">
              <div className={styles.songList}>
                Song Rating:
                <Rating onClick={handleRating} size={20} />
              </div>
            </div>

            <Textarea
              name="comment"
              label="Comment"
              type="text"
              value={formData["comment"]}
              onChange={handleChange}
              required={true}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.comment}
            />
            <Button
              type="submit"
              title="Post Comment"
              loading={loading === 1}
              className="btnOrange"
            />
          </FormGroup>
        </div>

        {/* end of Comments */}
        <Player playlist={playList} />
      </div>
    </Layout>
  );
};

export default Songs;
