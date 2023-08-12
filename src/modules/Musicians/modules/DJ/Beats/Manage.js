import React, { useContext } from "react";
import { Table } from "../../../../../components";
import { AuthContext } from "../../../../../context";
import Layout from "../../../../../Layout";
import { useBeat } from "../../../../Global/Beats/hooks";
import { columns } from "./Column";
import { useDeleteBeat } from "./hooks";

const ManageBeats = () => {
  const song = useBeat();
  const { user } = useContext(AuthContext);

  const mySongs = song.filter((x) => x?.user?._id === user?._id);
  const { mutate } = useDeleteBeat();
  return (
    <Layout name="My Beats">
      <div className="pageContents">
        <div className="col uploadForm">
          <Table data={mySongs} columns={columns} remove={mutate} />
        </div>
      </div>
    </Layout>
  );
};

export default ManageBeats;
