export type ExpenseCategory =
  | "Food"
  | "Travel"
  | "Education"
  | "Entertainment"
  | "Shopping"
  | "Bills"
  | "Other";

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  merchant: string;
  note: string;
  date: string;
}