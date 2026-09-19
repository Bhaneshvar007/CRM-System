import { useState } from "react";
import { ArrowLeft, Search, Plus, SquarePen, Trash2, Filter } from "lucide-react";

const initialOpportunities = [
  {
    opportunityId: "OP-4001",
    dealName: "ABC Industries - Bulk Pipe Order",
    reference: "ABC Industries",
    expectedRevenue: 500000,
    probability: 70,
    closeDate: "30 Sep 2026",
    stage: "Proposal",
    assignedExecutive: "Dilip Santani",
    remarks: "Quotation sent, awaiting approval",
  },
  {
    opportunityId: "OP-4002",
    dealName: "Bluewave Pipes - Annual Supply",
    reference: "Bluewave Pipes",
    expectedRevenue: 1200000,
    probability: 50,
    closeDate: "15 Oct 2026",
    stage: "Negotiation",
    assignedExecutive: "Suresh P",
    remarks: "Discussing payment terms",
  },
  {
    opportunityId: "OP-4003",
    dealName: "Orbit Chemicals - New Client Deal",
    reference: "Orbit Chemicals (Lead)",
    expectedRevenue: 350000,
    probability: 30,
    closeDate: "05 Nov 2026",
    stage: "Qualification",
    assignedExecutive: "Sachin Shetye",
    remarks: "Initial requirement discussion done",
  },
  {
    opportunityId: "OP-4004",
    dealName: "Greenline Infra - Site Materials",
    reference: "Greenline Infra (Lead)",
    expectedRevenue: 800000,
    probability: 0,
    closeDate: "20 Sep 2026",
    stage: "Lost",
    assignedExecutive: "Dilip Santani",
    remarks: "Went with a competitor",
  },
];

const stageOptions = ["Prospecting", "Qualification", "Proposal", "Negotiation", "Won", "Lost"];

const stageStyles = {
  Prospecting: "bg-slate-100 text-slate-600",
  Qualification: "bg-primary/10 text-primary",
  Proposal: "bg-accent/10 text-accent",
  Negotiation: "bg-warning/10 text-warning",
  Won: "bg-success/10 text-success",
  Lost: "bg-danger/10 text-danger",
};

function formatCurrency(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function OpportunityListTable({ onAddOpportunity, onBack, onEdit }) {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("");

  const handleDelete = (opportunityId) => {
    setOpportunities((prev) => prev.filter((o) => o.opportunityId !== opportunityId));
  };

  const filteredOpportunities = opportunities.filter((o) => {
    const matchesSearch =
      o.dealName.toLowerCase().includes(search.toLowerCase()) ||
      o.reference.toLowerCase().includes(search.toLowerCase());
    const matchesStage = stageFilter ? o.stage === stageFilter : true;
    return matchesSearch && matchesStage;
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
          <h2 className="text-lg font-bold text-slate-900">
            Opportunity / Deal Management
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search deal or reference..."
              className="w-60 rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            onClick={onAddOpportunity}
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
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="rounded-lg border border-slate-300 py-1.5 px-3 text-sm text-slate-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Stages</option>
          {stageOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {stageFilter && (
          <button
            onClick={() => setStageFilter("")}
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
              <th className="px-5 py-3">Opportunity ID</th>
              <th className="px-5 py-3">Deal Name</th>
              <th className="px-5 py-3">Lead/Customer Ref</th>
              <th className="px-5 py-3">Expected Revenue</th>
              <th className="px-5 py-3">Probability</th>
              <th className="px-5 py-3">Expected Close Date</th>
              <th className="px-5 py-3">Stage</th>
              <th className="px-5 py-3">Assigned Executive</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOpportunities.map((op) => (
              <tr
                key={op.opportunityId}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-5 py-3 text-slate-500">{op.opportunityId}</td>
                <td className="px-5 py-3 font-medium text-primary">{op.dealName}</td>
                <td className="px-5 py-3 text-slate-600">{op.reference}</td>
                <td className="px-5 py-3 font-medium text-slate-700">
                  {formatCurrency(op.expectedRevenue)}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-14 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${op.probability}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{op.probability}%</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-slate-500">{op.closeDate}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${stageStyles[op.stage] || "bg-slate-100 text-slate-600"}`}
                  >
                    {op.stage}
                  </span>
                </td>
                <td className="px-5 py-3 text-slate-600">{op.assignedExecutive}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(op)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary/10"
                    >
                      <SquarePen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(op.opportunityId)}
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