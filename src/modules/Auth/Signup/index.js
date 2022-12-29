import React, { useState, useEffect } from "react";
import { Input, Button, FormGroup, Select } from "mtforms";
import logo from "../../../assets/images/logo.png";
import styles from "../styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Options } from "../../../components";
import { toast, ToastContainer } from "react-toastify";
import { useIsMutating } from "@tanstack/react-query";

const Signup = () => {
  const loading = useIsMutating();
  const navigate = useNavigate();
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

  const loginHandler = () => {
    if (formData["password"] !== formData["confirmPassword"]) {
      return toast.error("Password does not match");
    }
    // dispatch(userReg(formData));
  };

  return (
    <div>
      <div className={styles.login}>
        <div className={`${styles.loginContainer} ${styles.medium}`}>
          <div className={styles.logo}>
            <img src={logo} alt="Upcoma" />
          </div>
          <div className="center">
            <h4>
              <b>Create an Account</b>
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
              name="firstname"
              label="First Name"
              type="text"
              value={formData["firstname"]}
              onChange={handleChange}
              required={true}
              validationHandler={validationHandler}
              error={errors.firstname}
            />
            <Input
              name="lastname"
              label="Last Name"
              type="text"
              value={formData["lastname"]}
              onChange={handleChange}
              required={true}
              validationHandler={validationHandler}
              error={errors.lastname}
            />
            <Select
              name="role"
              label="What do you do?"
              value={formData["role"]}
              onChange={handleChange}
              size="large"
              data={Options.role}
              filter="name"
              filterValue="value"
              required={true}
              validationHandler={validationHandler}
              error={errors.role}
              labelClassName="white"
            />
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
            />
            <Input
              name="password"
              label="Password"
              type="password"
              value={formData["password"]}
              onChange={handleChange}
              required={true}
              validationHandler={validationHandler}
              error={errors.password}
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
            />
            <Button
              type="submit"
              title="Create Account"
              size="large"
              loading={loading === 1}
              disabled={loading === 1}
              className="btnOrange"
            />

            <div className={`${styles.right}`}>
              <Link to="/login">Already have an Account?&nbsp;Login</Link>
            </div>
          </FormGroup>
          <div className="center">
            <p>
              By signing up, you agree to our{" "}
              <Link to="/#privacy">Terms of Service and Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
