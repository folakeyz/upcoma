import React from "react";
import { useParams } from "react-router-dom";
import { UserJumbotron } from "../../../components";
import Layout from "../../../Layout";

const GlobalProfile = () => {
  const { id } = useParams();
  return (
    <Layout>
      <div className="pageContents">
        <UserJumbotron
        
        />
      </div>
    </Layout>
  );
};

export default GlobalProfile;
