import { Box } from '@chakra-ui/react';
import React from 'react';
import { CloseIcon } from "@chakra-ui/icons";

const UserID = ({ user, handleFunc }) => {
    return (
        <div>
            <Box
                px={2}
                py={1}
                borderRadius="lg"
                m={1}
                mb={2}
                variant="solid"
                fontSize={12}
                colorScheme="blue"
                cursor="pointer"
                onClick={handleFunc}
                >
                {user.name}
                <CloseIcon pl={1} />
            </Box>
        </div>
    )
}

export default UserID
