import React, { useContext, useEffect, useState } from "react";
import Avatar from "../../../components/Avatar";
import { AuthContext } from "../../../context";
import Layout from "../../../layout";
import { MinChatUI } from "@minchat/reactui";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [converse, setConverse] = useState([]);
  console.log(user, "user iinfor");
  const name = user?.firstname + " " + user?.lastname;
  const CURRENT_USER = {
    id: user?._id,
    name: name,
    avatar: user.photo ? user?.photo : Avatar(user?.gender),
  };
  console.log(CURRENT_USER, "current");
  useEffect(() => {
    if (user?.followers?.length > 0) {
      const users = [];
      const followers = user?.followers;

      for (var i = 0; i < followers?.length; i++) {
        const names = followers[i]?.firstname + " " + followers[i]?.lastname;
        const current = {
          id: followers[i]?._id,
          name: names,
          avatar: followers[i].photo ? followers[i]?.photo : Avatar("Male"),
        };
        users.push(current);
      }
      setConverse(users);
    }
  }, [user]);
  console.log(converse, "converse");
  return (
    <Layout name="Chat">
      <div className="pageContents">
        {/* <MinChatUI
          user={CURRENT_USER}
          apiKey={332003327}
          startConversation={converse?.[0]}
          themeColor="#00d084"
        /> */}
      </div>
    </Layout>
  );
};

export default Chat;
