import React from "react";
import styles from "./styles.module.css";
import { userRank } from "../../Star";
import { Avatar } from "../../Avatar";

const ChatCard = ({ user, selected }) => {
  return (
    <div
      className={`${styles.text} ${styles.marginBottom} ${
        selected ? styles.selected : ""
      }`}
    >
      <div className={styles.photo}>
        <div className={styles.img}>
          {user.photo ? (
            <img src={`${user?.photo}`} alt="title" />
          ) : (
            Avatar(user?.gender)
          )}
        </div>
      </div>
      <div className={`${styles.profile} ${styles.column}`}>
        <p>{user?.firstname + " " + user?.lastname}</p>
        {userRank(user?.rank)}
      </div>
    </div>
  );
};

export default ChatCard;
