import {
  LayoutGrid,
  Users,
  FileText,
  Activity,
  Folder,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Overview", icon: LayoutGrid, path: "/" },
  { label: "Qualified Leads", icon: Users, path: "/leads" },
  { label: "Quotes & Deals", icon: FileText, path: "/quotes-deals" },
  { label: "Performance", icon: Activity, path: "/performance" },
  { label: "Client Database", icon: Folder, path: "/clients" },
  { label: "Workspace Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar({ collapsed }) {
  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col justify-between border-r border-slate-200 bg-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div>
        {/* Logo */}
        <div
          className={`flex items-center gap-2 px-5 py-5 ${
            collapsed ? "justify-center px-0" : ""
          }`}
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
            T
          </div>
          {!collapsed && (
            <span className="whitespace-nowrap text-base font-semibold text-slate-900">
              TechNova
            </span>
          )}
        </div>

        {/* Nav items */}
        <nav className="mt-2 space-y-1 px-3">
          {navItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={label}
              to={path}
              end={path === "/"}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  collapsed ? "justify-center px-0" : ""
                } ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
              {!collapsed && label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* System status */}
      {!collapsed ? (
        <div className="mx-3 mb-4 rounded-lg bg-slate-50 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-success" />
            <span className="text-sm font-medium text-slate-800">
              System Live
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-400">All nodes operational</p>
        </div>
      ) : (
        <div className="mb-4 flex justify-center">
          <span className="h-2 w-2 rounded-full bg-success" />
        </div>
      )}
    </aside>
  );
}