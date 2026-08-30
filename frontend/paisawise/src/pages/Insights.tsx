import { useState } from "react";
import type { Expense } from "../types/expense";
import { supabase } from "../lib/supabase";

interface InsightsProps {
  expenses: Expense[];
}

interface MoneyLeak {
  category: string;
  amount: number;
  insight: string;
}

interface AIInsights {
  summary: string;
  topMoneyLeaks: MoneyLeak[];
  savingTips: string[];
  habitToChange: string;
}

function Insights({ expenses }: InsightsProps) {
  const [insights, setInsights] =
    useState<AIInsights | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------------------------------------------------
  // Generate AI insights
  // ---------------------------------------------------------
  const generateInsights = async () => {
    if (expenses.length === 0) {
      setError(
        "Add some expenses before generating insights."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Get logged-in user's session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw new Error(
          "Failed to get authentication session"
        );
      }

      if (!session) {
        throw new Error(
          "You must be logged in to generate insights"
        );
      }

      const baseUrl =
        import.meta.env.VITE_API_URL ||
        "https://spendiq-8wld.onrender.com";

      const insightsUrl = `${baseUrl.replace(
        /\/$/,
        ""
      )}/api/insights`;

      const response = await fetch(insightsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to generate insights"
        );
      }

      setInsights(data.insights);
    } catch (error) {
      console.error("Insights error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to generate insights"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 min-w-0 w-full max-w-7xl mx-auto overflow-x-hidden px-3 sm:px-5 lg:px-8 py-5 sm:py-6 lg:py-8">
      {/* Header */}
      <div className="min-w-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          AI Insights
        </h2>

        <p className="mt-1 text-xs sm:text-sm text-gray-500">
          Understand your spending and find ways to save.
        </p>
      </div>

      {/* Month & Action */}
      <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-700">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="mt-0.5 text-xs text-gray-400">
            Based on your actual expenses
          </p>
        </div>

        <button
          type="button"
          onClick={generateInsights}
          disabled={loading}
          className="w-full sm:w-auto shrink-0 px-4 py-2.5 rounded-xl bg-[#245c4a] text-white text-xs sm:text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-xs"
        >
          {loading
            ? "Generating..."
            : "Generate insights"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-5 sm:mt-6 w-full min-w-0 bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-red-600 break-words">
            {error}
          </p>
        </div>
      )}

      {/* AI Summary */}
      {insights && (
        <section className="mt-5 sm:mt-6 w-full min-w-0 bg-[#eef6f2] border border-[#dceee7] rounded-xl p-4 sm:p-6">
          <p className="text-xs font-medium text-[#245c4a] uppercase tracking-wide">
            AI Summary
          </p>

          <p className="mt-3 text-sm sm:text-base leading-6 text-gray-700 break-words">
            {insights.summary}
          </p>
        </section>
      )}

      {/* Money Leaks */}
      <section className="mt-5 sm:mt-6 w-full min-w-0 bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
        <h3 className="text-base font-medium text-gray-900">
          Top money leaks
        </h3>

        <p className="mt-1 text-xs sm:text-sm text-gray-400">
          Categories where you are spending the most.
        </p>

        <div className="mt-5 sm:mt-6 space-y-5">
          {!insights ? (
            <p className="text-sm text-gray-400">
              Click "Generate insights" to analyze your
              spending.
            </p>
          ) : insights.topMoneyLeaks.length === 0 ? (
            <p className="text-sm text-gray-400">
              Not enough data to identify money leaks.
            </p>
          ) : (
            insights.topMoneyLeaks.map((item) => (
              <div
                key={item.category}
                className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="min-w-0 text-sm font-medium text-gray-700 break-words">
                    {item.category}
                  </span>

                  <span className="shrink-0 text-sm font-medium text-gray-900 whitespace-nowrap">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </span>
                </div>

                <p className="mt-2 text-xs sm:text-sm leading-5 text-gray-500 break-words">
                  {item.insight}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Saving Tips */}
      <section className="mt-5 sm:mt-6 w-full min-w-0 bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
        <h3 className="text-base font-medium text-gray-900">
          Saving tips
        </h3>

        <p className="mt-1 text-xs sm:text-sm text-gray-400">
          Suggestions based on your actual spending.
        </p>

        <div className="mt-5 sm:mt-6 space-y-4">
          {!insights ? (
            <p className="text-sm text-gray-400">
              AI-generated saving suggestions will appear
              here.
            </p>
          ) : (
            insights.savingTips.map((tip, index) => (
              <div
                key={index}
                className="flex items-start gap-3 min-w-0"
              >
                <span className="shrink-0 text-xs sm:text-sm font-semibold text-[#245c4a] pt-0.5">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="min-w-0 text-xs sm:text-sm leading-5 text-gray-600 break-words">
                  {tip}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Habit */}
      {insights && (
        <section className="mt-5 sm:mt-6 w-full min-w-0 bg-[#eef6f2] border border-[#dceee7] rounded-xl p-4 sm:p-6">
          <p className="text-xs font-medium text-[#245c4a] uppercase tracking-wide">
            Habit to change
          </p>

          <p className="mt-3 text-base sm:text-lg font-medium leading-6 sm:leading-7 text-gray-900 break-words">
            {insights.habitToChange}
          </p>

          <p className="mt-2 text-xs sm:text-sm leading-5 text-gray-500">
            This recommendation is generated from your
            current expense patterns.
          </p>
        </section>
      )}
    </main>
  );
}

export default Insights;