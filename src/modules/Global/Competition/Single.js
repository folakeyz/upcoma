import { useIsMutating } from "@tanstack/react-query";
import React, { useContext } from "react";
import { FaClock, FaCreditCard, FaMapMarker } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context";
import Layout from "../../../Layout";
import { useCompetition, useJoinCompetition } from "./hooks";
// import { usePaystackPayment } from "react-paystack";
import { Button } from "mtforms";
import { Table } from "../../../components";
import { columns } from "./Columns";

const SingleCompetition = () => {
  const { id } = useParams();
  const event = useCompetition();
  const single = event?.find((x) => x._id === id);
  const loading = useIsMutating();
  const { user } = useContext(AuthContext);

  const { mutate } = useJoinCompetition();

  // const price = single?.cost * 100 || 0;
  // const config = {
  //   reference: new Date().getTime().toString(),
  //   email: user?.email,
  //   amount: price,
  //   publicKey: "pk_test_4a87de5ce838bd89a07091c9ec0e69e7d924713a",
  //   // publicKey: "pk_test_9d3b9a1a4002d8cd62fe1fb182753a0229b0abf8",
  // };
  // const onSuccess = (reference) => {
  //   const payment = { id: id, ...reference };
  //   mutate(payment);
  // };

  // const onClose = () => {
  //   console.log("closed");
  // };

  // const initializePayment = usePaystackPayment(config);

  const reg = single?.competitors;
  var registered = false;
  for (var i = 0; i < reg?.length; i++) {
    if (reg[i]._id === user?._id) {
      registered = true;
      break;
    }
  }
  const register = () => {
    mutate("");
  };

  return (
    <Layout name="Competitions">
      <div className="pageContents">
        <div className="col">
          <div className="eventImage">
            <img src={single?.cover} alt="cover" />
          </div>
          <div className="eventText">
            <h1>{single?.name}</h1>
            <p>{single?.description}</p>
            {/* <p>
              Host: {single?.host?.firstname + " " + single?.host?.lastname}
            </p> */}
            <br /> <hr />
            <br />
            <p>
              <FaMapMarker />
              &nbsp;&nbsp;Date: {single?.date}
            </p>
            <p>
              <FaClock />
              &nbsp;&nbsp;Deadline: {single?.deadline}
            </p>
            <p>
              <FaCreditCard />
              &nbsp;&nbsp;Participation Fee: {single?.cost}
            </p>
            <div className="btnContainer">
              {registered ? (
                <button className="btn btnOrange">
                  You Have registered for this competition
                </button>
              ) : (
                <Button
                  type="button"
                  className="btn action"
                  onClick={register}
                  loading={loading === 1}
                  title=" Register for this Competition"
                  size="small"
                />
              )}
            </div>
            {/* Attendees */}
            {single?.user === user?._id && (
              <div className="col">
                <div className="modalTitle">Registered Competitors</div>
                <Table data={single?.competitors} columns={columns} />
              </div>
            )}
            {/* End of attendees */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleCompetition;
