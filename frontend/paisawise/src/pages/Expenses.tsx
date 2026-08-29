import { useState } from "react";
//import type { Expense } from "../types/expense";
import type {
  Expense,
  ExpenseCategory,
} from "../types/expense";

interface ExpensesProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
  onEditExpense: (id: string, updatedExpense: Partial<Expense>) => void;
}

function Expenses({
  expenses,
  onDeleteExpense,
  onEditExpense,
}: ExpensesProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState("");

  const startEditing = (expense: Expense) => {
    setEditingId(expense.id);
    setEditAmount(String(expense.amount));
  };

  const saveEdit = (id: string) => {
    const amount = Number(editAmount);

    if (!amount || amount <= 0) {
      return;
    }

    onEditExpense(id, {
      amount,
    });

    setEditingId(null);
    setEditAmount("");
  };

  return (
    <main className="flex-1 px-10 py-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Expenses
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          View and manage all your expenses.
        </p>
      </div>

      {/* Expense List */}
      <div className="mt-8 bg-white border border-gray-200 rounded-xl">

        {expenses.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-gray-500">
              No expenses yet.
            </p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between px-6 py-5 border-b border-gray-100 last:border-b-0"
            >

              {/* Expense information */}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {expense.merchant}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {expense.note || "No note"} · {expense.date}
                </p>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-6">

                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                  {expense.category}
                </span>

                {editingId === expense.id ? (
                  <div className="flex items-center gap-2">

                    <input
                      type="number"
                      value={editAmount}
                      onChange={(event) =>
                        setEditAmount(event.target.value)
                      }
                      className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => saveEdit(expense.id)}
                      className="text-sm text-[#245c4a] hover:underline"
                    >
                      Save
                    </button>

                  </div>
                ) : (
                  <>
                    <span className="text-sm font-medium text-gray-900 w-20 text-right">
                      ₹{expense.amount.toLocaleString("en-IN")}
                    </span>

                    <button
                      type="button"
                      onClick={() => startEditing(expense)}
                      className="text-sm text-gray-400 hover:text-gray-700"
                    >
                      Edit
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => onDeleteExpense(expense.id)}
                  className="text-sm text-gray-400 hover:text-red-500"
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </main>
  );
}

export default Expenses;