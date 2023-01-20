import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatCard } from "../../../components";
import { AuthContext } from "../../../context";
import Layout from "../../../Layout";
import Msg from "./Msg";
import WelcomeChat from "./Welcome";
import { io } from "socket.io-client";

const Chats = () => {
  const [selected, setSelected] = useState(undefined);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const { user } = useContext(AuthContext);
  const socket = useRef();

  const handleSelect = (i, item) => {
    setSelected(i);
    setSelectedUser(item);
  };

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:8000");
      socket.current.emit("add-user", user._id);
    }
  }, [user]);

  return (
    <Layout>
      <div className="pageContents">
        <div className="chatContainer">
          <div className="followers">
            {user?.followers?.map((item, i) => (
              <div key={i} onClick={() => handleSelect(i, item)}>
                <ChatCard user={item} selected={i === selected} />
              </div>
            ))}
          </div>
          <div className="msg">
            {selected !== undefined ? (
              <Msg user={selectedUser} socket={socket} me={user} />
            ) : (
              <WelcomeChat name={user?.firstname} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chats;
