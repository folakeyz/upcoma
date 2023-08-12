import React, { useContext } from "react";

import { Table } from "../../../../../components";
import { AuthContext } from "../../../../../context";
import Layout from "../../../../../Layout";

const MyWatchlist = () => {
  const { user } = useContext(AuthContext);
  const columns = [
    {
      title: "DP",
      field: "photo",
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

  return (
    <Layout name="My Watchlist">
      <div className="pageContents">
        <div className="col uploadForm">
          <Table data={user?.watchlist} columns={columns} />
        </div>
      </div>
    </Layout>
  );
};

export default MyWatchlist;
