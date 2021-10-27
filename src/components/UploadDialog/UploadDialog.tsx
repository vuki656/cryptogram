/* eslint-disable react/jsx-no-undef */
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react'
import * as React from 'react'

import { FileUpload } from '../FileUpload'

export const UploadDialog: React.FunctionComponent = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [file, setFile] = React.useState<File>()

    const onRemove = () => {
        setFile(undefined)
    }

    const onUpload = () => {

    }

    return (
        <>
            <Button
                _hover={{
                    bg: 'blue.400',
                }}
                bg="blue.300"
                color="white"
                fontSize="sm"
                fontWeight={600}
                onClick={onOpen}
            >
                Upload
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Upload Image
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FileUpload
                            onRemove={onRemove}
                            onUpload={setFile}
                            value={file}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={onUpload}
                        >
                            Upload
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
