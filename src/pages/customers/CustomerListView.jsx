import { useState } from "react";
import { ArrowLeft, Search, Plus, SquarePen, Trash2, Filter } from "lucide-react";
import { Link } from "react-router-dom";



const initialCustomers = [
  {
    customerId: "CU-2001",
    companyName: "ABC Industries",
    gstNumber: "27ABCDE1234F1Z5",
    website: "www.abcindustries.com",
    billingAddress: "Plot 14, MIDC, Pune, MH",
    shippingAddress: "Plot 14, MIDC, Pune, MH",
    primaryContact: "Ramesh Iyer",
    mobile: "+91 98200-11223",
    email: "ramesh@abcindustries.com",
    customerType: "Corporate",
  },
  {
    customerId: "CU-2002",
    companyName: "Bluewave Pipes",
    gstNumber: "24BLUEW5678G1Z2",
    website: "www.bluewavepipes.com",
    billingAddress: "Sector 12, Ahmedabad, GJ",
    shippingAddress: "Sector 9, Ahmedabad, GJ",
    primaryContact: "Anita Deshmukh",
    mobile: "+91 90040-55667",
    email: "anita@bluewavepipes.com",
    customerType: "Distributor",
  },
  {
    customerId: "CU-2003",
    companyName: "Orbit Chemicals",
    gstNumber: "29ORBIT9012H1Z8",
    website: "www.orbitchemicals.com",
    billingAddress: "Industrial Area, Bengaluru, KA",
    shippingAddress: "Industrial Area, Bengaluru, KA",
    primaryContact: "Vikram Nair",
    mobile: "+91 88888-22334",
    email: "vikram@orbitchemicals.com",
    customerType: "Wholesale",
  },
];

const customerTypeOptions = ["Retail", "Wholesale", "Distributor", "Corporate"];

const typeStyles = {
  Retail: "bg-primary/10 text-primary",
  Wholesale: "bg-warning/10 text-warning",
  Distributor: "bg-accent/10 text-accent",
  Corporate: "bg-success/10 text-success",
};

export default function CustomerListView({ onAddCustomer, onBack, onEdit }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const handleDelete = (customerId) => {
    setCustomers((prev) => prev.filter((c) => c.customerId !== customerId));
  };

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.companyName.toLowerCase().includes(search.toLowerCase()) ||
      c.primaryContact.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? c.customerType === typeFilter : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-3">
          <Link to="/customers" className="text-xs font-semibold text-primary hover:underline">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <h2 className="text-lg font-bold text-slate-900">Customer Management</h2>
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
          <Link to="/customers/add-customer" className="text-xs font-semibold text-primary hover:underline">
            <button
              onClick={onAddCustomer}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover"
            >
              <Plus className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 px-5 py-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <Filter className="h-3.5 w-3.5" />
          Filters
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-slate-300 py-1.5 px-3 text-sm text-slate-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Customer Types</option>
          {customerTypeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {typeFilter && (
          <button
            onClick={() => setTypeFilter("")}
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
              <th className="px-5 py-3">Customer ID</th>
              <th className="px-5 py-3">Company Name</th>
              <th className="px-5 py-3">GST Number</th>
              <th className="px-5 py-3">Website</th>
              <th className="px-5 py-3">Billing Address</th>
              <th className="px-5 py-3">Shipping Address</th>
              <th className="px-5 py-3">Primary Contact</th>
              <th className="px-5 py-3">Mobile Number</th>
              <th className="px-5 py-3">Email Address</th>
              <th className="px-5 py-3">Customer Type</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((cust) => (
              <tr
                key={cust.customerId}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-5 py-3 text-slate-500">{cust.customerId}</td>
                <td className="px-5 py-3 font-medium text-primary">
                  {cust.companyName}
                </td>
                <td className="px-5 py-3 text-slate-600">{cust.gstNumber}</td>
                <td className="px-5 py-3 text-slate-600">{cust.website}</td>
                <td className="px-5 py-3 max-w-[180px] truncate text-slate-600" title={cust.billingAddress}>
                  {cust.billingAddress}
                </td>
                <td className="px-5 py-3 max-w-[180px] truncate text-slate-600" title={cust.shippingAddress}>
                  {cust.shippingAddress}
                </td>
                <td className="px-5 py-3 text-slate-600">{cust.primaryContact}</td>
                <td className="px-5 py-3 text-slate-600">{cust.mobile}</td>
                <td className="px-5 py-3 text-slate-600">{cust.email}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${typeStyles[cust.customerType] || "bg-slate-100 text-slate-600"}`}
                  >
                    {cust.customerType}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(cust)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary/10"
                    >
                      <SquarePen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cust.customerId)}
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