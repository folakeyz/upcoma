import React, { useState } from "react";

import Layout from "../../../layout";
import { useIsMutating } from "@tanstack/react-query";
import { hooks } from "../../../hooks";
import { Button, FormGroup, Input, Select, Textarea } from "mtforms";
import { Options } from "../../../components";
import ReactAudioPlayer from "react-audio-player";
import { ImageUpload, SongUpload } from "../../Musicians/components";

const Services = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");
  const [audio, setAudio] = useState("");
  const loading = useIsMutating();

  const genres = hooks.useGenres();

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

  const { mutate, isSuccess, reset } = hooks.useUploadService();
  const submitHandler = () => {
    mutate(formData);
  };
  if (isSuccess) {
    reset();
    setFormData("");
  }
  return (
    <Layout name="Services">
      <div className="pageContents">
        <div className="col uploadForm">
          <div className="modalTitle">
            Fill the form to request for Services
          </div>

          <FormGroup
            onSubmit={submitHandler}
            validation={formData}
            errors={errors}
            setErrors={setErrors}
          >
            <Select
              name="service"
              value={formData["service"]}
              onChange={handleChange}
              required={true}
              data={Options.services}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.service}
              label="Select Service"
              labelClassName="whiteLabel"
            />
            {formData["service"] === "Music Distribution" && (
              <>
                <Input
                  name="songName"
                  label="Song Title"
                  type="text"
                  value={formData["songName"]}
                  onChange={handleChange}
                  required={formData["service"] === "Music Distribution"}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.songName}
                />
                <Input
                  name="artist"
                  label="Artist Name"
                  type="text"
                  value={formData["artist"]}
                  onChange={handleChange}
                  required={formData["service"] === "Music Distribution"}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.artist}
                />

                <Select
                  name="genre"
                  value={formData["genre"]}
                  onChange={handleChange}
                  required={formData["service"] === "Music Distribution"}
                  data={genres}
                  filter="name"
                  filterValue="_id"
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.genre}
                  label="Genre"
                  labelClassName="whiteLabel"
                />
                <Input
                  name="album"
                  label="Album"
                  type="text"
                  value={formData["album"]}
                  onChange={handleChange}
                  required={formData["service"] === "Music Distribution"}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.album}
                />
                <ImageUpload
                  name="cover"
                  title="Click to upload Song Cover"
                  value={formData["cover"]}
                  onChange={handleFileChange}
                  required={formData["service"] === "Music Distribution"}
                />
                {preview && (
                  <div className="imgContainer">
                    <img src={preview} alt="Preview" />
                  </div>
                )}
                <SongUpload
                  name="song"
                  title="Click to upload Song"
                  value={formData["song"]}
                  onChange={handleFileChange}
                  required={formData["service"] === "Music Distribution"}
                />
                {audio && (
                  <div className="imgContainer">
                    <ReactAudioPlayer src={audio} autoPlay={false} controls />
                  </div>
                )}
              </>
            )}
            {formData["service"] === "Graphics Design" && (
              <>
                <ImageUpload
                  name="logo"
                  title="Click to upload Logo"
                  value={formData["logo"]}
                  onChange={handleFileChange}
                  required={false}
                />
                {preview && (
                  <div className="imgContainer">
                    <img src={preview} alt="Preview" />
                  </div>
                )}
              </>
            )}
            <Input
              name="phone"
              label="Phone"
              type="text"
              value={formData["phone"]}
              onChange={handleChange}
              required={true}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.phone}
            />
            <Textarea
              name="description"
              label="Description"
              type="text"
              value={formData["description"]}
              onChange={handleChange}
              required={true}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.description}
            />
            <Button
              type="submit"
              title="Submit"
              loading={loading === 1}
              className="btnOrange"
            />
          </FormGroup>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
