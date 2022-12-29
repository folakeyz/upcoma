import React from "react";
import male from "../assets/images/male.png";
import female from "../assets/images/female.png";

export const Avatar = (sex) => {
  switch (sex) {
    case "Male":
      return <img src={male} alt="DP" />;
    case "Female":
      return <img src={female} alt="DP" />;

    default:
      <></>;
  }
  return <img src={male} alt="DP" />;
};
