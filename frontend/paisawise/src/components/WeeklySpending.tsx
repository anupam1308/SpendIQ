import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { Expense } from "../types/expense";

interface WeeklySpendingProps {
  expenses: Expense[];
}

function WeeklySpending({
  expenses,
}: WeeklySpendingProps) {

  // Get current date
  const today = new Date();

  // Create data for the last 4 weeks
  const data = [1, 2, 3, 4].map((week) => {
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - (4 - week) * 7);

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);

    const amount = expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);

        return (
          expenseDate >= startDate &&
          expenseDate <= endDate
        );
      })
      .reduce(
        (total, expense) => total + expense.amount,
        0
      );

    return {
      week: `Week ${week}`,
      amount,
    };
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">

      <div className="mb-6">
        <h3 className="text-base font-medium text-gray-900">
          Weekly spending
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          Your spending over the past month
        </p>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Bar
              dataKey="amount"
              fill="#6FAF9B"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default WeeklySpending;