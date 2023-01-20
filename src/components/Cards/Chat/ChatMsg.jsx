import React from "react";

const ChatMsg = ({ msg, sender }) => {
  return (
    <div className={`msgContainer ${sender ? "chatRight" : ""}`}>
      <button className={`btn ${sender ? "btnWhite" : "btnOrange"}`}>
        {msg.message}
      </button>
    </div>
  );
};

export default ChatMsg;
