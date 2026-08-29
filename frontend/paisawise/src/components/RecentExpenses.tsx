import type { Expense } from "../types/expense";

interface RecentExpensesProps {
  expenses: Expense[];
}

function RecentExpenses({ expenses }: RecentExpensesProps) {
  return (
    <section className="mt-6 bg-white border border-gray-200 rounded-xl">
      
      <div className="px-6 py-5 border-b border-gray-100">
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
            className="flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-b-0"
          >
            
            <div>
              <p className="text-sm font-medium text-gray-900">
                {expense.merchant}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {expense.note}
              </p>
            </div>

            <div className="flex items-center gap-4">
              
              <span className="px-2.5 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                {expense.category}
              </span>

              <p className="text-sm font-medium text-gray-900 w-20 text-right">
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