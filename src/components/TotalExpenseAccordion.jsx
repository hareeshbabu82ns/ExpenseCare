import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  Text,
} from "@chakra-ui/react";
import React from "react";

function TotalExpenseAccordion() {
  return (
    <Container w={"500px"} p={10}>
      <Accordion
        allowToggle
        bgColor={"teal.600"}
        mx={"auto"}
        border={"none"}
        rounded={"full"}
      >
        <AccordionItem>
          <AccordionButton>
            <Flex justifyContent={"space-around"}>
              <Text>Current Year : Rs. 150000</Text>
              <Text>Current Month : Rs. 25000</Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla atque
            velit dignissimos nam quis. Vero distinctio deleniti tenetur error
            suscipit.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
}

export default TotalExpenseAccordion;
