import { useState } from "react";
import { ArrowLeft, Search, Plus, SquarePen, Trash2, Filter } from "lucide-react";

const initialContacts = [
  {
    contactId: "CP-3001",
    customerId: "CU-2001",
    customerName: "ABC Industries",
    contactName: "Ramesh Iyer",
    designation: "Purchase Manager",
    department: "Procurement",
    mobile: "+91 98200-11223",
    email: "ramesh@abcindustries.com",
    isPrimary: true,
  },
  {
    contactId: "CP-3002",
    customerId: "CU-2001",
    customerName: "ABC Industries",
    contactName: "Sunita Rao",
    designation: "Director",
    department: "Management",
    mobile: "+91 98200-99887",
    email: "sunita@abcindustries.com",
    isPrimary: false,
  },
  {
    contactId: "CP-3003",
    customerId: "CU-2001",
    customerName: "ABC Industries",
    contactName: "Vivek Shah",
    designation: "Accounts Manager",
    department: "Accounts",
    mobile: "+91 98200-44556",
    email: "vivek@abcindustries.com",
    isPrimary: false,
  },
  {
    contactId: "CP-3004",
    customerId: "CU-2002",
    customerName: "Bluewave Pipes",
    contactName: "Anita Deshmukh",
    designation: "Purchase Manager",
    department: "Procurement",
    mobile: "+91 90040-55667",
    email: "anita@bluewavepipes.com",
    isPrimary: true,
  },
];

const customerOptions = ["ABC Industries", "Bluewave Pipes", "Orbit Chemicals"];

export default function ContactPersonListTable({ onAddContact, onBack, onEdit }) {
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");

  const handleDelete = (contactId) => {
    setContacts((prev) => prev.filter((c) => c.contactId !== contactId));
  };

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.contactName.toLowerCase().includes(search.toLowerCase()) ||
      c.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesCustomer = customerFilter ? c.customerName === customerFilter : true;
    return matchesSearch && matchesCustomer;
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
            Contact Person Management
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contact or customer..."
              className="w-60 rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            onClick={onAddContact}
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
          value={customerFilter}
          onChange={(e) => setCustomerFilter(e.target.value)}
          className="rounded-lg border border-slate-300 py-1.5 px-3 text-sm text-slate-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Customers</option>
          {customerOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {customerFilter && (
          <button
            onClick={() => setCustomerFilter("")}
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
              <th className="px-5 py-3">Contact ID</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Contact Name</th>
              <th className="px-5 py-3">Designation</th>
              <th className="px-5 py-3">Department</th>
              <th className="px-5 py-3">Mobile Number</th>
              <th className="px-5 py-3">Email Address</th>
              <th className="px-5 py-3">Primary</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((c) => (
              <tr
                key={c.contactId}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-5 py-3 text-slate-500">{c.contactId}</td>
                <td className="px-5 py-3 text-slate-600">
                  {c.customerName}
                  <span className="ml-1 text-xs text-slate-400">({c.customerId})</span>
                </td>
                <td className="px-5 py-3 font-medium text-primary">{c.contactName}</td>
                <td className="px-5 py-3 text-slate-600">{c.designation}</td>
                <td className="px-5 py-3 text-slate-600">{c.department}</td>
                <td className="px-5 py-3 text-slate-600">{c.mobile}</td>
                <td className="px-5 py-3 text-slate-600">{c.email}</td>
                <td className="px-5 py-3">
                  {c.isPrimary ? (
                    <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                      Primary
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(c)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary/10"
                    >
                      <SquarePen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.contactId)}
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