import React from "react";
import styles from "./styles.module.css";
import { BsFillFileMusicFill } from "react-icons/bs";

const SongUpload = ({
  onChange,
  title,
  name = "",
  size = "medium",
  required = false,
  loading = false,
  multiple = false,
}) => {
  return (
    <div className={`${styles.uploadContainer} ${styles[size]}`}>
      <div className={styles.uploadWrapper}>
        <button className={`${styles.uploadBtn}`}>
          <BsFillFileMusicFill />
          &nbsp;&nbsp;
          {title}
          {loading && <span className="loading"></span>}
        </button>
        <input
          id={name}
          type="file"
          onChange={onChange}
          accept="audio/mp3,audio/*;capture=microphone"
          name={name}
          required={required}
          disabled={loading}
          multiple={multiple}
        />
      </div>
    </div>
  );
};

export default SongUpload;
