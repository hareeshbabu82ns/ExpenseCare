import React from "react";
import data from "../../assets/MOCK_DATA.json";
import {
  Checkbox,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { MoreVertical } from "lucide-react";
import { useSelector } from "react-redux";

function DropdownActions({ expenseId, expenseName }) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<MoreVertical />}
        bgColor={"inherit"}
        _hover={{ bgColor: "lightgray" }}
        _focus={{ bgColor: "lightgray" }}
        _active={{ bgColor: "lightgray" }}
      />
      <MenuList bgColor={"lightgray"}>
        <MenuItem bgColor={"lightgray"} _hover={{ bgColor: "teal.600" }}>
          Edit
        </MenuItem>
        <MenuItem bgColor={"lightgray"} _hover={{ bgColor: "teal.600" }}>
          Move
        </MenuItem>
        <MenuItem bgColor={"lightgray"} _hover={{ bgColor: "teal.600" }}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function DemoTable() {
  const data = useSelector((state) => state.data.expenses);
  console.log(data);

  return (
    <TableContainer w={"90%"} mx={"auto"}>
      <Table>
        <Thead>
          <Tr>
            {/* <Th>
              <Checkbox>Select</Checkbox>
            </Th> */}
            <Th>EXPENSE NAME</Th>
            <Th>AMOUNT (Rs.)</Th>
            <Th display={{ base: "none", md: "table-cell" }}>CATEGORY</Th>
            <Th display={{ base: "none", md: "table-cell" }}>DATE</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((expense) => (
            <Tr key={expense.$id}>
              {/* <Td>
                <Checkbox colorScheme="teal" />
              </Td> */}
              <Td>{expense.name}</Td>
              <Td>{expense.amount}</Td>
              <Td display={{ base: "none", md: "table-cell" }}>
                {expense.category.name}
              </Td>
              <Td display={{ base: "none", md: "table-cell" }}>
                {expense.date}
              </Td>
              <Td>
                <DropdownActions
                  expenseId={expense.$id}
                  expenseName={expense.name}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
        {/* <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot> */}
      </Table>
    </TableContainer>
  );
}

export default DemoTable;
