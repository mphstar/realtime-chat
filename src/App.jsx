import React, { useEffect, useRef, useState } from "react";
import BgHerta from "./assets/images/bg.png";
import NameContext from "./utils/NameContext";
import FirstPage from "./components/FirstPage";
import SecondPage from "./components/SecondPage";
import { socket } from "./utils/socket";

const App = () => {
  const [Name, SetName] = useState("");
  const [DataChat, SetDataChat] = useState([]);
  const [isConnected, SetIsConnected] = useState(false);


  useEffect(() => {
    socket.on("chat", (res) => {
      console.log(res);
      SetDataChat(res)

      // DivChat.current.scrollTop = DivChat.current.scrollHeight;
      // console.log(DivChat.current.scrollTop);
      // DivChat.current.scrollTop = DivChat.current.scrollHeight;

      
    })


    socket.on("connect", () => {
      SetIsConnected(true);
      
    });

    // console.log(DataChat);

  }, [DataChat]);


  return !isConnected ? (
    <div className="min-h-screen font-mono w-screen bg-white flex justify-center h-screen items-center px-4 py-4 lg:py-12 relative">
      <p>Not Connected to server!</p>
    </div>
  ) : (
    <NameContext.Provider value={{Name, SetName, DataChat, SetDataChat}}>
      <div className="min-h-screen font-mono w-screen bg-gray-500 flex justify-center h-screen items-center px-4 py-4 lg:py-12 relative">
        <div className="absolute w-full h-full flex select-none appearance-none pointer-events-none">
          <img className="object-cover w-full" src={BgHerta} alt="bg" />
        </div>
        <FirstPage />
        <SecondPage />
      </div>
    </NameContext.Provider>
  );
};

export default App;
