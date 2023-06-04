import React, { useMemo, useState } from "react";
import data from "../../assets/MOCK_DATA.json";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  EditIcon,
  MoreVertical,
  MoreVerticalIcon,
  MoveIcon,
  OptionIcon,
} from "lucide-react";
import { DeleteIcon } from "@chakra-ui/icons";
import { MoreHorizontalIcon } from "lucide-react";
import DropDownExpenseTable from "./DropDownExpenseTable";

function DataTable() {
  const columns = [
    // {
    //   id: 1,
    //   Header: "id",
    //   accessorKey: "id",
    // },
    {
      id: 2,
      Header: "Expense Name",
      accessorKey: "expenseName",
    },
    {
      id: 3,
      Header: "Category",
      accessorKey: "category",
    },
    {
      id: 4,
      Header: "Amount",
      accessorKey: "amount",
    },
    {
      id: 5,
      Header: "Date",
      accessorKey: "date",
    },
    // {
    //   id: "actions",
    //   cell: <DropDownExpenseTable />,
    // },
  ];

  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { columnVisibility },
  });

  return (
    <div>
      <Flex justifyContent={"flex-end"}>
        <Menu>
          <MenuButton
            as={Button}
            aria-label="Options"
            w={"18rem"}
            bgColor={"lightgray"}
            _hover={{ bgColor: "primary" }}
            p={2}
            rightIcon={<ChevronDownIcon />}
          >
            Columns
          </MenuButton>
          <MenuList
            as={CheckboxGroup}
            display={"flex"}
            flexDir={"column"}
            bgColor={"lightgray"}
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <MenuItem
                  as={Checkbox}
                  key={column.id}
                  bgColor={"lightgray"}
                  checked={column.getIsVisible()}
                  onChange={(e) => column.toggleVisibility(!!e.target.value)}
                >
                  {column.columnDef.columns}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
      </Flex>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>

        <Tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Tr key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={columns.length}>No results.</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      <Flex justifyContent={"center"} align={"center"} gap={10} mt={5}>
        <Button
          colorScheme="blue"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </Flex>
    </div>
  );
}

export default DataTable;
