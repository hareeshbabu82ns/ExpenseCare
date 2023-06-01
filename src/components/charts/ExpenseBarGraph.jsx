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

function ExpenseBarGraph() {
  return (
    <>
      <BarChart width={500} height={500} data={data}>
        <CartesianGrid />
        <XAxis dataKey={"name"} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalExpense" name="Total Expense" fill="#B83280">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </>
  );
}

export default ExpenseBarGraph;
