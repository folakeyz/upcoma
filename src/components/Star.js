import React from "react";
import gold from "../assets/images/gold-star.png";
import white from "../assets/images/white-star.png";
import blue from "../assets/images/blue-star.png";
import red from "../assets/images/red-star.png";
import brown from "../assets/images/brown-star.png";

export const userRank = (rank) => {
  switch (rank) {
    case "Bronze":
      return (
        <img
          src={red}
          alt="Ranking"
          width="20"
          style={{ marginLeft: "5px", marginRight: "5px" }}
        />
      );
    case "Silver":
      return (
        <img
          src={white}
          alt="Ranking"
          width="20"
          style={{ marginLeft: "5px", marginRight: "5px" }}
        />
      );
    case "Gold":
      return (
        <img
          src={gold}
          alt="Ranking"
          width="20"
          style={{ marginLeft: "5px", marginRight: "5px" }}
        />
      );
    case "Platinum":
      return (
        <img
          src={brown}
          alt="Ranking"
          width="20"
          style={{ marginLeft: "5px", marginRight: "5px" }}
        />
      );
    case "Diamond":
      return (
        <img
          src={blue}
          alt="Ranking"
          width="20"
          style={{ marginLeft: "5px", marginRight: "5px" }}
        />
      );
    default:
      <></>;
  }
  return <img src={red} alt="Ranking" width="20" />;
};
