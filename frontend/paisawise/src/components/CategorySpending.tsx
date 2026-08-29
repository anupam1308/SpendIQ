import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { Expense } from "../types/expense";

interface CategorySpendingProps {
  expenses: Expense[];
}

const COLORS = [
  "#6FAF9B",
  "#8B9DC3",
  "#D9A441",
  "#A78BBA",
  "#D98C8C",
  "#7FA7A0",
  "#A3A3A3",
];

function CategorySpending({
  expenses,
}: CategorySpendingProps) {

  // Calculate total spending for each category
  const categoryTotals = expenses.reduce<Record<string, number>>(
    (totals, expense) => {
      totals[expense.category] =
        (totals[expense.category] || 0) + expense.amount;

      return totals;
    },
    {}
  );

  // Convert object into Recharts data format
  const data = Object.entries(categoryTotals).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">

      <div className="mb-4">
        <h3 className="text-base font-medium text-gray-900">
          Spending by category
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          Where your money is going
        </p>
      </div>

      <div className="h-[280px]">

        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-gray-400">
              No expenses yet
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={2}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>
        )}

      </div>

    </div>
  );
}

export default CategorySpending;