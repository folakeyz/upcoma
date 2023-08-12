import React, { useContext } from "react";
import { Table } from "../../../../../components";
import { AuthContext } from "../../../../../context";
import Layout from "../../../../../Layout";
import { useMix } from "../../../../Global/DJBooth/hooks";
import { columns } from "./Column";
import { useDeleteMix } from "./hooks";

const ManageMix = () => {
  const song = useMix();
  const { user } = useContext(AuthContext);

  const mySongs = song.filter((x) => x?.user?._id === user?._id);
  const { mutate } = useDeleteMix();
  return (
    <Layout name="My Mixtapes">
      <div className="pageContents">
        <div className="col uploadForm">
          <Table data={mySongs} columns={columns} remove={mutate} />
        </div>
      </div>
    </Layout>
  );
};

export default ManageMix;
