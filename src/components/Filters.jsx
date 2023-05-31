import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { categories } from "../pages/Dashboard";
import { useDispatch } from "react-redux";
import { filterActions } from "../store/filterSlice";

const priceRange = [
  { option: "0 - 100", value: 0 },
  { option: "100 - 500", value: 100 },
  { option: "500 - 1000", value: 500 },
  { option: "1000 - 10000", value: 1000 },
  { option: "Above 10000", value: 10000 },
];

const yearRange = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

const months = [
  {
    option: "January",
    value: 1,
  },
  {
    option: "February",
    value: 2,
  },
  {
    option: "March",
    value: 3,
  },
  {
    option: "April",
    value: 4,
  },
  {
    option: "May",
    value: 5,
  },
  {
    option: "June",
    value: 6,
  },
  {
    option: "July",
    value: 7,
  },
  {
    option: "August",
    value: 8,
  },
  {
    option: "September",
    value: 9,
  },
  {
    option: "October",
    value: 10,
  },
  {
    option: "November",
    value: 11,
  },
  {
    option: "December",
    value: 12,
  },
];

function Filters() {
  const dispatch = useDispatch();

  return (
    <>
      <FormControl my={"2rem"} maxW={"90%"} mx={"auto"}>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent={{ base: "center", md: "space-around" }}
          gap={10}
          border={"solid"}
          borderWidth={"thin"}
          borderRadius={"lg"}
          p={5}
          bg={"lightgray"}
          alignItems={"center"}
        >
          <Select
            placeholder="Select Category"
            w={"225px"}
            variant={"outline"}
            onChange={(e) =>
              dispatch(filterActions.setCategory(e.target.value))
            }
          >
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Price Range"
            w={"225px"}
            variant={"outline"}
            onChange={(e) => dispatch(filterActions.setPrice(e.target.value))}
          >
            {priceRange.map((price) => (
              <option key={price.value} value={price.value}>
                {price.option}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Year"
            w={"225px"}
            variant={"outline"}
            onChange={(e) => dispatch(filterActions.setYear(e.target.value))}
          >
            {yearRange.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Month"
            w={"225px"}
            variant={"outline"}
            onChange={(e) => dispatch(filterActions.setMonth(e.target.value))}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.option}
              </option>
            ))}
          </Select>

          <Button colorScheme="pink" maxW={"225px"}>
            Apply Filters
          </Button>
        </Flex>
      </FormControl>

      <Flex w={"90%"} mx={"auto"} my={"2rem"} justify={"space-between"}>
        <Flex>
          <Input
            placeholder="Search Expense Name"
            w={{ base: "150px", md: "250px" }}
            rounded={"none"}
            borderColor={"primary"}
          />
          <IconButton colorScheme="pink" rounded={"none"}>
            <SearchIcon />
          </IconButton>
        </Flex>

        <Flex justifyContent={"center"} gap={2} alignItems={"center"}>
          <Checkbox colorScheme="pink">Show Category and Date</Checkbox>
        </Flex>
      </Flex>
    </>

    // Columnfilter
  );
}

export default Filters;
