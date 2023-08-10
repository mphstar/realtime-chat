import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NameContext from "../utils/NameContext";
import { socket } from "../utils/socket";
import BubbleChat from "./BubbleChat";
import ReactDOM from "react-dom/client";
import CatchHerta from "../utils/CatchHerta";
import playKuru from "../utils/CatchAudio";

const SecondPage = () => {
  const [Name, SetName, DataChat, SetDataChat] = useContext(NameContext);
  const inputMsg = useRef(null);
  const divChat = useRef(null);

  const SendMsg = (e) => {
    e.preventDefault();
    if(inputMsg.current.value != ''){
      socket.emit("sendMsg", Name, inputMsg.current.value, socket.id);
    }
    inputMsg.current.value = "";
  };

  const handleKururing = () => {
    playKuru();
    const el = document.createElement("div");
    ReactDOM.createRoot(el).render(
      <motion.div
        initial={{ x: 400 }}
        animate={"show"}
        variants={{
          show: {
            x: -document.body.clientWidth,
            transition: { duration: 1.5 },
          },
        }}
        className="w-fit h-[400px] rounded-md right-0 bottom-0 fixed"
      >
        <img className="w-full h-full" src={CatchHerta} alt="herta" />
      </motion.div>
    );
    document.body.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 1500);
  };

  useEffect(() => {
    return () => {
      
      
      socket.on("receiveMsg", (res) => {
        divChat.current.scrollTop = divChat.current.scrollHeight;
        if (socket.id != res.id && res.sender != Name) {
          handleKururing();
        }
        SetDataChat((DataChat) => [...DataChat, res]);
      });
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="div-input"
        initial={Name == "" ? "close" : "open"}
        variants={{
          open: {
            opacity: 1,
            display: "flex",
            transition: {
              delay: 0.4,
              duration: 1,
              ease: "easeInOut",
            },
          },
          close: {
            opacity: 0,
            display: "none",
            transition: {},
          },
        }}
        animate={Name == "" ? "close" : "open"}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex flex-col overflow-y-auto gap-4 px-8 justify-between bg-black/60 rounded-lg w-full h-full py-6 max-w-md z-10 backdrop-blur-sm text-white"
      >
        <div className="w-full h-fit py-2 flex flex-col">
          <p className="font-semibold">RealTime Chat</p>
          <p className="text-xs text-gray-300">Login as {Name}</p>
        </div>
        <div
          ref={divChat}
          id="kontenChat"
          className="w-full flex flex-grow flex-col gap-4 scrollbar-hide overflow-y-auto"
        >
          {DataChat.map((item, index) => {
            return (
              <motion.div
                className={`flex ${item.id == socket.id && item.sender ? 'justify-end' : 'justify-start'}`}
                key={index}
                initial={{ x: item.id == socket.id && item.sender == Name ? -100 : 100 }}
                animate={{ x: 0 }}
              >
                <BubbleChat
                  key={index}
                  Sender={item.sender}
                  msg={item.msg}
                  isLogin={socket.id == item.id ? true : false}
                />
              </motion.div>
            );
          })}
        </div>
        <div className="footer w-full h-fit flex flex-row gap-4">
          <input
            ref={inputMsg}
            placeholder="Input text here"
            className="bg-transparent rounded-md flex-grow hover:border-purple-600"
            type="text"
          />
          <button
            onClick={(e) => SendMsg(e)}
            className="px-2 py-2 bg-purple-600 rounded-md hover:bg-purple-800"
          >
            SEND
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SecondPage;
