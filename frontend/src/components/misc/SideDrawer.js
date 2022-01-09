import { Input, Avatar, Menu, MenuList, MenuButton, Tooltip, MenuItem, MenuDivider, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerHeader} from '@chakra-ui/react';
import { Button } from "@chakra-ui/button";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import React, { useState } from 'react';
import { ChatState } from "../../contextAPI/chatprovider";
import Profile from "./profile";
import { useHistory } from 'react-router-dom';
import { useDisclosure } from "@chakra-ui/hooks"


const SideDrawer = () => {

    const history = useHistory();

    const {isOpen, onOpen, onClose } = useDisclosure();

    //function handling logout
    const logoutFunc = () => {
        localStorage.removeItem("userInfo");

        //push to homepage
        history.push("/");
    }

    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const { user } = ChatState();

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
                    <Box d = "flex" pb = {2}>
                        <Input placeholder="Search by name or email" mr = {2} value = 
                        {search} onChange={(a) => setSearch(a.target.value)}/>
                    </Box>
                    {/*<Button onClick = {searchFunc}>Go</Button>*/}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default SideDrawer
