import React from "react";
import hi from "../../../assets/images/robot.gif";
const WelcomeChat = ({ name }) => {
  return (
    <div className="chatWelcome">
      <img src={hi} alt="robot" />
      <h3>Welcome {name}!</h3>
      <p>Select a Follower to start chatting</p>
    </div>
  );
};

export default WelcomeChat;
