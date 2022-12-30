import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { EventCard } from "../../../../../components";
import { AuthContext } from "../../../../../context";
import Layout from "../../../../../Layout";
import { useEvent } from "../../../../Global/Events/hooks";

const MyEvents = () => {
  const evt = useEvent();
  const { user } = useContext(AuthContext);

  const myEvt = evt.filter((x) => x?.user === user?._id);

  return (
    <Layout>
      <div className="pageContents">
        <div className="btnContainer right">
          <Link to="/app/musician/events/manage" className="btn btnWhite">
            Manage Events
          </Link>
        </div>
        <div className="cardFlex">
          {myEvt?.map((item, i) => (
            <EventCard key={i} event={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MyEvents;
