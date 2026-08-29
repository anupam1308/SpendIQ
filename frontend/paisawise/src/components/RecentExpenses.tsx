import type { Expense } from "../types/expense";

interface RecentExpensesProps {
  expenses: Expense[];
}

function RecentExpenses({ expenses }: RecentExpensesProps) {
  return (
    <section className="mt-6 bg-white border border-gray-200 rounded-xl">
      
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100">
        <h3 className="text-base font-medium text-gray-900">
          Recent expenses
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          Your latest transactions
        </p>
      </div>

      <div>
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100 last:border-b-0 gap-2 sm:gap-4"
          >
            
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {expense.merchant}
              </p>

              <p className="mt-0.5 text-xs text-gray-400 truncate">
                {expense.note ? expense.note : "No note"} · <span className="font-medium text-gray-500">{expense.date}</span>
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              
              <span className="px-2 py-0.5 rounded-md bg-[#eef6f2] border border-[#dceee7] text-[11px] font-semibold text-[#245c4a]">
                {expense.category}
              </span>

              <p className="text-sm font-extrabold text-gray-900 sm:w-24 text-right">
                ₹{expense.amount.toLocaleString("en-IN")}
              </p>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default RecentExpenses;