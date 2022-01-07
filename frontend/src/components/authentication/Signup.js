import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';

const Signup = () => {
    //states for email, confirming password, picture
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);

    return <VStack spacing = '5px'>
        <FormControl>
            <FormLabel>Name</FormLabel>
            <Input 
                placeholder = 'Please Enter Your Name'
                onChange = {(e)=> setName(e.target.value)}
                />
        </FormControl>
    </VStack>
}

export default Signup
