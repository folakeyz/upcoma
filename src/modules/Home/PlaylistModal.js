import { useIsMutating } from "@tanstack/react-query";
import { Button, FormGroup, Select } from "mtforms";
import React from "react";
import { Modal } from "mtforms";

const PlaylistModal = ({
  setErrors,
  submitHandler,
  open,
  errors,
  formData,
  handleChange,
  validationHandler,
  playlist,
  setOpen,
}) => {
  const loading = useIsMutating();
  return (
    <Modal
      isVisible={open}
      onClose={() => setOpen(!open)}
      content={
        <>
          <div className="modalTitle">Add song to playlist</div>
          <FormGroup
            onSubmit={submitHandler}
            validation={formData}
            errors={errors}
            setErrors={setErrors}
          >
            <Select
              name="playlist"
              label="Playlist"
              value={formData["playlist"]}
              onChange={handleChange}
              required={true}
              data={playlist}
              className="whiteBorder"
              labelClassName="white"
              validationHandler={validationHandler}
              error={errors.playlist}
              filter="name"
              filterValue="_id"
              size="large"
            />

            <Button
              type="submit"
              title="Add to Playlist"
              loading={loading === 1}
              className="btnOrange"
            />
          </FormGroup>
        </>
      }
    />
  );
};

export default PlaylistModal;
