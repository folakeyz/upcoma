import React from "react";
import LabelLink from "./LabelLink";
import ProducerLink from "./ProducerLink";
import ArtistLink from "./ArtistLink";
import GlobalLink from "./GlobalLink";

export const Navigator = ({ role, home }) => {
  console.log(role, "role");
  switch (role) {
    case "Label":
      return <LabelLink />;
    case "Producer":
      return <ProducerLink />;
    case "Artist":
      return <ArtistLink />;
    default:
      <></>;
  }
  return <GlobalLink home={home} />;
};
