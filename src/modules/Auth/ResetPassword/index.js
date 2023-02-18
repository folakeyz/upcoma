import React, { useState } from "react";
import { Input, Button, FormGroup } from "mtforms";
import logo from "../../../assets/images/logo.png";
import styles from "../styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useIsMutating } from "@tanstack/react-query";
import { useReset } from "./hooks";
import { toast, ToastContainer } from "react-toastify";
import { errorMessage, toastOptions } from "../../../utils";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
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
  const { mutate, isError, isSuccess, error, reset } = useReset();
  const loginHandler = () => {
    if (formData["password"] !== formData["confirmPassword"]) {
      return toast.error("Password does not match", toastOptions);
    }
    const data = {
      token: token,
      password: formData["password"],
    };
    mutate(data);
  };
  if (isSuccess) {
    reset();
    toast.success(
      "Success, Password Reset Successful, you are now been redirected to the login screen",
      toastOptions
    );
    setTimeout(() => {
      navigate("/login");
    }, [3000]);
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
              <b>Enter your New Password</b>
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
              name="password"
              label="New Password"
              type="password"
              value={formData["password"]}
              onChange={handleChange}
              required={true}
              validationHandler={validationHandler}
              error={errors.password}
              size="large"
            />
            <Input
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formData["confirmPassword"]}
              onChange={handleChange}
              required={true}
              validationHandler={validationHandler}
              error={errors.confirmPassword}
              size="large"
            />

            <Button
              type="submit"
              title="Reset Password"
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

export default ResetPassword;
