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

function parseLocalDate(dateStr: string): Date {
  if (!dateStr) return new Date(0);
  const [year, month, day] = dateStr.split("-").map(Number);
  if (!year || !month || !day) return new Date(dateStr);
  return new Date(year, month - 1, day);
}

function WeeklySpending({ expenses }: WeeklySpendingProps) {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  // Create data for the last 4 weeks
  const data = [1, 2, 3, 4].map((week) => {
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - (4 - week) * 7);

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    const amount = expenses
      .filter((expense) => {
        const expenseDate = parseLocalDate(expense.date);
        return expenseDate >= startDate && expenseDate <= endDate;
      })
      .reduce((total, expense) => total + expense.amount, 0);

    return {
      week: `Week ${week}`,
      amount,
    };
  });

  const hasSpending = data.some((d) => d.amount > 0);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-xs">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900">
          Weekly spending
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          Your spending over the past month
        </p>
      </div>

      <div className="h-[280px]">
        {!hasSpending && expenses.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-xs text-gray-400 font-medium">No expenses yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />

              <Tooltip
                formatter={(value: any) => [`₹${Number(value || 0).toLocaleString("en-IN")}`, "Amount"]}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e2efe8",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              />

              <Bar
                dataKey="amount"
                fill="#245c4a"
                radius={[6, 6, 0, 0]}
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default WeeklySpending;