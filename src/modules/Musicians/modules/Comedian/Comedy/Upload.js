import { Button, FormGroup, Input, Textarea } from "mtforms";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../../../../Layout";
import ReactAudioPlayer from "react-audio-player";
import { useUploadComedy } from "./hooks";
import { Rating } from "react-simple-star-rating";
import { useIsMutating } from "@tanstack/react-query";
import styles from "../../Artist/Song/styles.module.css";
import { SongUpload, ImageUpload } from "../../../components";

const UploadComedy = () => {
  const navigate = useNavigate();
  const loading = useIsMutating();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");
  const [audio, setAudio] = useState("");

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    let file = e.target.files[0];

    setFormData({ ...formData, [name]: file });
    const objectUrl = URL.createObjectURL(file);
    if (name === "cover") {
      setPreview(objectUrl);
    }
    if (name === "song") {
      setAudio(objectUrl);
    }
  };

  const { mutate, isSuccess, reset } = useUploadComedy();
  const submitHandler = () => {
    if (!formData["rating"]) return toast.error("Please Rate your Comedy");
    mutate(formData);
  };
  const handleRating = (rate) => {
    setFormData({ ...formData, rating: rate });
  };
  if (isSuccess) {
    reset();
    navigate("/app/musician/comedy");
  }
  return (
    <Layout>
      <div className="pageContents">
        <div className="col uploadForm">
          <div className="modalTitle">
            Fill The Form To Complete Your Song Upload
          </div>
          <FormGroup
            onSubmit={submitHandler}
            validation={formData}
            errors={errors}
            setErrors={setErrors}
          >
            <Input
              name="name"
              label="Comedy Title"
              type="text"
              value={formData["name"]}
              onChange={handleChange}
              required={true}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.name}
              size="large"
            />

            <ImageUpload
              name="cover"
              title="Click to upload Comedy Cover"
              value={formData["cover"]}
              onChange={handleFileChange}
              required={true}
            />
            {preview && (
              <div className="imgContainer">
                <img src={preview} alt="Preview" />
              </div>
            )}
            <SongUpload
              name="song"
              title="Click to upload Comedy"
              value={formData["song"]}
              onChange={handleFileChange}
              required={true}
            />
            {audio && (
              <div className="imgContainer">
                <ReactAudioPlayer src={audio} autoPlay={false} controls />
              </div>
            )}
            <div className={styles.songContainer}>
              <h4>Rate this song</h4>
              <br />
              <br />
              <div className={styles.songList}>
                <Rating onClick={handleRating} size={20} />
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
            </div>
            <Button
              type="submit"
              title="Upload Comedy"
              loading={loading === 1}
              className="btnOrange"
            />
          </FormGroup>
        </div>
      </div>
    </Layout>
  );
};

export default UploadComedy;
