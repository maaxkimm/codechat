import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const Login = () => {
    //states for email, password
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();

    const [show, setShow] = useState(false);
    
    //inverts show
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const history = useHistory();

    const submitFunc = async () => {

    };

    return <VStack spacing = '10px'>
    
        {/* Email Field */}
        <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
            type="email"
            placeholder="Please Enter Email Address"
            onChange={(e) => setPassword(e.target.value)}
            />
        </FormControl>

        {/* Password Field */}
        <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Please Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.70rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        </FormControl>

      {/* Login Button */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitFunc}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="green"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Random User Login
      </Button>

    </VStack>
}

export default Login
