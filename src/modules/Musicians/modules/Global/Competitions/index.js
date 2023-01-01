import React from "react";
import { Table } from "../../../../../components";
import Layout from "../../../../../Layout";
import { columns } from "./Column";
import { useJoinedComp } from "./hooks";

const RegisteredCompetitions = () => {
  const data = useJoinedComp();
  return (
    <Layout name="Registered Competition">
      <div className="pageContents">
        <Table data={data} columns={columns} url="/app/musician/competition" />
      </div>
    </Layout>
  );
};

export default RegisteredCompetitions;
