import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import styles from "./styles.module.css";

const List = ({ sn, item }) => {
  return (
    <Link to={`/app/song/${item._id}`} className={styles.list}>
      <div className={styles.sn}>{sn}</div>
      <div className={styles.cover}>
        <img src={item?.cover} alt="Cover" />
      </div>
      <div className={styles.title}>{item.name}</div>
      <div className={styles.duration}>{item.duration}</div>
      <div className={styles.stream}>{item.stream}</div>
      <div className={styles.date}>
        <Rating initialValue={item.rating} readonly={true} size={15} />
      </div>
      <div className={styles.date}>{item.createdAt.slice(0, 10)}</div>
    </Link>
  );
};

export default List;
