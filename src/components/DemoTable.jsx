import React from "react";
import data from "../assets/MOCK_DATA.json";
import {
  Checkbox,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BoxSelect, BoxSelectIcon } from "lucide-react";

function DemoTable() {
  return (
    <TableContainer w={"90%"} mx={"auto"}>
      <Table>
        <Thead>
          <Tr>
            <Th>EXPENSE NAME</Th>
            <Th>AMOUNT</Th>
            <Th display={{ base: "none", md: "table-cell" }}>CATEGORY</Th>
            <Th display={{ base: "none", md: "table-cell" }}>DATE</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.id}>
              <Td>{row.expenseName}</Td>
              <Td>{row.amount}</Td>
              <Td display={{ base: "none", md: "table-cell" }}>
                {row.category}
              </Td>
              <Td display={{ base: "none", md: "table-cell" }}>{row.date}</Td>
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
