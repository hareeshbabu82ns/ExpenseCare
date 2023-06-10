import React, { useState } from "react";
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
import EditExpenseButton from "./EditExpenseButton";

function DropdownActions({ expense }) {
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
        <EditExpenseButton expense={expense} />

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

  const [expenses, setExpenses] = useState(data);

  console.log(data);

  return (
    <TableContainer
      w={"90%"}
      mx={"auto"}
      bgColor={"lightgray"}
      p={"2rem"}
      rounded={"lg"}
      mb={"2rem"}
    >
      <Table>
        <Thead>
          <Tr>
            {/* <Th>
              <Checkbox>Select</Checkbox>
            </Th> */}
            <Th textColor={"blue.500"}>EXPENSE NAME</Th>
            <Th textColor={"blue.500"}>AMOUNT (Rs.)</Th>
            <Th
              textColor={"blue.500"}
              display={{ base: "none", md: "table-cell" }}
            >
              CATEGORY
            </Th>
            <Th
              textColor={"blue.500"}
              display={{ base: "none", md: "table-cell" }}
            >
              DATE
            </Th>
            <Th textColor={"blue.500"}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {expenses.map((expense) => (
            <Tr key={expense.$id} _hover={{ bgColor: "dark" }}>
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
                <DropdownActions expense={expense} />
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
