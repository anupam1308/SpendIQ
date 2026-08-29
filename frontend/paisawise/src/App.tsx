import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Insights from "./pages/Insights";

import type { Expense } from "./types/expense";

const API_URL = "http://localhost:5000/api/expenses";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Load expenses from backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }

        const data = await response.json();

        setExpenses(data.expenses);
      } catch (error) {
        console.error("Failed to load expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Add expense
  const handleAddExpense = async (
    expense: Omit<Expense, "id">
  ) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create expense");
      }

      setExpenses((currentExpenses) => [
        ...currentExpenses,
        data.expense,
      ]);
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  // Delete expense
  const handleDeleteExpense = async (id: string) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete expense");
      }

      setExpenses((currentExpenses) =>
        currentExpenses.filter(
          (expense) => expense.id !== id
        )
      );
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  // Edit expense
  const handleEditExpense = async (
    id: string,
    updatedExpense: Partial<Expense>
  ) => {
    try {
      const existingExpense = expenses.find(
        (expense) => expense.id === id
      );

      if (!existingExpense) {
        return;
      }

      const expenseToUpdate = {
        ...existingExpense,
        ...updatedExpense,
      };

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: expenseToUpdate.amount,
            category: expenseToUpdate.category,
            merchant: expenseToUpdate.merchant,
            note: expenseToUpdate.note,
            date: expenseToUpdate.date,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update expense");
      }

      setExpenses((currentExpenses) =>
        currentExpenses.map((expense) =>
          expense.id === id
            ? data.expense
            : expense
        )
      );
    } catch (error) {
      console.error("Failed to update expense:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading expenses...
        </p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex bg-[#f7f7f5]">

        <Sidebar />

        <Routes>

          <Route
            path="/"
            element={
              <Dashboard
                expenses={expenses}
                onAddExpense={handleAddExpense}
              />
            }
          />

          <Route
            path="/expenses"
            element={
              <Expenses
                expenses={expenses}
                onDeleteExpense={handleDeleteExpense}
                onEditExpense={handleEditExpense}
              />
            }
          />

          <Route
  path="/insights"
  element={<Insights expenses={expenses} />}
/>

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;