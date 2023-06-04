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

function DropdownActions({ expenseId, expenseName }) {
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<MoreVertical />} bgColor={"inherit"} />
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
  return (
    <TableContainer w={"90%"} mx={"auto"}>
      <Table>
        <Thead>
          <Tr>
            <Th>
              <Checkbox>Select</Checkbox>
            </Th>
            <Th>EXPENSE NAME</Th>
            <Th>AMOUNT</Th>
            <Th display={{ base: "none", md: "table-cell" }}>CATEGORY</Th>
            <Th display={{ base: "none", md: "table-cell" }}>DATE</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.id}>
              <Td>
                <Checkbox colorScheme="teal" />
              </Td>
              <Td>{row.expenseName}</Td>
              <Td>{row.amount}</Td>
              <Td display={{ base: "none", md: "table-cell" }}>
                {row.category}
              </Td>
              <Td display={{ base: "none", md: "table-cell" }}>{row.date}</Td>
              <Td>
                <DropdownActions
                  expenseId={row.id}
                  expenseName={row.expenseName}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}

export default DemoTable;
