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
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);

    const [show, setShow] = useState(false);
    
    //inverts show
    const handleClick = () => setShow(!show);

    const toast = useToast();
    const history = useHistory();

    //picture processing
    const pictureDeets = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
        toast({
            title: "Please Select an Image",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        return;
        }
        console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "codechat");
        data.append("cloud_name", "dei2tmzkk");

        //make API call to url
        fetch("https://api.cloudinary.com/v1_1/dei2tmzkk/image/upload", {
            method: "post",
            body: data,
        })
            //convert to json
            .then((res) => res.json())
            //set pics state
            .then((data) => {
            setPic(data.url.toString());
            console.log(data.url.toString());
            setPicLoading(false);
        })
            .catch((err) => {
            console.log(err);
            setPicLoading(false);
        });
        } else {
        toast({
            title: "Please Select an Image",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setPicLoading(false);
        return;
        }
    };

    //function for submission and logging
    const submitFunc = async () => {
        setPicLoading(true);
        if (!name || !email || !password) {
        toast({
            title: "Please Fill all Fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setPicLoading(false);
        return;
        }
        console.log(name, email, password, pic);
        try {
        const config = {
            headers: {
            "Content-type": "application/json",
            },
        };
        const { data } = await axios.post(
            "/api/user",
            {
            name,
            email,
            password,
            pic,
            },
            config
        );
        console.log(data);
        toast({
            title: "Signup Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setPicLoading(false);
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
        setPicLoading(false);
        }
    };

    return <VStack spacing = '10px'>
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
