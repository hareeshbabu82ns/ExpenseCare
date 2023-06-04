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

function AddExpenseButton({ hover, categoryName, setHover }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  return (
    <>
      <Button
        colorScheme="pink"
        mx={"auto"}
        w={"200px"}
        display={hover ? "block" : "none"}
        onClick={() => {
          onOpen();
          setHover(false);
        }}
      >
        Add expense
      </Button>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bgColor={"lightgray"}>
          <ModalHeader>Add Expense to {categoryName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={2}>
              <FormLabel ref={initialRef}>Expense</FormLabel>
              <Input placeholder="Expense Name" />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Amount</FormLabel>
              <Input placeholder="in Rs." />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Description (Optional)</FormLabel>
              <Textarea placeholder="Type description here" />
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

export default AddExpenseButton;
