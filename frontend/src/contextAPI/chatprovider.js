import { useHistory } from "react-router-dom";
import React, { Children, createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

  //const [notification, setNotification] = useState([]);
  //const [chats, setChats] = useState();
  //const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const history = useHistory();
  const [selectedChat, setSelectedChat] = useState();

  //get local storage
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    //if user not logged in, redirected to login page
    if (!userInfo) {

      history.push("/");

  }}, [history]);

  return (
    <ChatContext.Provider value={{user, setUser}}>
      { children }
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
 