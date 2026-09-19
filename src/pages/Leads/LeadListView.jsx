import { useState } from "react";
import { ArrowLeft, Search, Plus, SquarePen, Trash2, Filter } from "lucide-react";

const initialLeads = [
  {
    leadId: "LD-1001",
    companyName: "Nova Textiles",
    contactPerson: "Ramesh Iyer",
    mobile: "+91 98200-11223",
    email: "ramesh@novatextiles.com",
    source: "Website",
    industry: "Textiles",
    assignedTo: "Sachin Shetye",
    status: "New",
    remarks: "Requested a callback next week",
    createdDate: "02 Sep 2026",
  },
  {
    leadId: "LD-1002",
    companyName: "Bluewave Pipes",
    contactPerson: "Anita Deshmukh",
    mobile: "+91 90040-55667",
    email: "anita@bluewavepipes.com",
    source: "Referral",
    industry: "Manufacturing",
    assignedTo: "Suresh P",
    status: "In Progress",
    remarks: "Sent product catalogue",
    createdDate: "05 Sep 2026",
  },
  {
    leadId: "LD-1003",
    companyName: "Orbit Chemicals",
    contactPerson: "Vikram Nair",
    mobile: "+91 88888-22334",
    email: "vikram@orbitchemicals.com",
    source: "Trade Show",
    industry: "Chemicals",
    assignedTo: "Dilip Santani",
    status: "Qualified",
    remarks: "Interested in bulk order",
    createdDate: "09 Sep 2026",
  },
  {
    leadId: "LD-1004",
    companyName: "Greenline Infra",
    contactPerson: "Priya Menon",
    mobile: "+91 77012-98765",
    email: "priya@greenlineinfra.com",
    source: "Cold Call",
    industry: "Construction",
    assignedTo: "Sachin Shetye",
    status: "Lost",
    remarks: "Went with a competitor",
    createdDate: "11 Sep 2026",
  },
];

const statusOptions = ["New", "In Progress", "Qualified", "Lost"];
const sourceOptions = ["Website", "Referral", "Trade Show", "Cold Call"];

const statusStyles = {
  New: "bg-primary/10 text-primary",
  "In Progress": "bg-warning/10 text-warning",
  Qualified: "bg-success/10 text-success",
  Lost: "bg-danger/10 text-danger",
};

export default function LeadListView({ onAddLead, onBack, onEdit }) {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");

  const handleDelete = (leadId) => {
    setLeads((prev) => prev.filter((l) => l.leadId !== leadId));
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.companyName.toLowerCase().includes(search.toLowerCase()) ||
      l.contactPerson.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? l.status === statusFilter : true;
    const matchesSource = sourceFilter ? l.source === sourceFilter : true;
    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="text-lg font-bold text-slate-900">Lead Management</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company or contact..."
              className="w-60 rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            onClick={onAddLead}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 px-5 py-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <Filter className="h-3.5 w-3.5" />
          Filters
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-300 py-1.5 px-3 text-sm text-slate-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Statuses</option>
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="rounded-lg border border-slate-300 py-1.5 px-3 text-sm text-slate-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Sources</option>
          {sourceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {(statusFilter || sourceFilter) && (
          <button
            onClick={() => {
              setStatusFilter("");
              setSourceFilter("");
            }}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-200/70 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <th className="px-5 py-3">Lead ID</th>
              <th className="px-5 py-3">Company Name</th>
              <th className="px-5 py-3">Contact Person</th>
              <th className="px-5 py-3">Mobile Number</th>
              <th className="px-5 py-3">Email Address</th>
              <th className="px-5 py-3">Lead Source</th>
              <th className="px-5 py-3">Industry</th>
              <th className="px-5 py-3">Assigned To</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Created Date</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr
                key={lead.leadId}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-5 py-3 text-slate-500">{lead.leadId}</td>
                <td className="px-5 py-3 font-medium text-primary">
                  {lead.companyName}
                </td>
                <td className="px-5 py-3 text-slate-600">{lead.contactPerson}</td>
                <td className="px-5 py-3 text-slate-600">{lead.mobile}</td>
                <td className="px-5 py-3 text-slate-600">{lead.email}</td>
                <td className="px-5 py-3 text-slate-600">{lead.source}</td>
                <td className="px-5 py-3 text-slate-600">{lead.industry}</td>
                <td className="px-5 py-3 text-slate-600">{lead.assignedTo}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[lead.status] || "bg-slate-100 text-slate-600"}`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-slate-500">{lead.createdDate}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(lead)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary/10"
                    >
                      <SquarePen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(lead.leadId)}
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