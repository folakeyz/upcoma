import React from "react";
import Layout from "../../../../../Layout";
import { Card, Chart } from "../../../components";
import { FaHeart, FaPlayCircle, FaUpload, FaUsers } from "react-icons/fa";
import { useAnalytics } from "./hooks";

const Dashbboard = () => {
  const data = useAnalytics();

  return (
    <Layout>
      <div className="pageContents">
        <div className="cardFlex">
          <Card
            Icon={FaUpload}
            title="Total Uploaded"
            url="/"
            color="gold"
            colorInner="lightGold"
            count={data?.total}
          />
          <Card
            Icon={FaHeart}
            title="Total Likes"
            url="/"
            color="crimson"
            colorInner="lightCrimson"
            count={data?.likes}
          />
          <Card
            Icon={FaUsers}
            title="Total Followers"
            url="/"
            color="cyan"
            colorInner="lightCyan"
            count={data?.followers}
          />
          <Card
            Icon={FaPlayCircle}
            title="Total Stream"
            url="/"
            color="purple"
            colorInner="lightPurple"
            count={data?.stream}
          />
        </div>
        <div className="chart">
          <Chart analytics={data?.analytics} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashbboard;
