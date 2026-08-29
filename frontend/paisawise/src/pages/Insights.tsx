import type { Expense } from "../types/expense";

interface InsightsProps {
  expenses: Expense[];
}

function Insights({ expenses }: InsightsProps) {

  // Calculate total spending for each category
  const categoryTotals = expenses.reduce<Record<string, number>>(
    (totals, expense) => {
      totals[expense.category] =
        (totals[expense.category] || 0) + expense.amount;

      return totals;
    },
    {}
  );

  // Sort categories from highest spending to lowest
  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <main className="flex-1 px-10 py-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          AI Insights
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Understand your spending and find ways to save.
        </p>
      </div>


      {/* Month */}
      <div className="mt-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">
            August 2026
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Based on your monthly expenses
          </p>
        </div>

        <button
          className="px-4 py-2 rounded-lg bg-[#245c4a] text-white text-sm font-medium hover:opacity-90"
        >
          Generate insights
        </button>
      </div>


      {/* Money Leaks */}
      <section className="mt-6 bg-white border border-gray-200 rounded-xl p-6">

        <h3 className="text-base font-medium text-gray-900">
          Top money leaks
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          Categories where you are spending the most.
        </p>

        <div className="mt-6 space-y-4">

          {topCategories.length === 0 ? (
            <p className="text-sm text-gray-400">
              No expenses yet.
            </p>
          ) : (
            topCategories.map(([category, amount]) => (
              <div
                key={category}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-gray-600">
                  {category}
                </span>

                <span className="text-sm font-medium text-gray-900">
                  ₹{amount.toLocaleString("en-IN")}
                </span>
              </div>
            ))
          )}

        </div>
      </section>


      {/* Saving Tips */}
      <section className="mt-6 bg-white border border-gray-200 rounded-xl p-6">

        <h3 className="text-base font-medium text-gray-900">
          Saving tips
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          Suggestions based on your spending habits.
        </p>

        <div className="mt-6 space-y-4">

          <div className="flex gap-3">
            <span className="text-[#245c4a]">
              01
            </span>

            <p className="text-sm text-gray-600">
              Reduce food delivery by preparing a few meals
              at home each week.
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-[#245c4a]">
              02
            </span>

            <p className="text-sm text-gray-600">
              Use public transport for short trips when
              possible.
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-[#245c4a]">
              03
            </span>

            <p className="text-sm text-gray-600">
              Set a monthly entertainment budget before
              spending.
            </p>
          </div>

        </div>
      </section>


      {/* Habit */}
      <section className="mt-6 bg-[#eef6f2] border border-[#dceee7] rounded-xl p-6">

        <p className="text-xs font-medium text-[#245c4a] uppercase tracking-wide">
          Habit to change
        </p>

        <p className="mt-3 text-lg font-medium text-gray-900">
          Avoid unnecessary late-night food orders.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Small changes repeated consistently can make a
          significant difference to your monthly spending.
        </p>

      </section>

    </main>
  );
}

export default Insights;