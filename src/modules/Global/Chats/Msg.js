import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ChatMsg } from "../../../components";
import { toastOptions } from "../../../utils";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useChat, useCreateChat } from "./hooks";

const Msg = ({ user, socket, me }) => {
  const data = useChat(user?._id);
  const [formData, setFormData] = useState({});
  const [msgs, setMsgs] = useState(null);
  const scrollRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { mutate, isSuccess, reset } = useCreateChat();
  const submitHandler = (e) => {
    e.preventDefault();
    if (!formData["chat"]) {
      return toast.error("Message cannot be empty", toastOptions);
    }

    console.log(user._id, "rec");
    console.log(me._id, "sender");
    socket.current.emit("send-msg", {
      receiver: user._id,
      sender: me._id,
      message: formData["chat"],
    });
    const msgs = { fromMe: true, message: formData["chat"] };
    data.push(msgs);

    const chatData = { ...formData, receiver: user._id };
    mutate(chatData);
  };
  if (isSuccess) {
    setFormData("");
    reset();
  }
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        data.push({ fromMe: false, message: msg });
      });
    }
  }, [socket, data]);

  // useEffect(() => {
  //   console.log(msgs, "msgs");
  //   msgs && data.push(msgs);
  // }, [msgs, data]);

  console.log("chats", data);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <div className="chatMsg">
      <ChatHeader user={user} />
      <div className="messages" ref={scrollRef}>
        {data?.map((item, i) => (
          <ChatMsg key={i} msg={item} sender={item.fromMe} />
        ))}
      </div>
      <ChatInput
        submitHandler={submitHandler}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Msg;
