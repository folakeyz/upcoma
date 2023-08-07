import React from "react";
import gold from "../assets/images/gold-star.png";
import white from "../assets/images/white-star.png";
import blue from "../assets/images/blue-star.png";
import red from "../assets/images/red-star.png";
import brown from "../assets/images/brown-star.png";

const rankImages = {
  Bronze: red,
  Silver: white,
  Gold: gold,
  Platinum: brown,
  Diamond: blue,
};

const userRank = (rank) => {
  const imgSrc = rankImages[rank] || red;
  return (
    <img
      src={imgSrc}
      alt="Ranking"
      width="20"
      style={{ marginLeft: "5px", marginRight: "5px" }}
    />
  );
};

export default userRank;
