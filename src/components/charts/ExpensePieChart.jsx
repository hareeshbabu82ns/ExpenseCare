import React from "react";
import { categories } from "../../pages/Dashboard";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { Container } from "@chakra-ui/react";

const data = categories;
export const COLORS = [
  "#319795",
  "#3182CE",
  "#D69E2E",
  "#E53E3E",
  "#DD6B20",
  "#D53F8C",
];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ textAlign: "center" }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function ExpensePieChart() {
  return (
    <>
      <PieChart height={500} width={500}>
        <Pie
          data={data}
          cx={250}
          cy={250}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={200}
          fill="#8884d8"
          dataKey="totalExpense"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </>
  );
}

export default ExpensePieChart;
