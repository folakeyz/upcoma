import React, { useContext } from "react";
import Layout from "../../../layout";
import { hooks } from "../../../hooks";
import { Button, Table } from "mtforms";
import { FaClock, FaCreditCard, FaMapMarker } from "react-icons/fa";
import { usePaystackPayment } from "react-paystack";
import { useIsMutating } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context";
const SingleEvents = () => {
  const { id } = useParams();
  const event = hooks.useEvent();
  const single = event?.find((x) => x._id === id);
  const loading = useIsMutating();
  const { user } = useContext(AuthContext);

  const { mutate } = hooks.useAttendEvent();
  const registerHandler = () => {
    const payment = { id: id };
    mutate(payment);
  };

  const price = single?.ticket * 100 || 0;
  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: price,
    publicKey: process.env.REACT_APP_PAYSTACK,
  };
  const onSuccess = (reference) => {
    const payment = { id: id, ...reference };
    mutate(payment);
  };

  const onClose = () => {
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);

  const reg = single?.attendees;
  var registered = false;
  for (var i = 0; i < reg.length; i++) {
    if (reg[i]._id === user?._id) {
      registered = true;
      break;
    }
  }
  const columns = [
    { title: "First Name", field: "firstname" },
    { title: "Last Name", field: "lastname" },
    { title: "Email", field: "email" },
  ];
  return (
    <Layout name="Events">
      <div className="pageContents">
        <div className="col">
          <div className="eventImage">
            <img src={single?.cover} alt="cover" />
          </div>
          <div className="eventText">
            <h1>{single?.name}</h1>
            <p>{single?.description}</p>
            <br /> <hr />
            <br />
            <p>
              <FaMapMarker />
              &nbsp;&nbsp; Location: {single?.location}
            </p>
            <p>
              <FaClock />
              &nbsp;&nbsp;Time: {single?.time}
            </p>
            <p>
              <FaCreditCard />
              &nbsp;&nbsp;Ticket: {single?.ticket}
            </p>
            <div className="btnContainer">
              {registered ? (
                <button className="btn btnOrange">
                  You Have registered for this event
                </button>
              ) : (
                <Button
                  type="button"
                  className="btn action"
                  onClick={
                    single?.type === "Paid"
                      ? () => initializePayment(onSuccess, onClose)
                      : registerHandler
                  }
                  loading={loading === 1}
                  title=" Register for Event"
                  size="small"
                />
              )}
            </div>
            {/* Events */}
            {single?.user === user?._id && (
              <div className="col">
                <div className="modalTitle">Registered Attendees</div>
                <Table data={single?.attendees} columns={columns} />
              </div>
            )}
            {/* end of Events */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleEvents;
