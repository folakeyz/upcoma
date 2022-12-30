import React from "react";
import { Table } from "../../../components";
import Layout from "../../../Layout";
import { useTalents } from "./hooks";

const TopTalents = () => {
  const columns = [
    {
      title: "Rank",
      field: "tableData.id",
      render: (rowData) => {
        return <p>{rowData.tableData.id + 1}</p>;
      },
    },
    {
      title: "",
      field: "song.cover",
      render: (item) => (
        <img
          src={item.photo}
          alt=""
          height="50"
          width="50"
          style={{ borderRadius: "50%" }}
        />
      ),
    },

    { title: "First Name", field: "firstname" },
    { title: "Last Name", field: "lastname" },
    { title: "Stage Name", field: "stagename" },
    { title: "Followers", field: "followersCount" },
    { title: "Likes", field: "likesCount" },
  ];
  const data = useTalents();
  return (
    <Layout>
      <div className="pageContents">
        <Table data={data} columns={columns} />
      </div>
    </Layout>
  );
};

export default TopTalents;
