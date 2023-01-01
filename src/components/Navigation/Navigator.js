import React from "react";
import LabelLink from "./LabelLink";
import ProducerLink from "./ProducerLink";
import ArtistLink from "./ArtistLink";
import GlobalLink from "./GlobalLink";
import DJLink from "./DJLink";
import ComedianLink from "./ComedianLink";
import UserLink from "./UserLink";

export const Navigator = ({ role, name }) => {
  switch (role) {
    case "Label":
      return <LabelLink name={name} />;
    case "Producer":
      return <ProducerLink name={name} />;
    case "Artist":
      return <ArtistLink name={name} />;
    case "DJ":
      return <DJLink name={name} />;
    case "Comedian":
      return <ComedianLink name={name} />;
    case "Listener":
      return <UserLink name={name} />;
    default:
      <></>;
  }
  return <GlobalLink name={name} />;
};
