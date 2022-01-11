import {
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import UserID from "../User/UserID";
import UserList from "../User/UserList";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../contextAPI/chatprovider";

const GroupChat = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();

  //selected users array in which we'll be appending/deleting from to determine the selected users for a chat
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { user, chats, setChats } = ChatState();

  //similar search & submit functions

  const searchFunc = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      //using same API for search user
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);

      setLoading(false);

      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  //simple delete from array of selected users
  const deleteFunc = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  //simple function to add users to array of selected users
  const groupFunc = (userToAdd) => {
    //check if user already added first --> otherwise add
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    //append
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const submitFunc = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      //utilizing group chat API
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failure to Create Group",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="28px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
            textColor="green"
          >
            Start Group CodeChat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            {/* Set Group Chat Name Form */}
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>

            {/* Add Users Form */}
            <FormControl>
              <Input
                placeholder="Add Users"
                mb={1}
                onChange={(e) => searchFunc(e.target.value)}
              />
            </FormControl>

            {/* Delete Function Form */}
            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserID key={u._id} user={u} handleFunc={() => deleteFunc(u)} />
              ))}
            </Box>

            {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserList
                    key={user._id}
                    user={user}
                    func={() => groupFunc(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={submitFunc} colorScheme="blue">
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChat;
