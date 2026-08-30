import type { Expense } from "../types/expense";

interface RecentExpensesProps {
  expenses: Expense[];
}

function RecentExpenses({ expenses }: RecentExpensesProps) {
  return (
    <section className="mt-5 sm:mt-6 w-full min-w-0 bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100">
        <h3 className="text-base font-medium text-gray-900">
          Recent expenses
        </h3>

        <p className="mt-1 text-xs sm:text-sm text-gray-400">
          Your latest transactions
        </p>
      </div>

      {/* Expenses */}
      <div className="w-full min-w-0">
        {expenses.length === 0 ? (
          <div className="px-4 sm:px-6 py-8 text-center">
            <p className="text-sm text-gray-400">
              No expenses yet
            </p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              className="w-full min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100 last:border-b-0 gap-2.5 sm:gap-4"
            >
              {/* Expense information */}
              <div className="min-w-0 flex-1">
                <p
                  className="text-sm font-semibold text-gray-900 truncate"
                  title={expense.merchant}
                >
                  {expense.merchant}
                </p>

                <p className="mt-0.5 text-xs text-gray-400 truncate">
                  {expense.note || "No note"}{" "}
                  ·{" "}
                  <span className="font-medium text-gray-500">
                    {expense.date}
                  </span>
                </p>
              </div>

              {/* Category + Amount */}
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 shrink-0">
                <span
                  className="max-w-[55%] sm:max-w-none px-2 py-0.5 rounded-md bg-[#eef6f2] border border-[#dceee7] text-[11px] font-semibold text-[#245c4a] truncate"
                  title={expense.category}
                >
                  {expense.category}
                </span>

                <p className="text-sm font-extrabold text-gray-900 text-right whitespace-nowrap">
                  ₹{expense.amount.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default RecentExpenses;