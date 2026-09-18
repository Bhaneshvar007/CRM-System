import { useState } from "react";
import { ArrowLeft, Search, Plus, SquarePen, Trash2 } from "lucide-react";

const initialCategories = [
  { code: "DEPT", name: "Department", createdBy: "Mohit Ladkani", createdOn: "12 Aug 2026" },
  { code: "DESG", name: "Designation", createdBy: "Mohit Ladkani", createdOn: "12 Aug 2026" },
  { code: "ROLE", name: "Role", createdBy: "Sarah Jenkins", createdOn: "15 Aug 2026" },
  { code: "STAT", name: "Status", createdBy: "Sarah Jenkins", createdOn: "20 Aug 2026" },
];

export default function DropdownCategoryListTable({ onAddCategory, onBack, onEdit }) {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");

  const handleDelete = (code) => {
    setCategories((prev) => prev.filter((c) => c.code !== code));
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="text-lg font-bold text-slate-900">
            Dropdown Category
          </h2>
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
          <button
            onClick={onAddCategory}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-200/70 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <th className="px-5 py-3">Code</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Created By</th>
              <th className="px-5 py-3">Created On</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((cat) => (
              <tr
                key={cat.code}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-5 py-3 text-slate-600">{cat.code}</td>
                <td className="px-5 py-3 font-medium text-primary">
                  {cat.name}
                </td>
                <td className="px-5 py-3 text-slate-600">{cat.createdBy}</td>
                <td className="px-5 py-3 text-slate-500">{cat.createdOn}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(cat)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary/10"
                    >
                      <SquarePen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.code)}
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