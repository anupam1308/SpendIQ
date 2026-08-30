import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  LayoutDashboard,
  ReceiptText,
  Sparkles,
  LogOut,
  Wallet,
} from "lucide-react";

export function MobileHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return;
    }

    navigate("/login");
  };

  return (
    <header className="lg:hidden sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#e2efe8] px-3 sm:px-4 py-3 flex items-center justify-between gap-3 shadow-xs">
      {/* Brand */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-[#eef6f2] border border-[#dceee7] flex items-center justify-center shrink-0">
          <Wallet className="w-4 h-4 text-[#245c4a]" />
        </div>

        <span className="text-base font-bold text-[#0f172a] tracking-tight truncate">
          SpendIQ
        </span>
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 bg-red-50 border border-red-100 active:scale-95 transition-all shrink-0"
        title="Logout"
      >
        <LogOut className="w-3.5 h-3.5 shrink-0" />
        <span>Logout</span>
      </button>
    </header>
  );
}

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 w-full bg-white/95 backdrop-blur-md border-t border-[#e2efe8] shadow-lg">
      <div className="w-full max-w-md mx-auto flex items-center justify-around px-2 py-2">
        {/* Dashboard */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 px-2 py-1.5 rounded-xl transition-all ${
              isActive
                ? "text-[#245c4a] font-bold"
                : "text-[#64748b] hover:text-[#0f172a]"
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 shrink-0" />
          <span className="text-[10px] leading-tight text-center">
            Dashboard
          </span>
        </NavLink>

        {/* Expenses */}
        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 px-2 py-1.5 rounded-xl transition-all ${
              isActive
                ? "text-[#245c4a] font-bold"
                : "text-[#64748b] hover:text-[#0f172a]"
            }`
          }
        >
          <ReceiptText className="w-5 h-5 shrink-0" />
          <span className="text-[10px] leading-tight text-center">
            Expenses
          </span>
        </NavLink>

        {/* AI Insights */}
        <NavLink
          to="/insights"
          className={({ isActive }) =>
            `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 px-2 py-1.5 rounded-xl transition-all ${
              isActive
                ? "text-[#245c4a] font-bold"
                : "text-[#64748b] hover:text-[#0f172a]"
            }`
          }
        >
          <Sparkles className="w-5 h-5 shrink-0 text-[#245c4a]" />
          <span className="text-[10px] leading-tight text-center">
            AI Insights
          </span>
        </NavLink>
      </div>
    </nav>
  );
}