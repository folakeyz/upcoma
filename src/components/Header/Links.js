import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Links = () => {
  return (
    <div className={styles.profile}>
      {/* <div className="padding10">
        <Link to="/app/admin/events/view" className="btn btnOrange btnRadius">
          Events
        </Link>
      </div> */}
      <Link to="/signup" className="btn btnOrange marginRight btnRadius">
        Sign Up
      </Link>
      <Link to="/login" className="btn btnWhite btnRadius">
        Login
      </Link>
    </div>
  );
};

export default Links;
