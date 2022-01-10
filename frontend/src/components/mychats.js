import React, { useState, useEffect } from 'react'
import { ChatState } from '../contextAPI/chatprovider';
import { Button, useToast } from "@chakra-ui/react";
import { Box, Text, Stack } from "@chakra-ui/layout";
import GroupChat from './misc/groupchat';
import axios from 'axios';
import { getSender } from "../config/chatsender"
import ChatLoading from './chatloading';

const MyChats = () => {

    const { selectedChat, setSelectedChat, chats, setChats, user } = ChatState();
    const [logUser, setLogUser] = useState();
    const toast = useToast();
    
    //fetch chats function

    const fetchChats = async() => {
        try {
            const config = {
                headers: { 
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get("/api/chat", config);

            console.log(data);

            setChats(data);

        } catch (error) {
            toast({
                title: "Error",
                description: "Unable to load chats",
                status: "error",
                duration: 4000,
                isClosable: true,
                position: "bottom-left",
            })
        }
    }

    useEffect(() => {
        setLogUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
    }, [])

    return (
        <Box
            d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px">

        <Box
            pb={3}
            px={3}
            fontSize={{ base: "28px", md: "20px" }}
            fontFamily="Work sans"
            d="flex"
            w="100%"
            justifyContent="space-between"
            alignItems="center">

        My CodeChats

        <GroupChat>
            <Button
                d="flex"
                textColor="green"
                fontSize={{ base: "14px", md: "12px", lg: "14px" }}>
                New Group Chat
            </Button>
        </GroupChat>
       


        </Box>
        <Box
            d="flex"
            flexDir="column"
            p={3}
            bg="#F8F8F8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden">

        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}>
                <Text>
                  {!chat.isGroupChat
                    ? getSender(logUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
            </Box>
        </Box>
    )
}

export default MyChats
