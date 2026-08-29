import { useState } from "react";
//import type { Expense } from "../types/expense";
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
  //const [category, setCategory] = useState("Food");
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
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="bg-white border border-gray-200 rounded-xl p-4">

        <div className="grid grid-cols-4 gap-3">

          <input
            type="number"
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value)
            }
            placeholder="Amount"
            min="1"
            className="px-3 py-2 border border-gray-200 rounded-lg outline-none text-sm"
          />

          <select
  value={category}
  onChange={(event) =>
    setCategory(event.target.value as ExpenseCategory)
  }
  className="px-3 py-2 border border-gray-200 rounded-lg outline-none text-sm"
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

          <input
            type="text"
            value={merchant}
            onChange={(event) =>
              setMerchant(event.target.value)
            }
            placeholder="Merchant"
            className="px-3 py-2 border border-gray-200 rounded-lg outline-none text-sm"
          />

          <input
            type="text"
            value={note}
            onChange={(event) =>
              setNote(event.target.value)
            }
            placeholder="Note"
            className="px-3 py-2 border border-gray-200 rounded-lg outline-none text-sm"
          />

        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[#6FAF9B] text-white text-sm font-medium hover:opacity-90"
          >
            Add Expense
          </button>
        </div>

      </div>
    </form>
  );
}

export default ExpenseInput;