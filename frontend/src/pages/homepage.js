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

function Homepage() {
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
        <Text fontSize="3xl" fontFamily="Work sans" color='black'>
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
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage
