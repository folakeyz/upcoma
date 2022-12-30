import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CompetitionCard } from "../../../../../components";
import { AuthContext } from "../../../../../context";
import Layout from "../../../../../Layout";
import { useCompetition } from "../../../../Global/Competition/hooks";

const MyCompetitions = () => {
  const evt = useCompetition();
  const { user } = useContext(AuthContext);

  const myEvt = evt.filter((x) => x?.host?._id === user?._id);

  return (
    <Layout>
      <div className="pageContents">
        <div className="btnContainer right">
          <Link to="/app/musician/competition/manage" className="btn btnWhite">
            Manage Competition
          </Link>
        </div>
        <div className="cardFlex">
          {myEvt?.map((item, i) => (
            <CompetitionCard key={i} info={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MyCompetitions;
