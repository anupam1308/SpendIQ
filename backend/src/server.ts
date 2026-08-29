import express, { Response } from "express";
import cors from "cors";

import { supabase } from "./supabase";
import { generateExpenseInsights } from "./ai";
import { requireAuth, AuthRequest } from "./auth";

const app = express();


// ---------------------------------------------------------
// Middleware
// ---------------------------------------------------------

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
  })
);

app.use(express.json());

const PORT = 5000;


// ---------------------------------------------------------
// Types
// ---------------------------------------------------------

interface Expense {
  id: string;
  amount: number;
  category: string;
  merchant: string;
  note: string;
  date: string;
  user_id: string;
}


// ---------------------------------------------------------
// Allowed categories
// ---------------------------------------------------------

const allowedCategories = [
  "Food",
  "Travel",
  "Education",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
];


// ---------------------------------------------------------
// Public route
// ---------------------------------------------------------

app.get("/", (_req, res) => {
  res.json({
    message: "SpendIQ backend is running!",
  });
});


// ---------------------------------------------------------
// Protected Expense Routes
// ---------------------------------------------------------


// GET user's expenses
app.get(
  "/api/expenses",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.id;

      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error);

        return res.status(500).json({
          error: "Failed to fetch expenses",
        });
      }

      return res.status(200).json({
        expenses: data,
      });
    } catch (error) {
      console.error("Fetch expenses error:", error);

      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }
);


// POST create expense
app.post(
  "/api/expenses",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.id;

      const {
        amount,
        category,
        merchant,
        note,
        date,
      } = req.body;


      // Validate amount
      if (
        typeof amount !== "number" ||
        amount <= 0
      ) {
        return res.status(400).json({
          error: "Amount must be a positive number",
        });
      }


      // Validate category
      if (
        typeof category !== "string" ||
        !allowedCategories.includes(category)
      ) {
        return res.status(400).json({
          error: "Invalid expense category",
        });
      }


      // Validate merchant
      if (
        typeof merchant !== "string" ||
        !merchant.trim()
      ) {
        return res.status(400).json({
          error: "Merchant is required",
        });
      }


      // Create expense
      const newExpense: Expense = {
        id: `exp_${Date.now()}`,

        amount,

        category,

        merchant: merchant.trim(),

        note:
          typeof note === "string"
            ? note.trim()
            : "",

        date:
          typeof date === "string" && date
            ? date
            : new Date()
                .toISOString()
                .split("T")[0],

        // IMPORTANT:
        // User ID comes from authenticated user,
        // NOT from frontend request body.
        user_id: userId,
      };


      // Insert into Supabase
      const { data, error } = await supabase
        .from("expenses")
        .insert(newExpense)
        .select()
        .single();


      if (error) {
        console.error(
          "Supabase insert error:",
          error
        );

        return res.status(500).json({
          error: "Failed to create expense",
        });
      }


      return res.status(201).json({
        message: "Expense created successfully",
        expense: data,
      });

    } catch (error) {
      console.error(
        "Create expense error:",
        error
      );

      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }
);


// PUT update expense
app.put(
  "/api/expenses/:id",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.id;

      const { id } = req.params;

      const {
        amount,
        category,
        merchant,
        note,
        date,
      } = req.body;


      // Validate amount
      if (
        typeof amount !== "number" ||
        amount <= 0
      ) {
        return res.status(400).json({
          error: "Amount must be a positive number",
        });
      }


      // Validate category
      if (
        typeof category !== "string" ||
        !allowedCategories.includes(category)
      ) {
        return res.status(400).json({
          error: "Invalid expense category",
        });
      }


      // Validate merchant
      if (
        typeof merchant !== "string" ||
        !merchant.trim()
      ) {
        return res.status(400).json({
          error: "Merchant is required",
        });
      }


      // Update only if expense belongs
      // to the authenticated user
      const { data, error } = await supabase
        .from("expenses")
        .update({
          amount,

          category,

          merchant: merchant.trim(),

          note:
            typeof note === "string"
              ? note.trim()
              : "",

          date:
            typeof date === "string" && date
              ? date
              : new Date()
                  .toISOString()
                  .split("T")[0],
        })
        .eq("id", id)
        .eq("user_id", userId)
        .select()
        .maybeSingle();


      if (error) {
        console.error(
          "Supabase update error:",
          error
        );

        return res.status(500).json({
          error: "Failed to update expense",
        });
      }


      if (!data) {
        return res.status(404).json({
          error: "Expense not found",
        });
      }


      return res.status(200).json({
        message: "Expense updated successfully",
        expense: data,
      });

    } catch (error) {
      console.error(
        "Update expense error:",
        error
      );

      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }
);


// DELETE expense
app.delete(
  "/api/expenses/:id",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.id;

      const { id } = req.params;


      // Delete only if expense belongs
      // to authenticated user
      const { data, error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id)
        .eq("user_id", userId)
        .select()
        .maybeSingle();


      if (error) {
        console.error(
          "Supabase delete error:",
          error
        );

        return res.status(500).json({
          error: "Failed to delete expense",
        });
      }


      if (!data) {
        return res.status(404).json({
          error: "Expense not found",
        });
      }


      return res.status(200).json({
        message: "Expense deleted successfully",
        expense: data,
      });

    } catch (error) {
      console.error(
        "Delete expense error:",
        error
      );

      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }
);


// ---------------------------------------------------------
// AI Insights
// ---------------------------------------------------------

app.post(
  "/api/insights",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.id;


      // Only fetch this user's expenses
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false });


      if (error) {
        console.error(
          "Supabase insights fetch error:",
          error
        );

        return res.status(500).json({
          error:
            "Failed to fetch expenses for insights",
        });
      }


      if (!data || data.length === 0) {
        return res.status(400).json({
          error:
            "No expenses available for analysis",
        });
      }


      // Send only this user's expenses to Gemini
      const insights =
        await generateExpenseInsights(data);


      return res.status(200).json({
        insights,
      });

    } catch (error) {
      console.error(
        "AI insights error:",
        error
      );

      return res.status(500).json({
        error:
          "Failed to generate AI insights",
      });
    }
  }
);


// ---------------------------------------------------------
// Start server
// ---------------------------------------------------------

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});