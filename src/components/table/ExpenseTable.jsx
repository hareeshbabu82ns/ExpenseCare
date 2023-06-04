import React, { useMemo, useState } from "react";
import data from "../../assets/MOCK_DATA.json";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Table, Tbody, Td, Th, Thead, Tr, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { createColumnHelper } from "@tanstack/react-table";

function ExpenseTable() {
  const columns = useMemo(() => [
    {
      id: 1,
      Header: "id",
      accessorKey: "id",
    },
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
  ]);

  const [sorting, setSorting] = useState();

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  <div
                    {...{
                      style: { cursor: "pointer" },
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      { asc: " 🔼", desc: " 🔽" }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
                  </div>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default ExpenseTable;
