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

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


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


      // Call protected backend API
      const response = await fetch(
        "http://localhost:5000/api/insights",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              `Bearer ${session.access_token}`,
          },
        }
      );


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to generate insights"
        );
      }


      setInsights(data.insights);

    } catch (error) {

      console.error(
        "Insights error:",
        error
      );


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
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Based on your actual expenses
          </p>

        </div>


        <button
          type="button"
          onClick={generateInsights}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-[#245c4a] text-white text-sm font-medium hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading
            ? "Generating..."
            : "Generate insights"}
        </button>

      </div>


      {/* Error */}

      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">

          <p className="text-sm text-red-600">
            {error}
          </p>

        </div>
      )}


      {/* AI Summary */}

      {insights && (
        <section className="mt-6 bg-[#eef6f2] border border-[#dceee7] rounded-xl p-6">

          <p className="text-xs font-medium text-[#245c4a] uppercase tracking-wide">
            AI Summary
          </p>

          <p className="mt-3 text-base text-gray-700">
            {insights.summary}
          </p>

        </section>
      )}


      {/* Money Leaks */}

      <section className="mt-6 bg-white border border-gray-200 rounded-xl p-6">

        <h3 className="text-base font-medium text-gray-900">
          Top money leaks
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          Categories where you are spending the most.
        </p>


        <div className="mt-6 space-y-5">

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

                <div className="flex items-center justify-between">

                  <span className="text-sm font-medium text-gray-700">
                    {item.category}
                  </span>

                  <span className="text-sm font-medium text-gray-900">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </span>

                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {item.insight}
                </p>

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
          Suggestions based on your actual spending.
        </p>


        <div className="mt-6 space-y-4">

          {!insights ? (

            <p className="text-sm text-gray-400">
              AI-generated saving suggestions will appear
              here.
            </p>

          ) : (

            insights.savingTips.map(
              (tip, index) => (

                <div
                  key={index}
                  className="flex gap-3"
                >

                  <span className="text-[#245c4a]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm text-gray-600">
                    {tip}
                  </p>

                </div>

              )
            )

          )}

        </div>

      </section>


      {/* Habit */}

      {insights && (

        <section className="mt-6 bg-[#eef6f2] border border-[#dceee7] rounded-xl p-6">

          <p className="text-xs font-medium text-[#245c4a] uppercase tracking-wide">
            Habit to change
          </p>

          <p className="mt-3 text-lg font-medium text-gray-900">
            {insights.habitToChange}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            This recommendation is generated from your
            current expense patterns.
          </p>

        </section>

      )}

    </main>
  );
}

export default Insights;