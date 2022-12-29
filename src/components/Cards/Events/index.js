import React from "react";
import styles from "./styles.module.css";
import { FaClock, FaMapMarker } from "react-icons/fa";
import img from "../../../assets/images/concert.jpg";
import { Link } from "react-router-dom";

const EventCard = ({ event, url = undefined }) => {
  return (
    <Link
      className={styles.card}
      style={{
        background: `linear-gradient(90deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${
          event.cover ? event?.cover : img
        })`,
      }}
      to={
        url ? `/app/admin/event/view/${event._id}` : `/app/event/${event._id}`
      }
    >
      <div className="btnContainer">
        <span
          className={`btnSM ${
            event?.type === "free" ? "btnOrange" : "btnGreen"
          }`}
        >
          {event?.type}
        </span>
      </div>

      <h3>
        <b>{event?.date.slice(0, 10)}</b>
      </h3>
      <h1>{event?.name}</h1>
      <p>
        <FaMapMarker />
        &nbsp;&nbsp;
        {event?.location}
      </p>
      <p>
        <FaClock />
        &nbsp;&nbsp;{event?.time}
      </p>
      <p>
        <i>{event?.description.slice(0, 100)}</i>
      </p>
    </Link>
  );
};

export default EventCard;
