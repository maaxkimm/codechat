import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const Signup = () => {
    //states for name, email,password, picture
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);

    const [show, setShow] = useState(false);
    
    //inverts show
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const history = useHistory();

    const pictureDeets = (pictures) => {

    };

    const submitFunc = async () => {

    };

    return <VStack spacing = '7px'>
        {/* Name Field */}
        <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
                placeholder = 'Please Enter Name'
                onChange = {(e)=> setName(e.target.value)}
                />
        </FormControl>

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

        {/* Picture Field */}
        <FormControl id="pic">
        <FormLabel>Profile Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => pictureDeets(e.target.files[0])}
        />
      </FormControl>

      {/* Signup Button */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitFunc}
        isLoading={picLoading}
      >
        Sign Up
      </Button>

    </VStack>
}

export default Signup
