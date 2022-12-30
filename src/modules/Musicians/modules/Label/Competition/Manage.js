import React, { useContext } from "react";
import { Table } from "../../../../../components";
import { AuthContext } from "../../../../../context";
import Layout from "../../../../../Layout";
import { useEvent } from "../../../../Global/Events/hooks";
import { columns } from "./Column";
import { useDeleteComp } from "./hooks";

const ManageCompetition = () => {
  const song = useEvent();
  const { user } = useContext(AuthContext);

  const mySongs = song.filter((x) => x?.user === user?._id);
  const { mutate } = useDeleteComp();
  return (
    <Layout>
      <div className="pageContents">
        <div className="col uploadForm">
          <Table data={mySongs} columns={columns} remove={mutate} />
        </div>
        i
      </div>
    </Layout>
  );
};
export default ManageCompetition;
