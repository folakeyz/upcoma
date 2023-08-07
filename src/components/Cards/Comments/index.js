import React from "react";
import Avatar from "../../Avatar";
import styles from "./styles.module.css";
import { Rating } from "react-simple-star-rating";
const CommentsCard = ({ item }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.profile}>
        <div className={styles.photo}>
          {item?.user?.photo ? (
            <img src={item?.user?.photo} alt={item?.user?.firstname} />
          ) : (
            Avatar(item?.user?.gender)
          )}
        </div>
        <div className={styles.text}>
          <b>{item?.user?.firstname + " " + item?.user?.lastname}</b>

          <div className={styles.userComment}>
            <Rating initialValue={item.rating} readonly={true} size={15} />
            <i>{item?.comment}</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsCard;
