import {
  LayoutGrid,
  Users,
  FileText,
  Activity,
  Folder,
  Settings,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Overview", icon: LayoutGrid },
  { label: "Qualified Leads", icon: Users },
  { label: "Quotes & Deals", icon: FileText },
  { label: "Performance", icon: Activity },
  { label: "Client Database", icon: Folder },
  { label: "Workspace Settings", icon: Settings },
];

export default function Sidebar() {
  const [active, setActive] = useState("Overview");

  return (
    <aside className="flex h-screen w-56 flex-col justify-between border-r border-slate-200 bg-white">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
            T
          </div>
          <span className="text-base font-semibold text-slate-900">
            TechNova
          </span>
        </div>

        {/* Nav items */}
        <nav className="mt-2 space-y-1 px-3">
          {navItems.map(({ label, icon: Icon }) => {
            const isActive = active === label;
            return (
              <button
                key={label}
                onClick={() => setActive(label)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                {label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* System status */}
      <div className="mx-3 mb-4 rounded-lg bg-slate-50 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success" />
          <span className="text-sm font-medium text-slate-800">
            System Live
          </span>
        </div>
        <p className="mt-0.5 text-xs text-slate-400">All nodes operational</p>
      </div>
    </aside>
  );
}