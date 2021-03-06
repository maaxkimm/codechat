import { useHistory } from "react-router-dom";
import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();

  const history = useHistory();

  const [selectedChat, setSelectedChat] = useState();
  //populate all chats in chats state
  const [chats, setChats] = useState([]);

  //get local storage
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    //if user not logged in, redirected to login page
    if (!userInfo) {
      history.push("/");
    }
  }, [history]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, chats, setChats, selectedChat, setSelectedChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
