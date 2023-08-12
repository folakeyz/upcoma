import React from "react";
import { Table } from "../../../../../components";
import Layout from "../../../../../Layout";
import { columns } from "./Column";
import { useRegEvent } from "./hooks";

const RegisteredEvents = () => {
  const data = useRegEvent();

  return (
    <Layout name="Registered Events">
      <div className="pageContents">
        <div className="col uploadForm">
          <Table data={data} columns={columns} />
        </div>
      </div>
    </Layout>
  );
};

export default RegisteredEvents;
