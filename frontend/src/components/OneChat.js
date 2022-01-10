import React from 'react';
import { ChatState } from "../contextAPI/chatprovider";
import { Box, Text } from "@chakra-ui/layout";

const OneChat = () => {
    const { user, selectedChat, setSelectedChat } = ChatState();

    return (
        <div>
            {selectedChat ? (
                <></>
            ) : (
            <Box d="flex" alignItems="center" justifyContent="center" h="800%">
                <Text fontSize="3xl" fontFamily="Work sans" pb={3}>
                    Please click on a user or chat to begin! :D
                </Text>
            </Box>
            )}
        </div>
    )
}

export default OneChat
