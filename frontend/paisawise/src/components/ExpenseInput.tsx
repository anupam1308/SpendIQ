import { useState } from "react";
import type {
  Expense,
  ExpenseCategory,
} from "../types/expense";

interface ExpenseInputProps {
  onAddExpense: (
    expense: Omit<Expense, "id">
  ) => void;
}

function ExpenseInput({
  onAddExpense,
}: ExpenseInputProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] =
    useState<ExpenseCategory>("Food");
  const [merchant, setMerchant] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (
      !numericAmount ||
      numericAmount <= 0 ||
      !merchant.trim()
    ) {
      return;
    }

    onAddExpense({
      amount: numericAmount,
      category,
      merchant: merchant.trim(),
      note: note.trim(),
      date: new Date().toISOString().split("T")[0],
    });

    setAmount("");
    setMerchant("");
    setNote("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 sm:mt-8 w-full min-w-0"
    >
      <div className="w-full min-w-0 bg-white border border-gray-200 rounded-xl p-3 sm:p-4">
        {/* Input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full min-w-0">
          {/* Amount */}
          <input
            type="number"
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value)
            }
            placeholder="Amount"
            min="1"
            inputMode="decimal"
            className="w-full min-w-0 px-3 py-2.5 border border-gray-200 rounded-lg outline-none text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#6FAF9B] focus:ring-2 focus:ring-[#6FAF9B]/20"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(event) =>
              setCategory(
                event.target.value as ExpenseCategory
              )
            }
            className="w-full min-w-0 px-3 py-2.5 border border-gray-200 rounded-lg outline-none text-sm text-gray-900 bg-white focus:border-[#6FAF9B] focus:ring-2 focus:ring-[#6FAF9B]/20"
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Entertainment">
              Entertainment
            </option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>

          {/* Merchant */}
          <input
            type="text"
            value={merchant}
            onChange={(event) =>
              setMerchant(event.target.value)
            }
            placeholder="Merchant"
            className="w-full min-w-0 px-3 py-2.5 border border-gray-200 rounded-lg outline-none text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#6FAF9B] focus:ring-2 focus:ring-[#6FAF9B]/20"
          />

          {/* Note */}
          <input
            type="text"
            value={note}
            onChange={(event) =>
              setNote(event.target.value)
            }
            placeholder="Note"
            className="w-full min-w-0 px-3 py-2.5 border border-gray-200 rounded-lg outline-none text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#6FAF9B] focus:ring-2 focus:ring-[#6FAF9B]/20"
          />
        </div>

        {/* Add Expense button */}
        <div className="mt-3 flex justify-stretch sm:justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#6FAF9B] text-white text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Add Expense
          </button>
        </div>
      </div>
    </form>
  );
}

export default ExpenseInput;