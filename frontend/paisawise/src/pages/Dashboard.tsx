import WeeklySpending from "../components/WeeklySpending";
import CategorySpending from "../components/CategorySpending";
import RecentExpenses from "../components/RecentExpenses";
import ExpenseInput from "../components/ExpenseInput";
import type { Expense } from "../types/expense";

interface DashboardProps {
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, "id">) => void;
}

function Dashboard({
  expenses,
  onAddExpense,
}: DashboardProps) {
  // Calculate total spending from the actual expenses
  const totalSpent = expenses.reduce(
  (total, expense) => total + expense.amount,
  0
);

const biggestExpense = expenses.reduce<Expense | null>(
  (biggest, expense) => {
    if (biggest === null || expense.amount > biggest.amount) {
      return expense;
    }

    return biggest;
  },
  null
);
const today = new Date();

// Monday = start of week
const dayOfWeek = today.getDay();
const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - daysFromMonday);
startOfWeek.setHours(0, 0, 0, 0);

const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 7);

const thisWeekExpenses = expenses.filter((expense) => {
  // Parse YYYY-MM-DD as a local date to avoid timezone issues
  const [year, month, day] = expense.date.split("-").map(Number);

  const expenseDate = new Date(year, month - 1, day);

  return (
    expenseDate >= startOfWeek &&
    expenseDate < endOfWeek
  );
});

const thisWeekSpent = thisWeekExpenses.reduce(
  (total, expense) => total + expense.amount,
  0
);

  return (
    <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8 max-w-7xl mx-auto w-full">

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Good morning
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Here's what's happening with your money.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs text-gray-400">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-semibold text-gray-700">
            ₹{totalSpent.toLocaleString("en-IN")} spent
          </p>
        </div>
      </header>


      {/* Expense Input */}
      <ExpenseInput onAddExpense={onAddExpense} />


      {/* Summary Cards */}
      <section className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

        {/* Total Spent */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Total spent
          </p>

          <p className="mt-2 sm:mt-3 text-xl sm:text-2xl font-bold text-gray-900">
            ₹{totalSpent.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            This month
          </p>
        </div>


        {/* This Week */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            This week
          </p>

          <p className="mt-2 sm:mt-3 text-xl sm:text-2xl font-bold text-gray-900">
            ₹{thisWeekSpent.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {thisWeekExpenses.length} expenses
          </p>
        </div>


        {/* Biggest Expense */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs sm:col-span-2 lg:col-span-1">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Biggest expense
          </p>

          {biggestExpense ? (
            <>
              <p className="mt-2 sm:mt-3 text-xl sm:text-2xl font-bold text-gray-900">
                ₹{biggestExpense.amount.toLocaleString("en-IN")}
              </p>

              <p className="mt-1 text-xs text-gray-400 truncate">
                {biggestExpense.merchant} · {biggestExpense.category}
              </p>
            </>
          ) : (
            <p className="mt-2 sm:mt-3 text-sm text-gray-400">
              No expenses yet
            </p>
          )}
        </div>

      </section>


      {/* Charts */}
      <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        <WeeklySpending expenses={expenses} />
        <CategorySpending expenses={expenses} />
      </section>


      {/* Recent Expenses */}
      <RecentExpenses expenses={expenses} />

    </main>
  );
}

export default Dashboard;