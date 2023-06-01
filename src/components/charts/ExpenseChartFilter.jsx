import { Button, Flex, FormControl, Select } from "@chakra-ui/react";
import React from "react";
import { yearRange, months } from "../Filters";

function ExpenseChartFilter() {
  return (
    <>
      <FormControl>
        <Flex
          border={"solid"}
          borderWidth={"thin"}
          borderRadius={"lg"}
          maxW={{ base: "90vw", md: "1200px" }}
          mx={"auto"}
          mt={"1rem"}
          justifyContent={"center"}
          gap={{ base: 4, md: 8 }}
          p={8}
          flexDir={{ base: "column", md: "row" }}
          alignItems={"center"}
        >
          <Flex
            w={{ base: "100%", md: "600px" }}
            justifyContent={{ base: "space-between", md: "space-evenly" }}
          >
            <Select placeholder="Year" w={"225px"} variant={"outline"}>
              {yearRange.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
            <Select placeholder="Month" w={"225px"} variant={"outline"}>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.option}
                </option>
              ))}
            </Select>
          </Flex>

          <Button w={{ base: "80vw", md: "300px" }} colorScheme="pink">
            Show Charts
          </Button>
        </Flex>
      </FormControl>
    </>
  );
}

export default ExpenseChartFilter;
