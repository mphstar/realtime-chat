import React, { useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NameContext from "../utils/NameContext";

const FirstPage = () => {
  const inputName = useRef(null);
  const [Name, SetName] = useContext(NameContext);

  const handleNext = () => {
    if (inputName.current.value != "") {
      SetName(inputName.current.value);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="div-input"
        initial={{ opacity: 0, y: 100 }}
        variants={{
          open: {
            opacity: 1,
            y: 0,
            transitionEnd: { display: "flex" },
          },
          close: {
            opacity: 0,
            y: 100,
            transitionEnd: { display: "none" },
          },
        }}
        animate={Name == "" ? "open" : "close"}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex flex-col overflow-y-auto gap-4 px-8 items-center justify-center bg-black/60 rounded-lg w-full h-fit py-12 max-w-md z-10 backdrop-blur-sm"
      >
        <p className="text-white">Enter your name</p>
        <input
          ref={inputName}
          className="rounded-lg w-full bg-transparent text-white text-center focus:border-purple-600"
          type="text"
        />
        <button
          onClick={() => handleNext()}
          className="bg-purple-600 hover:bg-purple-800 w-full py-2 text-white rounded-md"
        >
          Next
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default FirstPage;
