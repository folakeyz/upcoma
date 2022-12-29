import { useIsMutating } from "@tanstack/react-query";
import { Button, FormGroup, Textarea } from "mtforms";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentsCard, Player, BeatJumbotron } from "../../../components";
import { AuthContext } from "../../../context";
import Layout from "../../../Layout";
import { useBeat, useBuyBeat, usePlayBeat, usePostComment } from "./hooks";
import { Rating } from "react-simple-star-rating";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { usePaystackPayment } from "react-paystack";

const SingleBeat = () => {
  const loading = useIsMutating();

  const [playList, setPlaylist] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const song = useBeat();
  const singleSong = song.find((x) => x._id === id);
  const { mutate } = usePlayBeat();
  const liked = user?.likedBeats;
  var purchased = user?.myBeats?.includes(id);

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

  const { mutate: post, reset, isSuccess } = usePostComment();
  const submitHandler = () => {
    if (!formData["rating"])
      return toast.error("Please Rate this beat", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    const data = { id: id, ...formData };
    post(data);
  };
  if (isSuccess) {
    reset();
    setFormData("");
  }

  // payment
  const { mutate: purchase } = useBuyBeat();
  const price = singleSong?.price * 100 || 0;
  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: price,
    //    publicKey: "pk_test_4a87de5ce838bd89a07091c9ec0e69e7d924713a",
    publicKey: "pk_test_9d3b9a1a4002d8cd62fe1fb182753a0229b0abf8",
  };
  const onSuccess = (reference) => {
    const payment = { id: id, ...reference };
    purchase(payment);
  };

  const onClose = () => {
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <Layout>
      <div className="pageContents">
        <BeatJumbotron
          song={singleSong}
          play={() => playlistHandler(singleSong)}
          liked={liked}
          payment={() => {
            initializePayment(onSuccess, onClose);
          }}
        />
        {/* Comments */}
        <div className="comments">
          Comments
          {singleSong?.comments?.map((item, i) => (
            <CommentsCard key={i} item={item} />
          ))}
        </div>

        {singleSong?.type === "Free" && (
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
        )}

        {singleSong?.type === "Paid" && purchased && (
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
        )}

        {/* end of Comments */}
        <Player playlist={playList} />
      </div>
    </Layout>
  );
};

export default SingleBeat;
