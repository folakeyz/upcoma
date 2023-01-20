import React from "react";
import { Avatar } from "../../../components/Avatar";
import { userRank } from "../../../components/Star";

const ChatHeader = ({ user }) => {
  return (
    <div className="chatHeader">
      <div className="chatHeaderPhoto">
        {user.photo ? (
          <img src={`${user?.photo}`} alt="title" />
        ) : (
          Avatar(user?.gender)
        )}
      </div>
      <div className={`chatHeaderName`}>
        <p>{user?.firstname + " " + user?.lastname}</p>
        {userRank(user?.rank)}
      </div>
    </div>
  );
};

export default ChatHeader;
