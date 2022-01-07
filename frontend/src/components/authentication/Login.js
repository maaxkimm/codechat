import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
    //states for email, password
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState();

    const [show, setShow] = useState(false);
    
    //inverts show
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const history = useHistory();

    const submitFunc = async () => {
        setLoading(true);
        if (!email || !password) {
        toast({
            title: "Please Fill all Fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setLoading(false);
        return;
        }

        try {

            //make request

        const config = {
            headers: {
            "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/user/login",
            { email, password },
            config
        );

        toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        history.push("/chats");

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        setLoading(false);
        }
    };

    return <VStack spacing = '10px'>
    
        {/* Email Field */}
        <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
                type="email"
                placeholder="Please Enter Email Address"
                onChange={(e) => setEmail(e.target.value)}
            />
        </FormControl>

        {/* Password Field */}
        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
                <Input
                    onChange={(e) => setPassword(e.target.value)}
                    type={show ? "text" : "password"}
                    placeholder="Please Enter Password"
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
        isLoading={loading}
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
