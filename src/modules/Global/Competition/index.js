import React from "react";
import { CompetitionCard } from "../../../components";
import Layout from "../../../Layout";
import { useCompetition } from "./hooks";

const Competition = () => {
  const compete = useCompetition();
  return (
    <Layout name="Competitions">
      <div className="pageContents">
        <div className="cardFlex">
          {compete?.map((item, i) => (
            <CompetitionCard key={i} info={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Competition;
