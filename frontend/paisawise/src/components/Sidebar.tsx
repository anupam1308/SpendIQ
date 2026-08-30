import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  LayoutDashboard,
  ReceiptText,
  Sparkles,
  LogOut,
  Wallet,
} from "lucide-react";

function Sidebar() {
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
    <aside className="hidden lg:flex w-[240px] h-screen sticky top-0 bg-white border-r border-[#e2efe8] px-4 py-6 flex-col justify-between shrink-0 shadow-xs">
      <div>
        {/* Brand & Logo Header */}
        <div className="mb-8 px-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#eef6f2] border border-[#dceee7] flex items-center justify-center shrink-0 shadow-xs">
            <Wallet className="w-5 h-5 text-[#245c4a]" />
          </div>

          <div className="min-w-0">
            <h1 className="text-lg font-bold text-[#0f172a] tracking-tight leading-none">
              SpendIQ
            </h1>

            <p className="text-[11px] text-[#64748b] font-medium mt-1 truncate">
              Smart Expense Tracker
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="px-1 mb-2 text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
          Menu
        </div>

        <nav className="space-y-1.5">
          {/* Dashboard */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#eef6f2] text-[#245c4a] font-semibold border border-[#dceee7] shadow-xs"
                  : "text-[#64748b] hover:bg-gray-50 hover:text-[#0f172a]"
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </NavLink>

          {/* Expenses */}
          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#eef6f2] text-[#245c4a] font-semibold border border-[#dceee7] shadow-xs"
                  : "text-[#64748b] hover:bg-gray-50 hover:text-[#0f172a]"
              }`
            }
          >
            <ReceiptText className="w-4 h-4 shrink-0" />
            <span>Expenses</span>
          </NavLink>

          {/* AI Insights */}
          <NavLink
            to="/insights"
            className={({ isActive }) =>
              `flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#eef6f2] text-[#245c4a] font-semibold border border-[#dceee7] shadow-xs"
                  : "text-[#64748b] hover:bg-gray-50 hover:text-[#0f172a]"
              }`
            }
          >
            <div className="flex items-center gap-3 min-w-0">
              <Sparkles className="w-4 h-4 shrink-0 text-[#245c4a]" />

              <span className="truncate">
                AI Insights
              </span>
            </div>

            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-[#245c4a]/10 text-[#245c4a] shrink-0">
              AI
            </span>
          </NavLink>
        </nav>
      </div>

      {/* Logout Card */}
      <div className="pt-4">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border border-[#245c4a]/25 hover:bg-[#eef6f2]/60 hover:border-[#245c4a]/40 transition-all duration-150 text-left shadow-xs"
        >
          <div className="flex items-center gap-3 min-w-0">
            <LogOut className="w-5 h-5 text-[#245c4a] shrink-0 stroke-[2]" />

            <div className="min-w-0">
              <div className="text-sm font-semibold text-[#245c4a] leading-tight">
                Logout
              </div>

              <div className="text-[11px] text-[#64748b] mt-0.5 font-normal truncate">
                Sign out from your account
              </div>
            </div>
          </div>

          <span className="text-xs font-medium text-[#245c4a] bg-[#eef6f2] px-2.5 py-1 rounded-lg shrink-0 border border-[#245c4a]/10">
            Exit
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;