import { Stack, Skeleton } from '@chakra-ui/react'
import React from 'react'

const ChatLoading = () => {
    return (
        <Stack>
            {/* from Chakra UI Documentation */}
            <Skeleton height = "45px" />
            <Skeleton height = "45px" />
            <Skeleton height = "45px" />
            <Skeleton height = "45px" />
            <Skeleton height = "45px" />
            <Skeleton height = "45px" />
            <Skeleton height = "45px" />
            <Skeleton height = "45px" />
            <Skeleton height = "45px" />
            <Skeleton height = "45px" />
            <Skeleton height = "45px" />
            <Skeleton height = "45px" />
        </Stack>
    )
}

export default ChatLoading
