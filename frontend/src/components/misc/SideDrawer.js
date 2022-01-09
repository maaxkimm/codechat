import { Input, Avatar, Menu, MenuList, MenuButton, Tooltip, MenuItem, MenuDivider, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerHeader, useToast} from '@chakra-ui/react';
import { Button } from "@chakra-ui/button";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import React, { useState } from 'react';
import { ChatState } from "../../contextAPI/chatprovider";
import Profile from "./profile";
import { useHistory } from 'react-router-dom';
import { useDisclosure } from "@chakra-ui/hooks"
import axios from 'axios';
import ChatLoading from "../chatloading";
import UserList from "../User/UserList"


const SideDrawer = () => {

    const history = useHistory();

    const {isOpen, onOpen, onClose } = useDisclosure();


    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const { user } = ChatState();
    
    //function handling logout
    const logoutFunc = () => {
        localStorage.removeItem("userInfo");

        //push to homepage
        history.push("/");
    }

    const toast = useToast();
    //function handling search in drawer
    const searchFunc = async() => {
        //nothing entered
        if (!search) {
            toast({
                title: "Enter something lol",
                status: "warning",
                duration: 4000,
                isClosable: true,
                position: "top-left",
            })
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.get(`/api/user?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);

        } catch (error) {
            toast({
                title: "Error",
                description: "Failure to Find Search Results",
                status: "error",
                duration: 4000,
                isClosable: true,
                position: "bottom-left",
            });
        };
    };

    //get chat function
    const getChat = (userId) => {};


    return (
        <div>
            <Box d="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
                <Tooltip label = "Search Users" hasArrow placement='bottom-end'>
                    <Button variant = "ghost" onClick = {onOpen}>
                        <i class = "fas fa-search"></i>
                        <Text d = {{ base: "none", md: "flex" }} px = "4">
                            Search User
                        </Text>
                    </Button>
                </Tooltip>

            <Text fontSize = "2xl" fontFamily = "Work sans">
                StoryChat
            </Text>

            <div>
                <Menu>
                    <MenuButton p={1}>
                        <BellIcon fontSize = "2xl" m = {1}/>
                    </MenuButton>
                </Menu>

                <Menu>
                    <MenuButton as = {Button} rightIcon = {<ChevronDownIcon />}>
                        <Avatar size = "sm" cursor = "pointer" name = { user.name } src = {user.pic} />
                    </MenuButton>

                    <MenuList>
                        <Profile user = {user}>
                            <MenuItem>My Profile</MenuItem>
                        </Profile>
                        <MenuDivider/>
                        <MenuItem onClick={logoutFunc}>Logout</MenuItem>
                    </MenuList>
                </Menu> 
            </div>
            </Box>


            <Drawer placement = "left" onClose={onClose} onOpen={onOpen} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                    <DrawerBody>
                    <Box d = "flex" pb={1}>
                        <Input placeholder="Search using name or email" mr = {2} value = 
                        {search} onChange={(a) => setSearch(a.target.value)}/>
                        <Button onClick = {searchFunc}>Go</Button>
                    </Box>
                    {loading ? (<ChatLoading />) : (searchResult?.map((user) => (<UserList key = {user._id} 
                        user = {user}
                        func = {() => getChat(user._id)}
                    />)))}

                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default SideDrawer
