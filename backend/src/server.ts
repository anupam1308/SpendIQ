import express from "express";
import cors from "cors";
import { supabase } from "./supabase";
import { generateExpenseInsights } from "./ai";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.json());

app.get("/api/test-db", async (_req, res) => {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .limit(5);

  if (error) {
    console.error("Database error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }

  res.json({
    message: "Database connection successful",
    expenses: data,
  });
});

const PORT = 5000;


interface Expense {
  id: string;
  amount: number;
  category: string;
  merchant: string;
  note: string;
  date: string;
}



const allowedCategories = [
  "Food",
  "Travel",
  "Education",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
];

app.get("/", (req, res) => {
  res.json({
    message: "PaisaWise backend is running!",
  });
});

app.get("/api/expenses", async (_req, res) => {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
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
});

app.post("/api/expenses", async (req, res) => {
  const { amount, category, merchant, note, date } = req.body;

  // Validate amount
  if (typeof amount !== "number" || amount <= 0) {
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

  // Create expense object
  const newExpense: Expense = {
    id: `exp_${Date.now()}`,
    amount,
    category,
    merchant: merchant.trim(),
    note: typeof note === "string" ? note.trim() : "",
    date:
      typeof date === "string" && date
        ? date
        : new Date().toISOString().split("T")[0],
  };

  // Save expense to Supabase
  const { data, error } = await supabase
    .from("expenses")
    .insert(newExpense)
    .select()
    .single();

  // Handle database error
  if (error) {
    console.error("Supabase insert error:", error);

    return res.status(500).json({
      error: "Failed to create expense",
    });
  }

  // Success
  return res.status(201).json({
    message: "Expense created successfully",
    expense: data,
  });
});

app.put("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const { amount, category, merchant, note, date } = req.body;

  // Validate amount
  if (typeof amount !== "number" || amount <= 0) {
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

  // Update expense in Supabase
  const { data, error } = await supabase
    .from("expenses")
    .update({
      amount,
      category,
      merchant: merchant.trim(),
      note: typeof note === "string" ? note.trim() : "",
      date:
        typeof date === "string" && date
          ? date
          : new Date().toISOString().split("T")[0],
    })
    .eq("id", id)
    .select()
    .single();

  // Handle database errors
  if (error) {
    console.error("Supabase update error:", error);

    // Expense doesn't exist
    if (error.code === "PGRST116") {
      return res.status(404).json({
        error: "Expense not found",
      });
    }

    return res.status(500).json({
      error: "Failed to update expense",
    });
  }

  return res.status(200).json({
    message: "Expense updated successfully",
    expense: data,
  });
});

app.delete("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Supabase delete error:", error);

      return res.status(500).json({
        error: "Failed to delete expense",
      });
    }

    if (!data) {
      return res.status(404).json({
        error: "Expense not found",
      });
    }

    return res.json({
      message: "Expense deleted successfully",
      expense: data,
    });
  } catch (error) {
    console.error("Delete expense error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.post("/api/insights", async (_req, res) => {
  try {
    // Get real expenses from Supabase
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error(
        "Supabase insights fetch error:",
        error
      );

      return res.status(500).json({
        error: "Failed to fetch expenses for insights",
      });
    }

    if (!data || data.length === 0) {
      return res.status(400).json({
        error: "No expenses available for analysis",
      });
    }

    // Send real expense data to Gemini
    const insights = await generateExpenseInsights(data);

    return res.status(200).json({
      insights,
    });
  } catch (error) {
    console.error("AI insights error:", error);

    return res.status(500).json({
      error: "Failed to generate AI insights",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});