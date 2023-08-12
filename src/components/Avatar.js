import React from "react";
import male from "../assets/images/male.png";
import female from "../assets/images/female.png";

const sexImages = {
  Male: male,
  Female: female,
};

const Avatar = ({ sex = "Male" }) => {
  const imgSrc = sexImages[sex] || male;
  return <img src={imgSrc} alt="DP" />;
};

export default Avatar;
