import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import { djLinks, trendLinks } from "./links";

const DJLink = ({ name }) => {
  return (
    <>
      <div className={styles.links}>
        <ul>
          {djLinks.map((item, i) => (
            <li key={i} className={name === item.name && styles.active}>
              <Link to={item.route}>
                <item.Icon />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.links}>
        <p>Charts</p>
        <ul>
          {trendLinks.map((item, i) => (
            <li key={i} className={name === item.name && styles.active}>
              <Link to={item.route}>
                <item.Icon />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DJLink;
