import { useState } from "react";
import { ArrowLeft, Search, Plus, SquarePen, Trash2, Filter } from "lucide-react";

const initialQuotations = [
  {
    quotationNumber: "QT-7001",
    customerName: "ABC Industries",
    quotationDate: "15 Sep 2026",
    validTill: "30 Sep 2026",
    status: "Sent",
    totalAmount: 500000,
  },
  {
    quotationNumber: "QT-7002",
    customerName: "Bluewave Pipes",
    quotationDate: "16 Sep 2026",
    validTill: "01 Oct 2026",
    status: "Approved",
    totalAmount: 1200000,
  },
  {
    quotationNumber: "QT-7003",
    customerName: "Orbit Chemicals",
    quotationDate: "17 Sep 2026",
    validTill: "02 Oct 2026",
    status: "Draft",
    totalAmount: 350000,
  },
  {
    quotationNumber: "QT-7004",
    customerName: "Greenline Infra",
    quotationDate: "10 Sep 2026",
    validTill: "25 Sep 2026",
    status: "Rejected",
    totalAmount: 800000,
  },
];

const statusOptions = ["Draft", "Sent", "Approved", "Rejected", "Expired"];

const statusStyles = {
  Draft: "bg-slate-100 text-slate-600",
  Sent: "bg-primary/10 text-primary",
  Approved: "bg-success/10 text-success",
  Rejected: "bg-danger/10 text-danger",
  Expired: "bg-warning/10 text-warning",
};

function formatCurrency(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function QuotationListTable({ onAddQuotation, onBack, onEdit }) {
  const [quotations, setQuotations] = useState(initialQuotations);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleDelete = (quotationNumber) => {
    setQuotations((prev) => prev.filter((q) => q.quotationNumber !== quotationNumber));
  };

  const filteredQuotations = quotations.filter((q) => {
    const matchesSearch =
      q.customerName.toLowerCase().includes(search.toLowerCase()) ||
      q.quotationNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? q.status === statusFilter : true;
    return matchesSearch && matchesStatus;
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
          <h2 className="text-lg font-bold text-slate-900">Quotation Management</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search quotation or customer..."
              className="w-60 rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            onClick={onAddQuotation}
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
        {statusFilter && (
          <button
            onClick={() => setStatusFilter("")}
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
              <th className="px-5 py-3">Quotation No.</th>
              <th className="px-5 py-3">Customer Name</th>
              <th className="px-5 py-3">Quotation Date</th>
              <th className="px-5 py-3">Valid Till</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Total Amount</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuotations.map((q) => (
              <tr
                key={q.quotationNumber}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-5 py-3 font-medium text-primary">
                  {q.quotationNumber}
                </td>
                <td className="px-5 py-3 text-slate-600">{q.customerName}</td>
                <td className="px-5 py-3 text-slate-500">{q.quotationDate}</td>
                <td className="px-5 py-3 text-slate-500">{q.validTill}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[q.status] || "bg-slate-100 text-slate-600"}`}
                  >
                    {q.status}
                  </span>
                </td>
                <td className="px-5 py-3 font-medium text-slate-700">
                  {formatCurrency(q.totalAmount)}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(q)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary/10"
                    >
                      <SquarePen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(q.quotationNumber)}
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