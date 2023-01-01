import React from "react";
import { Table } from "../../../components";
import Layout from "../../../Layout";
import { useTrending } from "./hooks";

const Trending = () => {
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
          src={item.song.cover}
          alt=""
          height="50"
          width="50"
          style={{ borderRadius: "50%" }}
        />
      ),
    },

    { title: "Song", field: "song.name" },
    { title: "Artist", field: "song.artist" },
    { title: "Song Rating", field: "rating" },
    { title: "Streams this Month", field: "stream" },
  ];
  const data = useTrending();
  return (
    <Layout name="Trending">
      <div className="pageContents">
        <div className="col uploadForm">
          <Table columns={columns} data={data} />
        </div>
      </div>
    </Layout>
  );
};

export default Trending;
