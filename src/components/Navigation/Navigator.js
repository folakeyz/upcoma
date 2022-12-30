import React from "react";
import LabelLink from "./LabelLink";
import ProducerLink from "./ProducerLink";
import ArtistLink from "./ArtistLink";
import GlobalLink from "./GlobalLink";
import DJLink from "./DJLink";
import ComedianLink from "./ComedianLink";

export const Navigator = ({ role, home }) => {
  console.log(role, "role");
  switch (role) {
    case "Label":
      return <LabelLink />;
    case "Producer":
      return <ProducerLink />;
    case "Artist":
      return <ArtistLink />;
    case "DJ":
      return <DJLink />;
    case "Comedian":
      return <ComedianLink />;
    default:
      <></>;
  }
  return <GlobalLink home={home} />;
};
