import {
    Box,
    Flex,
    Text,
} from '@chakra-ui/react'
import * as React from 'react'

import { UploadDialog } from '../UploadDialog'

export const Navbar: React.FunctionComponent = () => {
    return (
        <Box>
            <Flex
                align="center"
                borderBottom={1}
                borderColor="gray.200"
                borderStyle="solid"
                minH="60px"
                px={{ base: 4 }}
                py={{ base: 2 }}
            >
                <Flex
                    align="center"
                    flex={{ base: 1 }}
                    justify="space-between"
                >
                    <Text
                        color="gray.800"
                        fontFamily="heading"
                        fontSize="xl"
                        fontWeight="bold"
                    >
                        Cryptogram
                    </Text>
                    <UploadDialog />
                </Flex>
            </Flex>
        </Box>
    )
}
