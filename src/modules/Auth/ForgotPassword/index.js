import React, { useState } from "react";
import { Input, Button, FormGroup } from "mtforms";
import logo from "../../../assets/images/logo.png";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import { useIsMutating } from "@tanstack/react-query";
import { useForgotPwd } from "./hooks";
import { ToastContainer } from "react-toastify";

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
  const { mutate } = useForgotPwd();
  const loginHandler = () => {
    mutate(formData);
  };
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
            <div className={`${styles.right}`}>
              <Link to="/signup">Don't have an Account?&nbsp;Create One</Link>
            </div>
          </FormGroup>
          <div className="center">
            <p>
              By signing in, you agree to our{" "}
              <Link to="/#privacy">Terms of Service and Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
