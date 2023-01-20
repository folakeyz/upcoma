import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { BiPaperPlane } from "react-icons/bi";

const ChatInput = ({ submitHandler, formData, setFormData, handleChange }) => {
  const [show, setShow] = useState("");

  const emojiHandler = (event, emoji) => {
    let msg = formData["chat"];
    msg += event.emoji;
    setFormData({ ...formData, chat: msg });
    setShow(false);
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="chatInput">
        <div className="chatEmoji">
          <BsEmojiSmileFill onClick={() => setShow(!show)} />
          {show && (
            <EmojiPicker
              onEmojiClick={emojiHandler}
              theme="dark"
              className="emojiPicker"
            />
          )}
        </div>
        <div className="chatInputText">
          <input
            name="chat"
            placeholder="type your message here"
            onChange={(e) => handleChange(e)}
            value={formData["chat"]}
          />
        </div>
        <div className="chatInputButton">
          <button type="submit" className="chatBtn">
            <BiPaperPlane />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
