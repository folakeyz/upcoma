import { Button, DateInput, FormGroup, Input, Select, Textarea } from "mtforms";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../../../Layout";
import { useUploadEvent } from "./hooks";
import { useIsMutating } from "@tanstack/react-query";
import { ImageUpload } from "../../../components";
import { Options } from "../../../../../components";

const UploadEvent = () => {
  const navigate = useNavigate();
  const loading = useIsMutating();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");

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
    setPreview(objectUrl);
  };

  const { mutate, isSuccess, reset } = useUploadEvent();
  const submitHandler = () => {
    mutate(formData);
  };

  if (isSuccess) {
    reset();
    navigate("/app/musician/admin/events");
  }
  return (
    <Layout name="Upload Events">
      <div className="pageContents">
        <div className="col uploadForm">
          <div className="modalTitle">Fill The Form To Create an Event</div>
          <FormGroup
            onSubmit={submitHandler}
            validation={formData}
            errors={errors}
            setErrors={setErrors}
          >
            <Input
              name="name"
              label="Event Title"
              type="text"
              value={formData["name"]}
              onChange={handleChange}
              required={true}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.name}
            />
            <DateInput
              name="date"
              label="Date of Event"
              type="date"
              value={formData["date"]}
              onChange={handleChange}
              required={true}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.date}
            />
            <Input
              name="time"
              label="Time of Event"
              type="time"
              value={formData["time"]}
              onChange={handleChange}
              required={true}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.time}
            />
            <Input
              name="location"
              label="Location"
              type="text"
              value={formData["location"]}
              onChange={handleChange}
              required={true}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.location}
            />
            <Textarea
              name="description"
              label="Description"
              value={formData["description"]}
              onChange={handleChange}
              required={true}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.description}
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
              label="Event Type"
              labelClassName="whiteLabel"
            />
            {formData["type"] === "Paid" && (
              <Input
                name="ticket"
                label="Ticket Price"
                type="number"
                value={formData["ticket"]}
                onChange={handleChange}
                required={formData["type"] === "Paid" ? true : false}
                className="whiteBorder"
                validationHandler={validationHandler}
                error={errors.ticket}
              />
            )}
            <ImageUpload
              name="cover"
              title="Click to upload Event Cover"
              value={formData["cover"]}
              onChange={handleFileChange}
              required={true}
            />
            {preview && (
              <div className="imgContainer">
                <img src={preview} alt="Preview" />
              </div>
            )}
            <Button
              type="submit"
              title="Create Event"
              loading={loading === 1}
              className="btnOrange"
            />
          </FormGroup>
        </div>
      </div>
    </Layout>
  );
};

export default UploadEvent;
