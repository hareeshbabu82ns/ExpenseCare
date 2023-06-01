import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";

function AddCategoryButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  return (
    <>
      <IconButton
        rounded={"full"}
        h={"4rem"}
        w={"4rem"}
        position={"fixed"}
        bottom={"1rem"}
        right={"1rem"}
        colorScheme="pink"
        onClick={onOpen}
      >
        <AddIcon />
      </IconButton>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bgColor={"lightgray"}>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel ref={initialRef}>Category</FormLabel>
              <Input placeholder="Category Name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="pink" mr={3} onClick={onClose}>
              Create
            </Button>
            <Button
              border={"1px"}
              color={"lightgray"}
              bgColor={"whiteAlpha.800"}
              onClick={onClose}
              _hover={{ bgColor: "whiteAlpha.700" }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddCategoryButton;
