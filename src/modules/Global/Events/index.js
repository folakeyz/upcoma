import React from "react";
import { EventCard } from "../../../components";
import Layout from "../../../Layout";
import { useEvent } from "./hooks";

const Events = () => {
  const event = useEvent();
  return (
    <Layout>
      <div className="pageContents">
        <div className="cardFlex">
          {event?.map((item, i) => (
            <EventCard key={i} event={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Events;
