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
  Toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { account, databases } from "../../appwrite/appwrite-config";
import { ID } from "appwrite";

function AddCategoryButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categoryName, setCategoryName] = useState("");

  const initialRef = useRef(null);

  const toast = useToast();

  async function createCategoryHandler(e) {
    e.preventDefault();
    console.log(categoryName);

    const promise = account.get();

    promise.then(
      async (user) => {
        console.log("user", user);
        console.log("category", categoryName);

        const userDocument = await databases.getDocument(
          import.meta.env.VITE_DB_ID,
          import.meta.env.VITE_DB_USER_ID,
          user.$id
        );

        const categoryExists = userDocument.category.filter(
          (category) => category.name === categoryName
        );

        console.log("categoryExists", categoryExists);

        if (categoryExists.length !== 0) {
          toast({
            title: "Unable to create category",
            description: "Category with the same name already exists",
            status: "error",
            duration: 9000,
          });

          return;
        }

        await databases.updateDocument(
          import.meta.env.VITE_DB_ID,
          import.meta.env.VITE_DB_USER_ID,
          user.$id,
          {
            category: [...userDocument.category, { name: categoryName }],
          }
        );
      },
      (error) => console.log(error)
    );

    onClose();
  }

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
          <form>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input
                  ref={initialRef}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Category Name"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="pink"
                mr={3}
                type="submit"
                onClick={(e) => createCategoryHandler(e)}
              >
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
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddCategoryButton;
