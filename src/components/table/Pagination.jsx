import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";

function Pagination({ currentPage, setCurrentPage, totalPages }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  console.log(currentPage);

  return (
    <>
      <Flex
        w={"90vw"}
        mx={"auto"}
        justifyContent={"center"}
        alignItems={"center"}
        p={4}
        gap={"1px"}
        mb={"1rem"}
      >
        <Flex
          h={12}
          w={"20"}
          bgColor={"lightgray"}
          justifyContent={"center"}
          alignItems={"center"}
          mr={"1rem"}
          cursor={"pointer"}
          _hover={{ bgColor: "dark", border: "solid", borderColor: "white" }}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <ArrowBackIcon /> Prev
        </Flex>
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            h={12}
            w={12}
            data-key={pageNumber}
            bgColor={currentPage === pageNumber ? "dark" : "lightgray"}
            border={currentPage === pageNumber ? "solid" : undefined}
            borderColor={currentPage === pageNumber ? "blue.500" : undefined}
            borderWidth={currentPage === pageNumber ? 1 : undefined}
            borderRadius={"none"}
            value={pageNumber}
            // justifyContent={"center"}
            // alignItems={"center"}
            // cursor={"pointer"}
            _hover={{ bgColor: "dark", border: "solid", borderColor: "white" }}
            onClick={(e) => setCurrentPage(parseInt(e.target.value))}
          >
            {pageNumber}
          </Button>
        ))}
        <Flex
          h={12}
          w={"20"}
          bgColor={"lightgray"}
          justifyContent={"center"}
          alignItems={"center"}
          ml={"1rem"}
          cursor={"pointer"}
          _hover={{ bgColor: "dark", border: "solid", borderColor: "white" }}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next <ArrowForwardIcon />
        </Flex>
      </Flex>
    </>
  );
}

export default Pagination;
