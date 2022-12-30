import { useIsMutating } from "@tanstack/react-query";
import { Button, FormGroup, Input, Select, Textarea } from "mtforms";
import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import { Options } from "../../../../../components";
import Layout from "../../../../../Layout";
import { ImageUpload, SongUpload } from "../../../components";
import { useGenres } from "../../Artist/Song/hooks";
import styles from "../../Artist/Song/styles.module.css";
import { useUploadBeat } from "./hooks";
const UploadBeat = () => {
  const navigate = useNavigate();
  const loading = useIsMutating();
  const genres = useGenres();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");
  const [audio, setAudio] = useState("");

  const { mutate, isSuccess, reset } = useUploadBeat();
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
  const submitHandler = () => {
    if (!formData["rating"]) return toast.error("Please Rate your mix");
    mutate(formData);
  };
  const handleRating = (rate) => {
    setFormData({ ...formData, rating: rate });
  };
  if (isSuccess) {
    reset();
    navigate("/app/musician/beats");
  }
  return (
    <Layout>
      <div className="pageContents">
        <div className="col uploadForm">
          <FormGroup
            onSubmit={submitHandler}
            validation={formData}
            errors={errors}
            setErrors={setErrors}
          >
            <Input
              name="name"
              label="Beat Title"
              type="text"
              value={formData["name"]}
              onChange={handleChange}
              required={true}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.name}
            />
            <Input
              name="producer"
              label="Producer"
              type="text"
              value={formData["producer"]}
              onChange={handleChange}
              required={true}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.producer}
            />

            <Select
              name="genre"
              value={formData["genre"]}
              onChange={handleChange}
              required={true}
              data={genres}
              filter="name"
              filterValue="_id"
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.genre}
              label="Genre"
              labelClassName="whiteLabel"
            />

            <Select
              name="type"
              value={formData["type"]}
              onChange={handleChange}
              required={true}
              data={Options.type}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.type}
              label="Beat Type"
              labelClassName="whiteLabel"
            />

            {formData["type"] === "Paid" && (
              <Input
                name="price"
                label="Beat Price"
                type="text"
                value={formData["price"]}
                onChange={handleChange}
                required={formData["type"] === "Paid"}
                className="whiteBorder"
                validationHandler={validationHandler}
                error={errors.price}
              />
            )}

            <ImageUpload
              name="cover"
              title="Click to upload Beat Cover"
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
              title="Click to upload Beat"
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
              <h4>Rate this beat</h4>
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
              title="Upload Beat"
              loading={loading === 1}
              className="btnOrange"
            />
          </FormGroup>
        </div>
      </div>
    </Layout>
  );
};

export default UploadBeat;
