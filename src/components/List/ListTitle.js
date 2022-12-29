import React from "react";
import styles from "./styles.module.css";

const ListTitle = () => {
  return (
    <div className={styles.list}>
      <div className={styles.sn}>SN</div>
      <div className={styles.cover}>Cover</div>
      <div className={styles.title}>Name</div>
      <div className={styles.duration}>Duration</div>
      <div className={styles.stream}>Streams</div>
      <div className={styles.date}>Rating</div>
      <div className={styles.date}>Created</div>
    </div>
  );
};

export default ListTitle;
