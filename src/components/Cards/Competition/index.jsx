import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import cover from "../../../assets/images/cover.jpeg";
const CompetitionCard = ({ info }) => {
  function isInThePast(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) < today;
  }
  const status = isInThePast(info?.deadline);
  return (
    <Link to={`/app/competition/${info._id}`} className={styles.card}>
      <div className={styles.img}>
        <img src={info.cover ? `${info.cover}` : cover} alt="title" />
      </div>
      <div className={styles.text}>
        <div className="btnContainer">
          <div
            className={`${styles.status} ${
              status ? styles.closed : styles.open
            }`}
          >
            {status ? "Closed" : "Available"}
          </div>
        </div>
        <h4>{info?.name}</h4>
        <p>Entry Fee: ${info?.cost}</p>
        <p>Deadline: {info?.deadline}</p>
        <p>Closing Date: {info?.date}</p>
      </div>
    </Link>
  );
};

export default CompetitionCard;
