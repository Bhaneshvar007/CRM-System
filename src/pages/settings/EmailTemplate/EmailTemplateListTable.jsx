import { useState } from "react";
import { ArrowLeft, Search, Plus, SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const initialTemplates = [
  {
    name: "Welcome Email",
    subject: "Welcome to Arrow Pipes!",
    type: "Transactional",
    category: "Onboarding",
    createdBy: "Mohit Ladkani",
    createdOn: "18 Aug 2026",
  },
  {
    name: "Quotation Follow Up",
    subject: "Following up on your quotation",
    type: "Marketing",
    category: "Sales",
    createdBy: "Sarah Jenkins",
    createdOn: "22 Aug 2026",
  },
  {
    name: "Password Reset",
    subject: "Reset your password",
    type: "Transactional",
    category: "Support",
    createdBy: "Sarah Jenkins",
    createdOn: "25 Aug 2026",
  },
  {
    name: "Invoice Reminder",
    subject: "Your invoice is due",
    type: "Notification",
    category: "Billing",
    createdBy: "Mohit Ladkani",
    createdOn: "30 Aug 2026",
  },
];

export default function EmailTemplateListTable({ onAddTemplate, onBack, onEdit }) {
  const [templates, setTemplates] = useState(initialTemplates);
  const [search, setSearch] = useState("");

  const handleDelete = (name) => {
    setTemplates((prev) => prev.filter((t) => t.name !== name));
  };

  const filteredTemplates = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <Link to="/settings">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50">
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <h2 className="text-lg font-bold text-slate-900">Email Template</h2>
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
          <Link to="/settings/email-template/add-email-template">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover">
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
              <th className="px-5 py-3">Template Name</th>
              <th className="px-5 py-3">Subject</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Created By</th>
              <th className="px-5 py-3">Created On</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTemplates.map((tpl) => (
              <tr
                key={tpl.name}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-5 py-3 font-medium text-primary">
                  {tpl.name}
                </td>
                <td className="px-5 py-3 text-slate-600">{tpl.subject}</td>
                <td className="px-5 py-3 text-slate-600">{tpl.type}</td>
                <td className="px-5 py-3 text-slate-600">{tpl.category}</td>
                <td className="px-5 py-3 text-slate-600">{tpl.createdBy}</td>
                <td className="px-5 py-3 text-slate-500">{tpl.createdOn}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(tpl)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary/10"
                    >
                      <SquarePen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(tpl.name)}
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