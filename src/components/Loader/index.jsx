import React from "react";
import { LineWave } from "react-loader-spinner";
import styles from "./styles.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <LineWave
        height="100"
        width="100"
        color="#fff"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
      <p>Please Wait....</p>
    </div>
  );
};

export default Loader;
