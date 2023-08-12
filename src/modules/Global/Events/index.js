import React from "react";
import { EventCard } from "../../../components";
import Layout from "../../../layout";
import { hooks } from "../../../hooks";
const Events = () => {
  const event = hooks.useEvent();
  return (
    <Layout name="Events">
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
