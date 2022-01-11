import { useEffect } from "react";
import { useHistory } from "react-router";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";

function Homepage() {
  const history = useHistory();
  useEffect(() => {
    //if user logged in push to chats page
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      {/* Title Container */}
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="3xl" fontFamily="Work sans" color="black">
          CodeChat
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            {/* Login Tab */}
            <Tab>Login</Tab>

            {/* Sign Up Tab */}
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* Login Component */}
              <Login />
            </TabPanel>
            <TabPanel>
              {/* Sign Up Component */}
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
