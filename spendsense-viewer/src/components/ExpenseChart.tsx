import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import type { Expense } from "../types/Expense";

interface Props {
  expenses: Expense[];
}

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f97316",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
];

function ExpenseChart({ expenses }: Props) {
  const categoryMap: Record<string, number> = {};

  expenses.forEach((expense) => {
    categoryMap[expense.category] =
      (categoryMap[expense.category] || 0) +
      expense.amount;
  });

  const total = Object.values(categoryMap).reduce(
    (sum, value) => sum + value,
    0
  );

  const chartData = Object.keys(categoryMap).map((category) => ({
    category,
    amount: categoryMap[category],
    percentage:
      total === 0
        ? 0
        : Math.round((categoryMap[category] / total) * 100),
  }));

  return (
    <div className="chart-container">

      {/* BAR CHART */}

      <div className="chart-card">

        <h2>📊 Category Spending</h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
  dataKey="amount"
  fill="#3b82f6"
  radius={[8, 8, 0, 0]}
  animationDuration={1200}
/>

          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* PIE CHART */}

      <div className="chart-card">

        <h2>🥧 Expense Distribution</h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
         <PieChart
  margin={{
    top: 20,
    right: 30,
    left: 70,
    bottom: 20,
  }}
>

           <Pie
  data={chartData}
  dataKey="amount"
  nameKey="category"
  cx="58%"
  cy="50%"
  outerRadius={120}
  animationDuration={1200}
  label={({ name, percent }) =>
    `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
  }
>
  {chartData.map((entry, index) => (
    <Cell
      key={entry.category}
      fill={COLORS[index % COLORS.length]}
    />
  ))}
</Pie>

            <Tooltip
  formatter={(value) => [
    `₹${Number(value).toLocaleString()}`,
    "Amount",
  ]}
/>

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ExpenseChart;