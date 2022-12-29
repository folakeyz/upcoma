import { useIsMutating } from "@tanstack/react-query";
import React, { useContext } from "react";
import { FaClock, FaCreditCard, FaMapMarker } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context";
import Layout from "../../../Layout";
import { useAttendEvent, useEvent } from "./hooks";
import { usePaystackPayment } from "react-paystack";
import { Button } from "mtforms";

const SingleEvent = () => {
  const { id } = useParams();
  const event = useEvent();
  const single = event?.find((x) => x._id === id);
  const loading = useIsMutating();
  const { user } = useContext(AuthContext);

  const { mutate } = useAttendEvent();
  const registerHandler = () => {
    const payment = { id: id };
    mutate(payment);
  };

  const price = single?.ticket * 100 || 0;
  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: price,
    //    publicKey: "pk_test_4a87de5ce838bd89a07091c9ec0e69e7d924713a",
    publicKey: "pk_test_9d3b9a1a4002d8cd62fe1fb182753a0229b0abf8",
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
  return (
    <Layout>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleEvent;
