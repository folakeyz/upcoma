import { useIsMutating } from "@tanstack/react-query";
import { Button, FormGroup, Input, Select, Textarea } from "mtforms";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { FaEdit } from "react-icons/fa";
// import { Link } from "react-router-dom";
import { Modal, Options } from "../../../components";
import { Avatar } from "../../../components/Avatar";
import { AuthContext } from "../../../context";
import Layout from "../../../Layout";
import { errorMessage, toastOptions } from "../../../utils";
import { ImageUpload } from "../../Musicians/components";
import { useUpdateProfile, useUploadPhoto } from "./hooks";
import styles from "./styles.module.css";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const loading = useIsMutating();
  const [formData, setFormData] = useState({});
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };
  const { mutate, isError, isSuccess, error, reset } = useUpdateProfile();
  const submitHandler = () => {
    mutate(formData);
  };
  const handleFileChange = (e) => {
    const { name } = e.target;
    let file = e.target.files[0];
    setFormData({ ...formData, [name]: file });
    setPreview(URL.createObjectURL(file));
  };

  const {
    mutate: uploadPhoto,
    isSuccess: success,
    error: Error,
    isError: uploadError,
    reset: Reset,
  } = useUploadPhoto();
  const uploadHandler = () => {
    const data = { photo: formData["photo"] };
    uploadPhoto(data);
  };

  if (success) {
    setOpen(false);
    Reset();
    toast.success("Photo Uploaded", toastOptions);
  }
  if (uploadError) {
    Reset();
    toast.error(errorMessage(Error), toastOptions);
  }

  if (isSuccess) {
    reset();
    toast.success("Profile Updated", toastOptions);
  }
  if (isError) {
    reset();
    toast.error(errorMessage(error), toastOptions);
  }

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender,
        mobile: user.mobile,
        stagename: user.stagename,
        perHour: user.perHour,
        bio: user.bio,
      });
    }
  }, [user]);
  return (
    <Layout>
      <div className="pageContents">
        <div className={styles.profile}>
          <div className={styles.dp}>
            <img
              src={user.photo ? user?.photo : Avatar(user?.gender)}
              alt={user?.firstname}
            />
            <Button
              type="button"
              onClick={() => setOpen(!open)}
              title="Update DP"
              bgColor="btnWhite"
            />
          </div>
          <div className={styles.user}>
            <FormGroup
              onSubmit={submitHandler}
              //validation={formData}
              errors={errors}
              setErrors={setErrors}
            >
              <Input
                name="firstname"
                label="First Name"
                type="text"
                value={formData["firstname"]}
                onChange={handleChange}
                required={true}
                className={styles.white}
                validationHandler={validationHandler}
                error={errors.name}
              />
              <Input
                name="lastname"
                label="Last Name"
                type="text"
                value={formData["lastname"]}
                onChange={handleChange}
                required={true}
                className={styles.white}
                validationHandler={validationHandler}
                error={errors.artist}
              />

              <Select
                name="gender"
                value={formData["gender"]}
                onChange={handleChange}
                required={true}
                data={Options.gender}
                filter="name"
                filterValue="value"
                className={styles.white}
                validationHandler={validationHandler}
                error={errors.gender}
                label="Gender"
                labelClassName="whiteLabel"
              />
              <Input
                name="mobile"
                label="Mobile"
                type="tel"
                value={formData["mobile"]}
                onChange={handleChange}
                required={true}
                className={styles.white}
                validationHandler={validationHandler}
                error={errors.mobile}
              />
              {user?.role !== "Listener" && (
                <>
                  <Input
                    name="stagename"
                    label="Stage Name"
                    type="tel"
                    value={formData["stagename"]}
                    onChange={handleChange}
                    required={user?.role !== "Listener" ? true : false}
                    className={styles.white}
                    validationHandler={validationHandler}
                    error={errors.stagename}
                  />
                  <Input
                    name="perHour"
                    label="Hourly Rates"
                    type="number"
                    value={formData["perHour"]}
                    onChange={handleChange}
                    required={user?.role !== "Listener" ? true : false}
                    className={styles.white}
                    validationHandler={validationHandler}
                    error={errors.perHour}
                  />
                  <Textarea
                    name="bio"
                    label="Bio"
                    value={formData["bio"]}
                    onChange={handleChange}
                    required={true}
                    className="whiteBorder"
                    validationHandler={validationHandler}
                    error={errors.bio}
                    size="large"
                  />
                </>
              )}
              <Button
                type="submit"
                title="Edit Profile"
                loading={loading === 1}
                className="btnOrange"
              />
            </FormGroup>
            <Modal
              isVisible={open}
              content={
                <dic className="inputFlex">
                  {preview && (
                    <div className="imgContainer">
                      <img src={preview} alt="Preview" />
                    </div>
                  )}
                  <ImageUpload
                    name="photo"
                    title="Click to upload a picture"
                    value={formData["cover"]}
                    onChange={handleFileChange}
                    required={true}
                    size="large"
                  />
                  <Button
                    type="button"
                    title="Upload Picture"
                    loading={loading === 1}
                    className="btnOrange"
                    size="large"
                    onClick={uploadHandler}
                  />
                </dic>
              }
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
