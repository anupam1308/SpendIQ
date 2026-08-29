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

const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - today.getDay());

const thisWeekExpenses = expenses.filter((expense) => {
  const expenseDate = new Date(expense.date);
  return expenseDate >= startOfWeek;
});

const thisWeekSpent = thisWeekExpenses.reduce(
  (total, expense) => total + expense.amount,
  0
);

  return (
    <main className="flex-1 px-10 py-8">

      {/* Header */}
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Good morning
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening with your money.
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400">
            August 2026
          </p>

          <p className="mt-1 text-sm font-medium text-gray-700">
            ₹{totalSpent.toLocaleString("en-IN")} spent
          </p>
        </div>
      </header>


      {/* Expense Input */}
      <ExpenseInput onAddExpense={onAddExpense} />


      {/* Summary Cards */}
      <section className="mt-8 grid grid-cols-3 gap-5">

        {/* Total Spent */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Total spent
          </p>

          <p className="mt-3 text-2xl font-semibold text-gray-900">
            ₹{totalSpent.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            This month
          </p>
        </div>


        {/* This Week */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            This week
          </p>

          <p className="mt-3 text-2xl font-semibold text-gray-900">
  ₹{thisWeekSpent.toLocaleString("en-IN")}
</p>

<p className="mt-1 text-xs text-gray-400">
  {thisWeekExpenses.length} expenses
</p>
        </div>


        {/* Biggest Expense */}
<div className="bg-white border border-gray-200 rounded-xl p-5">
  <p className="text-sm text-gray-500">
    Biggest expense
  </p>

  {biggestExpense ? (
    <>
      <p className="mt-3 text-2xl font-semibold text-gray-900">
        ₹{biggestExpense.amount.toLocaleString("en-IN")}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {biggestExpense.merchant} · {biggestExpense.category}
      </p>
    </>
  ) : (
    <p className="mt-3 text-sm text-gray-400">
      No expenses yet
    </p>
  )}
</div>

    

      </section>


      {/* Charts */}
      <section className="mt-6 grid grid-cols-2 gap-5">
  <WeeklySpending expenses={expenses} />
  <CategorySpending expenses={expenses} />
</section>


      {/* Recent Expenses */}
      <RecentExpenses expenses={expenses} />

    </main>
  );
}

export default Dashboard;