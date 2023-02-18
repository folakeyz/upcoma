import React from "react";
import styles from "../SongUpload/styles.module.css";
import { BsFillImageFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const ImageUpload = ({
  onChange,
  title,
  name = "",
  size = "medium",
  required = false,
  loading = false,
}) => {
  return (
    <div className={`${styles.uploadContainer} ${styles[size]}`}>
      <div className={styles.uploadWrapper}>
        <button className={`${styles.uploadBtn}`}>
          <BsFillImageFill />
          &nbsp;&nbsp;{title}
          {loading && <span className="loading"></span>}
        </button>
        <input
          id={name}
          type="file"
          onChange={onChange}
          accept="image/png, image/gif, image/jpeg"
          name={name}
          required={required}
          disabled={loading}
        />
      </div>
      <span>
        Don't Have a Cover?{" "}
        <Link to="/app/services">Request for a Cover Here</Link>
      </span>
    </div>
  );
};

export default ImageUpload;
