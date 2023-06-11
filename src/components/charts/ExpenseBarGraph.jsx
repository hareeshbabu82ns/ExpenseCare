import React from "react";
import { categories as data } from "../../pages/Dashboard";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS } from "./ExpensePieChart";
import { Flex } from "@chakra-ui/react";

function ExpenseBarGraph() {
  return (
    <>
      <Flex display={{ base: "none", md: "flex" }}>
        <BarChart width={500} height={500} data={data}>
          <CartesianGrid />
          <XAxis dataKey={"name"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalExpense" name="Total Expense" fill="#B83280">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </Flex>

      <Flex display={{ base: "flex", md: "none" }}>
        <BarChart width={325} height={450} data={data}>
          <CartesianGrid />
          <XAxis dataKey={"name"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalExpense" name="Total Expense" fill="#B83280">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </Flex>
    </>
  );
}

export default ExpenseBarGraph;
