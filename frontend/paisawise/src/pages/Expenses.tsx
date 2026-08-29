import { useState, useMemo } from "react";
import type { Expense, ExpenseCategory } from "../types/expense";
import {
  Search,
  Filter,
  ArrowUpDown,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Receipt,
} from "lucide-react";

interface ExpensesProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => Promise<void> | void;
  onEditExpense: (id: string, updatedExpense: Partial<Expense>) => Promise<void> | void;
}

const CATEGORIES: ("All" | ExpenseCategory)[] = [
  "All",
  "Food",
  "Travel",
  "Education",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
];

type SortOption = "date-desc" | "date-asc" | "amount-desc" | "amount-asc";

function Expenses({
  expenses,
  onDeleteExpense,
  onEditExpense,
}: ExpensesProps) {
  // State for search, filter, and sort
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | ExpenseCategory>("All");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");

  // Edit Modal State
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState<ExpenseCategory>("Other");
  const [editMerchant, setEditMerchant] = useState("");
  const [editNote, setEditNote] = useState("");
  const [editDate, setEditDate] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState("");

  // Delete Confirmation Modal State
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filtered and Sorted Expenses
  const filteredAndSortedExpenses = useMemo(() => {
    return expenses
      .filter((expense) => {
        // Category Filter
        if (selectedCategory !== "All" && expense.category !== selectedCategory) {
          return false;
        }

        // Search Term Filter
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase().trim();
          const matchMerchant = expense.merchant.toLowerCase().includes(query);
          const matchNote = (expense.note || "").toLowerCase().includes(query);
          const matchCategory = expense.category.toLowerCase().includes(query);

          return matchMerchant || matchNote || matchCategory;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "date-desc") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (sortBy === "date-asc") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (sortBy === "amount-desc") {
          return b.amount - a.amount;
        }
        if (sortBy === "amount-asc") {
          return a.amount - b.amount;
        }
        return 0;
      });
  }, [expenses, searchTerm, selectedCategory, sortBy]);

  // Handle Edit Modal Opening
  const handleOpenEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setEditAmount(String(expense.amount));
    setEditCategory(expense.category);
    setEditMerchant(expense.merchant);
    setEditNote(expense.note || "");
    setEditDate(expense.date);
    setEditError("");
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExpense) return;

    const amountNum = Number(editAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setEditError("Amount must be a positive number.");
      return;
    }

    if (!editMerchant.trim()) {
      setEditError("Merchant name is required.");
      return;
    }

    setIsSaving(true);
    setEditError("");

    try {
      await onEditExpense(editingExpense.id, {
        amount: amountNum,
        category: editCategory,
        merchant: editMerchant.trim(),
        note: editNote.trim(),
        date: editDate || new Date().toISOString().split("T")[0],
      });
      setEditingExpense(null);
    } catch (err: any) {
      setEditError(err?.message || "Failed to update expense. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete Modal Confirm
  const handleConfirmDelete = async () => {
    if (!deletingExpense) return;

    setIsDeleting(true);
    try {
      await onDeleteExpense(deletingExpense.id);
      setDeletingExpense(null);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("date-desc");
  };

  const totalAmount = useMemo(() => {
    return filteredAndSortedExpenses.reduce((sum, e) => sum + e.amount, 0);
  }, [filteredAndSortedExpenses]);

  return (
    <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight">
            Expenses
          </h2>
          <p className="mt-1 text-sm text-[#64748b]">
            View, search, filter, and manage all your tracked expenses.
          </p>
        </div>

        <div className="text-right text-xs text-[#64748b] bg-white border border-gray-200 px-3.5 py-2 rounded-xl self-start sm:self-auto shadow-xs flex items-center gap-2.5">
          <span>Total: <strong className="text-[#0f172a] font-bold">{filteredAndSortedExpenses.length}</strong> expenses</span>
          <span className="text-gray-300">•</span>
          <span>Sum: <strong className="text-[#245c4a] font-extrabold text-sm">₹{totalAmount.toLocaleString("en-IN")}</strong></span>
        </div>
      </div>

      {/* Controls Bar: Search, Category Filter, Sorting */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search merchant, note, or category..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0f172a] placeholder-gray-400 outline-none focus:bg-white focus:border-[#245c4a] focus:ring-2 focus:ring-[#245c4a]/15 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 shrink-0 hidden sm:block" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as "All" | ExpenseCategory)}
            className="w-full sm:w-auto px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0f172a] outline-none focus:bg-white focus:border-[#245c4a] focus:ring-2 focus:ring-[#245c4a]/15 transition-all font-medium"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-gray-400 shrink-0 hidden sm:block" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full sm:w-auto px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0f172a] outline-none focus:bg-white focus:border-[#245c4a] focus:ring-2 focus:ring-[#245c4a]/15 transition-all font-medium"
          >
            <option value="date-desc">Date: Newest → Oldest</option>
            <option value="date-asc">Date: Oldest → Newest</option>
            <option value="amount-desc">Amount: Highest → Lowest</option>
            <option value="amount-asc">Amount: Lowest → Highest</option>
          </select>
        </div>
      </div>

      {/* Expense List Table / Card View */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        {expenses.length === 0 ? (
          /* Empty State: No expenses created yet */
          <div className="px-6 py-16 text-center max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-[#eef6f2] text-[#245c4a] flex items-center justify-center mx-auto mb-4 border border-[#dceee7]">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0f172a]">No expenses yet</h3>
            <p className="mt-1.5 text-xs text-[#64748b]">
              Start tracking your spending on the Dashboard to see your expenses listed here.
            </p>
          </div>
        ) : filteredAndSortedExpenses.length === 0 ? (
          /* Empty State: Search or Category filter mismatch */
          <div className="px-6 py-16 text-center max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0f172a]">No expenses match your search</h3>
            <p className="mt-1.5 text-xs text-[#64748b]">
              Try adjusting your category filter or search keywords.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-[#eef6f2] hover:bg-[#dceee7] text-[#245c4a] text-xs font-semibold rounded-xl transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredAndSortedExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 hover:bg-gray-50/70 transition-colors gap-3"
              >
                {/* Left: Merchant, Note, Date */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-[#0f172a] truncate">
                      {expense.merchant}
                    </p>
                    <span className="px-2 py-0.5 rounded-md bg-[#eef6f2] border border-[#dceee7] text-[11px] font-semibold text-[#245c4a]">
                      {expense.category}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#64748b] truncate">
                    {expense.note ? expense.note : "No note"} · <span className="font-medium text-gray-500">{expense.date}</span>
                  </p>
                </div>

                {/* Right: Amount & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <span className="text-base font-extrabold text-[#0f172a]">
                    ₹{expense.amount.toLocaleString("en-IN")}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(expense)}
                      className="p-1.5 text-gray-400 hover:text-[#245c4a] hover:bg-[#eef6f2] rounded-lg transition-colors"
                      title="Edit expense"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingExpense(expense)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete expense"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* EDIT EXPENSE MODAL                                                        */}
      {/* ========================================================================= */}
      {editingExpense && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setEditingExpense(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#0f172a]">Edit Expense</h3>
            <p className="text-xs text-[#64748b] mt-0.5">
              Update details for this transaction.
            </p>

            {editError && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] uppercase tracking-wider mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-[#0f172a] outline-none focus:bg-white focus:border-[#245c4a] focus:ring-2 focus:ring-[#245c4a]/15"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0f172a] uppercase tracking-wider mb-1">
                  Merchant
                </label>
                <input
                  type="text"
                  required
                  value={editMerchant}
                  onChange={(e) => setEditMerchant(e.target.value)}
                  placeholder="e.g. Zomato, Auto, Amazon"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0f172a] outline-none focus:bg-white focus:border-[#245c4a] focus:ring-2 focus:ring-[#245c4a]/15"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0f172a] uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value as ExpenseCategory)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0f172a] outline-none focus:bg-white focus:border-[#245c4a] focus:ring-2 focus:ring-[#245c4a]/15 font-medium"
                >
                  {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0f172a] uppercase tracking-wider mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0f172a] outline-none focus:bg-white focus:border-[#245c4a] focus:ring-2 focus:ring-[#245c4a]/15 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0f172a] uppercase tracking-wider mb-1">
                  Note (Optional)
                </label>
                <input
                  type="text"
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  placeholder="e.g. Dinner with friends"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0f172a] outline-none focus:bg-white focus:border-[#245c4a] focus:ring-2 focus:ring-[#245c4a]/15"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingExpense(null)}
                  className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-2.5 px-4 bg-[#245c4a] hover:bg-[#1c483a] text-white text-sm font-semibold rounded-xl transition-colors shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isSaving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION MODAL                                                  */}
      {/* ========================================================================= */}
      {deletingExpense && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl w-full max-w-sm p-6 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4 border border-red-100">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-[#0f172a]">Delete this expense?</h3>
            <p className="text-xs text-[#64748b] mt-1">
              Are you sure you want to delete <strong className="text-[#0f172a]">{deletingExpense.merchant} (₹{deletingExpense.amount})</strong>? This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeletingExpense(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Expenses;