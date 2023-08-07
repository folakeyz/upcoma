import React from "react";
import styles from "./styles.module.css";
const Text = ({ label, text, size = "small" }) => {
  return (
    <div className={`${styles.text} ${styles[size]}`}>
      <h5>{label}</h5>
      <p>{text}</p>
    </div>
  );
};

export default Text;
