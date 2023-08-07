import React, { useState } from "react";
import { Input, Button, FormGroup } from "mtforms";
import logo from "../../../assets/images/logo.png";
import styles from "../styles.module.css";
import { useIsMutating } from "@tanstack/react-query";
import { useForgotPwd } from "./hooks";
import { toast, ToastContainer } from "react-toastify";
import { errorMessage, toastOptions } from "../../../utils";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const loading = useIsMutating();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };
  const { mutate, isError, isSuccess, error, reset } = useForgotPwd();
  const loginHandler = () => {
    mutate(formData);
  };
  if (isSuccess) {
    reset();
    toast.success(
      "Success, check your email for more information",
      toastOptions
    );
  }
  if (isError) {
    reset();
    toast.error(errorMessage(error), toastOptions);
  }
  return (
    <div>
      <div className={styles.login}>
        <div className={styles.loginContainer}>
          <div className={styles.logo}>
            <img src={logo} alt="Upcoma" />
          </div>
          <div className="center">
            <h4>
              <b>Enter your Email address to reset your password</b>
            </h4>
          </div>
          <ToastContainer />
          <FormGroup
            onSubmit={loginHandler}
            validation={formData}
            errors={errors}
            setErrors={setErrors}
          >
            <Input
              name="email"
              label="Email Address"
              type="email"
              value={formData["email"]}
              onChange={handleChange}
              size="large"
              required={true}
              reqType="email"
              validationHandler={validationHandler}
              error={errors.email}
              className="input"
            />

            <Button
              type="submit"
              title="Forgot Password"
              size="large"
              loading={loading === 1}
              disabled={loading === 1}
              className="btnOrange"
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
