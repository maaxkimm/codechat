import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/chatbox";
import MyChats from "../components/mychats";
import SideDrawer from "../components/misc/SideDrawer";
import { ChatState } from "../contextAPI/chatprovider";

const Chatpage = () => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);
    return (<div style = {{ width: "100%"}}>
        {user && <SideDrawer />}
        
        <Box d = "flex" justifyContent = "space-between" w = "100%" h = "91.5vh" p = "10px">
            {user && <MyChats fetchAgain={fetchAgain} />}
            {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        </Box>

    </div>
  );
};


export default Chatpage;
