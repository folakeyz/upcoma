import React from "react";
import { Table } from "../../../../../components";
import Layout from "../../../../../Layout";
import { useMyBooking } from "./hooks";
import { columns } from "./Column";

const MyBookings = () => {
  const booking = useMyBooking();

  return (
    <Layout name="My Bookings">
      <div className="pageContents">
        <div className="col uploadForm">
          <Table data={booking} columns={columns} />
        </div>
      </div>
    </Layout>
  );
};

export default MyBookings;
