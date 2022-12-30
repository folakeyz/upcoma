import { Button, DateInput, FormGroup, Input, Textarea } from "mtforms";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../../../Layout";
import { useUploadComp } from "./hooks";
import { useIsMutating } from "@tanstack/react-query";
import { ImageUpload } from "../../../components";

const UploadCompetition = () => {
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

  const { mutate, isSuccess, reset } = useUploadComp();
  const submitHandler = () => {
    mutate(formData);
  };

  if (isSuccess) {
    reset();
    navigate("/app/musician/admin/competition");
  }
  return (
    <Layout>
      <div className="pageContents">
        <div className="col uploadForm">
          <div className="modalTitle">
            Fill The Form To Create a Competition
          </div>
          <FormGroup
            onSubmit={submitHandler}
            validation={formData}
            errors={errors}
            setErrors={setErrors}
          >
            <Input
              name="name"
              label="Competiton Title"
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
              label="Date of Competition"
              type="date"
              value={formData["date"]}
              onChange={handleChange}
              required={true}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.date}
            />
            <DateInput
              name="deadline"
              label="Competition Deadline"
              type="date"
              value={formData["deadline"]}
              onChange={handleChange}
              required={true}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.deadline}
            />
            <Input
              name="cost"
              label="Entry Fee"
              type="number"
              value={formData["cost"]}
              onChange={handleChange}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.cost}
            />

            <Textarea
              name="description"
              label="Commpetiton Description"
              value={formData["description"]}
              onChange={handleChange}
              required={true}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.description}
            />
            <Textarea
              name="prize"
              label="Prizes"
              value={formData["prize"]}
              onChange={handleChange}
              required={true}
              className="whiteBorder"
              validationHandler={validationHandler}
              error={errors.prize}
            />

            <ImageUpload
              name="cover"
              title="Click to upload Competiton Cover"
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
              title="Create Competition"
              loading={loading === 1}
              className="btnOrange"
            />
          </FormGroup>
        </div>
      </div>
    </Layout>
  );
};

export default UploadCompetition;
