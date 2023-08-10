import React from "react";

const BubbleChat = ({ Sender, isLogin, msg }) => {
  return (
    <div
      className={`max-w-[60%] h-fit w-full flex flex-col ${
        isLogin ? "self-end" : "self-start"
      }`}
    >
      <p className={`${isLogin ? "text-end" : "text-start"}`}>{Sender}</p>
      <div
        className={`flex w-full h-full ${
          isLogin ? "bg-purple-400" : "bg-purple-500"
        } px-2 py-2 rounded-md flex-col`}
      >
        <div className="break-words">{msg}</div>
      </div>
    </div>
  );
};

export default BubbleChat;
