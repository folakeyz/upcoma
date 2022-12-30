import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import { artistLinks, trendLinks } from "./links";

const ArtistLink = () => {
  return (
    <>
      <div className={styles.links}>
        <ul>
          {artistLinks.map((item, i) => (
            <li key={i}>
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
            <li key={i}>
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

export default ArtistLink;
