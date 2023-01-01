import React, { useContext } from "react";
import { Table } from "../../../../../components";
import { AuthContext } from "../../../../../context";
import Layout from "../../../../../Layout";
import { useEvent } from "../../../../Global/Events/hooks";
import { columns } from "./Column";
import { useDeleteEvent } from "./hooks";

const ManageEvent = () => {
  const song = useEvent();
  const { user } = useContext(AuthContext);

  const mySongs = song.filter((x) => x?.user === user?._id);
  const { mutate } = useDeleteEvent();
  return (
    <Layout name="My Events">
      <div className="pageContents">
        <div className="col uploadForm">
          <Table data={mySongs} columns={columns} remove={mutate} />
        </div>
      </div>
    </Layout>
  );
};
export default ManageEvent;
