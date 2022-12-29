import { useIsMutating } from "@tanstack/react-query";
import { Button, FormGroup, Input } from "mtforms";
import React, { useState } from "react";
import { Modal, PlaylistCard } from "../../../components";
import Layout from "../../../Layout";
import { useCreatePlaylist, usePlaylist } from "./hooks";

const Playlist = () => {
  const [open, setOpen] = useState(false);
  const loading = useIsMutating();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const playlist = usePlaylist();

  const { mutate, isSuccess, reset } = useCreatePlaylist();
  const submitHandler = () => {
    mutate(formData);
  };
  if (isSuccess) {
    reset();
    setOpen(false);
    setFormData("");
  }
  return (
    <Layout>
      <div className="pageContents">
        <h3>Create Playlist</h3>
        <div className="btnContainer">
          <button
            type="button"
            className="btn action"
            onClick={() => setOpen(!open)}
          >
            Create Playlist
          </button>
        </div>

        <div className="cardFlex">
          {playlist?.map((item, i) => (
            <PlaylistCard key={i} songs={item} />
          ))}
        </div>

        <Modal
          isVisible={open}
          onClose={() => setOpen(!open)}
          content={
            <>
              <div className="modalTitle">
                Fill The Form To Create a Playlist
              </div>

              <FormGroup
                onSubmit={submitHandler}
                validation={formData}
                errors={errors}
                setErrors={setErrors}
              >
                <Input
                  name="name"
                  label="Playlist name"
                  type="text"
                  value={formData["name"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.name}
                  size="large"
                />

                <Button
                  type="submit"
                  title="Create Playlist"
                  loading={loading === 1}
                  className="btnOrange"
                />
              </FormGroup>
            </>
          }
        />
      </div>
    </Layout>
  );
};

export default Playlist;
