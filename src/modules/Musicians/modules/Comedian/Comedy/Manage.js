import React, { useContext } from "react";
import { Table } from "../../../../../components";
import { AuthContext } from "../../../../../context";
import Layout from "../../../../../Layout";
import { useComedy } from "../../../../Global/Comedy/hooks";
import { columns } from "./Column";
import { useDeleteComedy } from "./hooks";

const ManageComedy = () => {
  const song = useComedy();
  const { user } = useContext(AuthContext);

  const mySongs = song.filter((x) => x?.user?._id === user?._id);
  const { mutate } = useDeleteComedy();
  return (
    <Layout>
      <div className="pageContents">
        <div className="col uploadForm">
          <Table data={mySongs} columns={columns} remove={mutate} />
        </div>
      </div>
    </Layout>
  );
};
export default ManageComedy;
