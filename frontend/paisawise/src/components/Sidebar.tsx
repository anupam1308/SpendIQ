import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-[220px] min-h-screen bg-white border-r border-gray-200 px-5 py-7">

      {/* Logo */}
      <div className="mb-12">
        <h1 className="text-xl font-semibold text-gray-900">
          PaisaWise
        </h1>

        <p className="text-xs text-gray-400 mt-1">
          Take control of your money.
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `block w-full px-3 py-2.5 rounded-lg text-sm ${
              isActive
                ? "bg-[#dceee7] text-[#245c4a] font-medium"
                : "text-gray-500 hover:bg-gray-50"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `block w-full px-3 py-2.5 rounded-lg text-sm ${
              isActive
                ? "bg-[#dceee7] text-[#245c4a] font-medium"
                : "text-gray-500 hover:bg-gray-50"
            }`
          }
        >
          Expenses
        </NavLink>

        <NavLink
          to="/insights"
          className={({ isActive }) =>
            `block w-full px-3 py-2.5 rounded-lg text-sm ${
              isActive
                ? "bg-[#dceee7] text-[#245c4a] font-medium"
                : "text-gray-500 hover:bg-gray-50"
            }`
          }
        >
          Insights
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;