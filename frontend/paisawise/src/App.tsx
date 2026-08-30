import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import { MobileHeader, MobileNav } from "./components/MobileNav";

import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Insights from "./pages/Insights";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

import { supabase } from "./lib/supabase";

import type { Expense } from "./types/expense";

const BASE_API_URL =
  import.meta.env.VITE_API_URL ||
  "https://spendiq-8wld.onrender.com";

const API_URL = `${BASE_API_URL.replace(
  /\/$/,
  ""
)}/api/expenses`;

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
          console.error(
            "Failed to get session:",
            error
          );
        }

        setUser(session?.user ?? null);
      } catch (error) {
        console.error(
          "Authentication check failed:",
          error
        );

        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    checkUser();

    /*
    |--------------------------------------------------------------------------
    | Listen for login/logout changes
    |--------------------------------------------------------------------------
    */

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

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

        let fetchedExpenses: Expense[] | null =
          null;

        try {
          const headers = await getAuthHeaders();

          const response = await fetch(API_URL, {
            method: "GET",
            headers,
          });

          if (response.ok) {
            const data = await response.json();
            fetchedExpenses = data.expenses;
          }
        } catch (backendErr) {
          console.warn(
            "Backend API unreachable, trying Supabase direct fetch:",
            backendErr
          );
        }

        /*
        |--------------------------------------------------------------------------
        | Direct Supabase query if backend fails
        |--------------------------------------------------------------------------
        */

        if (!fetchedExpenses) {
          const { data, error } = await supabase
            .from("expenses")
            .select("*")
            .eq("user_id", user.id)
            .order("date", {
              ascending: false,
            });

          if (error) {
            throw error;
          }

          fetchedExpenses = data || [];
        }

        setExpenses(fetchedExpenses);
      } catch (error) {
        console.error(
          "Failed to load expenses:",
          error
        );

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
      let createdExpense: Expense | null =
        null;

      try {
        const headers = await getAuthHeaders();

        const response = await fetch(API_URL, {
          method: "POST",
          headers,
          body: JSON.stringify(expense),
        });

        if (response.ok) {
          const data = await response.json();
          createdExpense = data.expense;
        }
      } catch (backendErr) {
        console.warn(
          "Backend API add error, trying Supabase direct insert:",
          backendErr
        );
      }

      /*
      |--------------------------------------------------------------------------
      | Supabase fallback
      |--------------------------------------------------------------------------
      */

      if (!createdExpense && user) {
        const newExpenseData = {
          id: `exp_${Date.now()}`,
          amount: expense.amount,
          category: expense.category,
          merchant: expense.merchant,
          note: expense.note || "",
          date:
            expense.date ||
            new Date()
              .toISOString()
              .split("T")[0],
          user_id: user.id,
        };

        const { data, error } = await supabase
          .from("expenses")
          .insert(newExpenseData)
          .select()
          .single();

        if (error) {
          throw error;
        }

        createdExpense = data;
      }

      if (createdExpense) {
        setExpenses(
          (currentExpenses) => [
            createdExpense!,
            ...currentExpenses,
          ]
        );
      }
    } catch (error) {
      console.error(
        "Failed to add expense:",
        error
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete expense
  |--------------------------------------------------------------------------
  */

  const handleDeleteExpense = async (
    id: string
  ) => {
    try {
      let success = false;

      try {
        const headers = await getAuthHeaders();

        const response = await fetch(
          `${API_URL}/${id}`,
          {
            method: "DELETE",
            headers,
          }
        );

        if (response.ok) {
          success = true;
        }
      } catch (backendErr) {
        console.warn(
          "Backend API delete error, trying Supabase direct delete:",
          backendErr
        );
      }

      /*
      |--------------------------------------------------------------------------
      | Supabase fallback
      |--------------------------------------------------------------------------
      */

      if (!success && user) {
        const { error } = await supabase
          .from("expenses")
          .delete()
          .eq("id", id)
          .eq("user_id", user.id);

        if (error) {
          throw error;
        }

        success = true;
      }

      if (success) {
        setExpenses(
          (currentExpenses) =>
            currentExpenses.filter(
              (expense) =>
                expense.id !== id
            )
        );
      }
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
      const existingExpense =
        expenses.find(
          (expense) => expense.id === id
        );

      if (!existingExpense) {
        return;
      }

      const expenseToUpdate = {
        ...existingExpense,
        ...updatedExpense,
      };

      let updatedData: Expense | null =
        null;

      try {
        const headers = await getAuthHeaders();

        const response = await fetch(
          `${API_URL}/${id}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify({
              amount:
                expenseToUpdate.amount,
              category:
                expenseToUpdate.category,
              merchant:
                expenseToUpdate.merchant,
              note:
                expenseToUpdate.note,
              date:
                expenseToUpdate.date,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          updatedData = data.expense;
        }
      } catch (backendErr) {
        console.warn(
          "Backend API edit error, trying Supabase direct update:",
          backendErr
        );
      }

      /*
      |--------------------------------------------------------------------------
      | Supabase fallback
      |--------------------------------------------------------------------------
      */

      if (!updatedData && user) {
        const { data, error } =
          await supabase
            .from("expenses")
            .update({
              amount:
                expenseToUpdate.amount,
              category:
                expenseToUpdate.category,
              merchant:
                expenseToUpdate.merchant,
              note:
                expenseToUpdate.note,
              date:
                expenseToUpdate.date,
            })
            .eq("id", id)
            .eq("user_id", user.id)
            .select()
            .maybeSingle();

        if (error) {
          throw error;
        }

        updatedData = data;
      }

      if (updatedData) {
        setExpenses(
          (currentExpenses) =>
            currentExpenses.map(
              (expense) =>
                expense.id === id
                  ? updatedData!
                  : expense
            )
        );
      }
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
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5] px-4">
        <p className="text-sm text-gray-500 text-center">
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
        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Protected application */}
        <Route
          path="*"
          element={
            user ? (
              <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f7f7f5] overflow-x-hidden">
                {/* Mobile Header */}
                <MobileHeader />

                {/* Desktop Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 min-w-0 w-full overflow-x-hidden pb-20 lg:pb-0">
                  <Routes>
                    {/* Dashboard */}
                    <Route
                      path="/"
                      element={
                        loading ? (
                          <div className="min-h-[calc(100vh-64px)] lg:min-h-screen flex items-center justify-center px-4">
                            <p className="text-sm text-gray-500 text-center">
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
                          <div className="min-h-[calc(100vh-64px)] lg:min-h-screen flex items-center justify-center px-4">
                            <p className="text-sm text-gray-500 text-center">
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
                </div>

                {/* Mobile Bottom Navigation */}
                <MobileNav />
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