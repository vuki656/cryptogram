import { DeleteIcon } from '@chakra-ui/icons'
import {
    Box,
    Center,
    Flex,
    IconButton,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { useDropzone } from 'react-dropzone'

import type { FileUploadProps } from './FileUpload.types'

export const FileUpload: React.FunctionComponent<FileUploadProps> = (props) => {
    const { onRemove, onUpload, value } = props

    const { getInputProps, getRootProps, isDragActive } = useDropzone({
        maxFiles: 1,
        multiple: false,
        onDrop: (files) => {
            onUpload(files[0])
        },
    })

    const borderColor = useColorModeValue(
        isDragActive ? 'teal.300' : 'gray.300',
        isDragActive ? 'teal.500' : 'gray.500',
    )

    return (
        <Box>
            {value
                ? (
                    <Flex
                        align="center"
                        flex={{ base: 1 }}
                        justify="space-between"
                    >
                        <Text>
                            {value.name}
                        </Text>
                        <IconButton
                            aria-label="Delete Image"
                            icon={<DeleteIcon />}
                            onClick={onRemove}
                        />
                    </Flex>
                )
                : (
                    <Center
                        _hover={{ bg: 'gray.100' }}
                        bg={isDragActive ? 'gray.100' : 'transparent'}
                        border="3px dashed"
                        borderColor={borderColor}
                        borderRadius={4}
                        cursor="pointer"
                        p={10}
                        transition="background-color 0.2s ease"
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Text align="center">
                            {
                                isDragActive
                                    ? 'Drop the files here ...'
                                    : 'Drag \'n\' drop files here, or click to select files'
                            }
                        </Text>
                    </Center>
                )}
        </Box>
    )
}
