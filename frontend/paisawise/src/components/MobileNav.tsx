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
    <header className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#e2efe8] px-4 py-3 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-[#eef6f2] border border-[#dceee7] flex items-center justify-center shrink-0">
          <Wallet className="w-4 h-4 text-[#245c4a]" />
        </div>
        <span className="text-base font-bold text-[#0f172a] tracking-tight">
          SpendIQ
        </span>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 bg-red-50 border border-red-100 active:scale-95 transition-all"
        title="Logout"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span>Logout</span>
      </button>
    </header>
  );
}

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e2efe8] shadow-lg flex items-center justify-around py-2 px-2">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
            isActive
              ? "text-[#245c4a] font-bold"
              : "text-[#64748b] hover:text-[#0f172a]"
          }`
        }
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[10px]">Dashboard</span>
      </NavLink>

      <NavLink
        to="/expenses"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
            isActive
              ? "text-[#245c4a] font-bold"
              : "text-[#64748b] hover:text-[#0f172a]"
          }`
        }
      >
        <ReceiptText className="w-5 h-5" />
        <span className="text-[10px]">Expenses</span>
      </NavLink>

      <NavLink
        to="/insights"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all relative ${
            isActive
              ? "text-[#245c4a] font-bold"
              : "text-[#64748b] hover:text-[#0f172a]"
          }`
        }
      >
        <Sparkles className="w-5 h-5 text-[#245c4a]" />
        <span className="text-[10px]">AI Insights</span>
      </NavLink>
    </nav>
  );
}

