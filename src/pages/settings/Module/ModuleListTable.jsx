import { useState } from "react";
import { ArrowLeft, Search, Plus, SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";



const initialModules = [
  { name: "User Management", router: "/settings/user-management/list", desc: "Manage system users and their access" },
  { name: "Role Management", router: "/settings/role-management/list", desc: "Manage roles and permission levels" },
  { name: "Lead Management", router: "/lead-management/list", desc: "Track and manage sales leads" },
  { name: "Customer Management", router: "/customer-management/list", desc: "Manage active customer records" },
  { name: "Quotation Management", router: "/quotation-management/list", desc: "Create and track customer quotations" },
];

export default function ModuleListTable({ onAddModule, onBack, onEdit }) {
  const [modules, setModules] = useState(initialModules);
  const [search, setSearch] = useState("");

  const handleDelete = (name) => {
    setModules((prev) => prev.filter((m) => m.name !== name));
  };

  const filteredModules = modules.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <Link to="/settings" className="text-slate-600 hover:text-slate-50">
            <button
              onClick={onBack}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <h2 className="text-lg font-bold text-slate-900">Module</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-56 rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <Link to="/settings/module/add-module" className="text-slate-600 hover:text-slate-50">
            <button
              onClick={onAddModule}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover"
            >
              <Plus className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-200/70 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Router</th>
              <th className="px-5 py-3">Description</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredModules.map((mod) => (
              <tr
                key={mod.name}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-5 py-3 font-medium text-primary">{mod.name}</td>
                <td className="px-5 py-3 font-mono text-xs text-slate-500">{mod.router}</td>
                <td className="px-5 py-3 text-slate-500">{mod.desc}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(mod)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary/10"
                    >
                      <SquarePen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(mod.name)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-danger text-danger hover:bg-danger/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}