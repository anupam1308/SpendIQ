import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Insights from "./pages/Insights";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

import { supabase } from "./lib/supabase";

import type { Expense } from "./types/expense";

const API_URL = "http://localhost:5000/api/expenses";

/*
|--------------------------------------------------------------------------
| Authentication headers
|--------------------------------------------------------------------------
*/

const getAuthHeaders = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User is not logged in");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.access_token}`,
  };
};

/*
|--------------------------------------------------------------------------
| App
|--------------------------------------------------------------------------
*/

function App() {
  /*
  |--------------------------------------------------------------------------
  | Authentication state
  |--------------------------------------------------------------------------
  */

  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | Expenses state
  |--------------------------------------------------------------------------
  */

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | Check authentication
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Failed to get session:", error);
        }

        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    checkUser();

    /*
    | Listen for login/logout changes
    */

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Load user's expenses
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!user) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    const fetchExpenses = async () => {
      try {
        setLoading(true);

        const headers = await getAuthHeaders();

        const response = await fetch(API_URL, {
          method: "GET",
          headers,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to fetch expenses"
          );
        }

        setExpenses(data.expenses || []);
      } catch (error) {
        console.error("Failed to load expenses:", error);
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [user]);

  /*
  |--------------------------------------------------------------------------
  | Add expense
  |--------------------------------------------------------------------------
  */

  const handleAddExpense = async (
    expense: Omit<Expense, "id">
  ) => {
    try {
      const headers = await getAuthHeaders();

      const response = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(expense),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to create expense"
        );
      }

      setExpenses((currentExpenses) => [
        ...currentExpenses,
        data.expense,
      ]);
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete expense
  |--------------------------------------------------------------------------
  */

  const handleDeleteExpense = async (id: string) => {
    try {
      const headers = await getAuthHeaders();

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
          headers,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete expense"
        );
      }

      setExpenses((currentExpenses) =>
        currentExpenses.filter(
          (expense) => expense.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete expense:",
        error
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Edit expense
  |--------------------------------------------------------------------------
  */

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

      const headers = await getAuthHeaders();

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",
          headers,
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
        throw new Error(
          data.error || "Failed to update expense"
        );
      }

      setExpenses((currentExpenses) =>
        currentExpenses.map((expense) =>
          expense.id === id
            ? data.expense
            : expense
        )
      );
    } catch (error) {
      console.error(
        "Failed to update expense:",
        error
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Authentication loading
  |--------------------------------------------------------------------------
  */

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5]">
        <p className="text-sm text-gray-500">
          Checking authentication...
        </p>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Application
  |--------------------------------------------------------------------------
  */

  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}

        <Route
          path="/login"
          element={
            user ? (
              <Navigate
                to="/"
                replace
              />
            ) : (
              <Login />
            )
          }
        />

        {/* Reset Password */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected application */}

        <Route
          path="*"
          element={
            user ? (
              <div className="min-h-screen flex bg-[#f7f7f5]">

                <Sidebar />

                <main className="flex-1">

                  <Routes>

                    {/* Dashboard */}

                    <Route
                      path="/"
                      element={
                        loading ? (
                          <div className="flex-1 min-h-screen flex items-center justify-center">
                            <p className="text-sm text-gray-500">
                              Loading expenses...
                            </p>
                          </div>
                        ) : (
                          <Dashboard
                            expenses={expenses}
                            onAddExpense={
                              handleAddExpense
                            }
                          />
                        )
                      }
                    />

                    {/* Expenses */}

                    <Route
                      path="/expenses"
                      element={
                        loading ? (
                          <div className="flex-1 min-h-screen flex items-center justify-center">
                            <p className="text-sm text-gray-500">
                              Loading expenses...
                            </p>
                          </div>
                        ) : (
                          <Expenses
                            expenses={expenses}
                            onDeleteExpense={
                              handleDeleteExpense
                            }
                            onEditExpense={
                              handleEditExpense
                            }
                          />
                        )
                      }
                    />

                    {/* Insights */}

                    <Route
                      path="/insights"
                      element={
                        <Insights
                          expenses={expenses}
                        />
                      }
                    />

                  </Routes>

                </main>

              </div>
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;