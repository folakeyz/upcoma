import React from "react";
import { Table } from "../../../components";
import Layout from "../../../Layout";
import { useTrending } from "./hooks";

const TopSongs = () => {
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
  const songs = data.filter((x) => x._sid === "Song");
  return (
    <Layout name="Top Songs">
      <div className="pageContents">
        <Table data={songs} columns={columns} />
      </div>
    </Layout>
  );
};

export default TopSongs;
