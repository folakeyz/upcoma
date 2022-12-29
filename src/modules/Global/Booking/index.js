import React, { useState } from "react";
import Layout from "../../../Layout";
import { FormGroup, Button, Select, Input, Textarea, DateInput } from "mtforms";
import { useIsMutating } from "@tanstack/react-query";
import { Modal, Options, Table } from "../../../components";
import { useUsers } from "../GlobalProfile/hooks";
import { useCreateBooking, useMyBooking } from "./hooks";
import { columns } from "./Column";

const Booking = () => {
  const loading = useIsMutating();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [talents, setTalents] = useState([]);

  const users = useUsers();
  const data = useMyBooking();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const talentHandler = (name, value) => {
    setFormData({ ...formData, [name]: value });
    const selected = users.filter((x) => x.role === value);
    setTalents(selected);
  };

  const artistHandler = (name, value) => {
    const selected = users.find((x) => x._id === value);
    setFormData({
      ...formData,
      [name]: value,
      rates: selected.perHour,
      currency: selected.currency,
    });
  };

  const durationHandler = (name, value) => {
    const amount = formData["rates"] * value;
    setFormData({
      ...formData,
      [name]: value,
      amount: amount,
    });
  };
  const { mutate, isSuccess, reset } = useCreateBooking();
  const submitHandler = () => {
    mutate(formData);
  };
  if (isSuccess) {
    reset();
    setOpen(false);
    setFormData("");
  }
  console.log(data, "booking");
  return (
    <Layout>
      <div className="pageContents">
        <div className="btnContainer">
          <button
            type="button"
            className="btn action"
            onClick={() => setOpen(!open)}
          >
            Book a Talent
          </button>
        </div>

        {/* Booking TableHistory  */}
        <div className="col">
          <div className="modalTitle">Booking History</div>
          <Table data={data} columns={columns} />
        </div>
        {/* end Booking TableHistory  */}

        {/* modal */}
        <Modal
          isVisible={open}
          onClose={() => setOpen(!open)}
          size="lg"
          content={
            <>
              <div className="modalTitle">Fill The Form To Book a Talent</div>
              <FormGroup
                onSubmit={submitHandler}
                validation={formData}
                errors={errors}
                setErrors={setErrors}
              >
                <Select
                  name="talentType"
                  label="Talent Type"
                  value={formData["talentType"]}
                  onChange={talentHandler}
                  required={true}
                  data={Options.talent}
                  className="whiteBorder"
                  labelClassName="white"
                  validationHandler={validationHandler}
                  error={errors.talentType}
                  filter="name"
                  filterValue="value"
                />
                <Select
                  name="talent"
                  label="Talent Type"
                  value={formData["talent"]}
                  onChange={artistHandler}
                  required={true}
                  data={talents}
                  className="whiteBorder"
                  labelClassName="white"
                  validationHandler={validationHandler}
                  error={errors.talent}
                  filter="stagename"
                  filterValue="_id"
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
                  name="rates"
                  label="Artist Hourly Rates"
                  type="number"
                  value={`${formData["rates"]}`}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.rates}
                  disabled={true}
                />
                <Input
                  name="duration"
                  label="Artist Performance Duration"
                  type="number"
                  value={formData["duration"]}
                  onChange={durationHandler}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.duration}
                />
                <Input
                  name="amount"
                  label="Amount"
                  value={formData["amount"]}
                  onChange={handleChange}
                  required={true}
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.amount}
                  type="number"
                  size="large"
                  disabled={true}
                />
                <Textarea
                  name="location"
                  label="Location of Event"
                  value={formData["location"]}
                  onChange={handleChange}
                  required={true}
                  size="large"
                  className="whiteBorder"
                  validationHandler={validationHandler}
                  error={errors.location}
                />

                <Button
                  type="submit"
                  title="Book Talent"
                  loading={loading === 1}
                  className="btnOrange"
                />
              </FormGroup>
            </>
          }
        />
        {/* end of modal */}
      </div>
    </Layout>
  );
};

export default Booking;
