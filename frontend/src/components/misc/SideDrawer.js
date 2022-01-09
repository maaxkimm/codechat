import { Avatar, Menu, MenuList, MenuButton, Tooltip, MenuItem, MenuDivider} from '@chakra-ui/react';
import { Button } from "@chakra-ui/button";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import React, { useState } from 'react';
import { ChatState } from "../../contextAPI/chatprovider";
import Profile from "./profile";


const SideDrawer = () => {
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const { user } = ChatState();

    return (
        <div>
            <Box d="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
                <Tooltip label = "Search Users" hasArrow placement='bottom-end'>
                    <Button variant = "ghost">
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
                        <MenuDivider />
                        <MenuItem>Logout</MenuItem>
                    </MenuList>
                </Menu> 
            </div>
            </Box>
        </div>
    )
}

export default SideDrawer
