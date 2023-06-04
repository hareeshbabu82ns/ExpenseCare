import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";

function EditExpenseNameButton({ hover, setHover, categoryName }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  return (
    <>
      <Button
        pos={"absolute"}
        top={1}
        left={1}
        color={"dark"}
        bgColor={"whiteAlpha.800"}
        _hover={{ bgColor: "whiteAlpha.700" }}
        display={!hover && "none"}
        onClick={() => {
          onOpen();
          setHover(false);
        }}
      >
        <EditIcon />
      </Button>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bgColor={"lightgray"}>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={2}>
              <FormLabel ref={initialRef}>Category Name</FormLabel>
              <Input defaultValue={categoryName} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="pink" mr={3} onClick={onClose}>
              Edit
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

export default EditExpenseNameButton;
