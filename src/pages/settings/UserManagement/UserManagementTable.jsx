import { useState } from "react";
import { ArrowLeft, Search, Plus, SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";



const initialUsers = [
  { name: "Dharmendra Santani", role: "Sales", designation: "Director-Sales", department: "Management", reportingManager: "" },
  { name: "Dilip Santani", role: "Sales", designation: "Manager - Sales", department: "Management", reportingManager: "" },
  { name: "Sachin Shetye", role: "Sales", designation: "Senior Associate - Sales", department: "Sales", reportingManager: "" },
  { name: "Suresh P", role: "Sales", designation: "Senior Associate - Sales", department: "Sales", reportingManager: "" },
  { name: "Ankita Goyal", role: "Cylsys Team Access", designation: "Project Manager", department: "Information Technology", reportingManager: "" },
  { name: "Shiv Kumar", role: "Store Keeper", designation: "Storekeeper", department: "Store Keeper", reportingManager: "" },
  { name: "Shailesh Kumar", role: "Store Keeper", designation: "Storekeeper", department: "Store Keeper", reportingManager: "" },
  { name: "Sandeep Prajapati", role: "Store Keeper", designation: "Storekeeper", department: "Store Keeper", reportingManager: "" },
  { name: "Ravi Sahni", role: "Store Keeper", designation: "Storekeeper", department: "Store Keeper", reportingManager: "" },
  { name: "Luis Domingos", role: "Store Keeper", designation: "Manager - Stores", department: "Store Keeper", reportingManager: "" },
  { name: "Raja John", role: "QA QC", designation: "QHSE", department: "QA QC", reportingManager: "" },
];

export default function UserManagementTable({ onAddUser, onBack, onEdit }) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");

  const handleDelete = (name) => {
    setUsers((prev) => prev.filter((u) => u.name !== name));
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <Link to="/settings">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <h2 className="text-lg font-bold text-slate-900">User Management</h2>
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
          <Link to="/settings/user-management/add-user">
            <button
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
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Designation</th>
              <th className="px-5 py-3">Department</th>
              <th className="px-5 py-3">Reporting Manager</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.name}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-5 py-3 font-medium text-primary">
                  {user.name}
                </td>
                <td className="px-5 py-3 text-slate-600">{user.role}</td>
                <td className="px-5 py-3 text-slate-600">{user.designation}</td>
                <td className="px-5 py-3 text-slate-600">{user.department}</td>
                <td className="px-5 py-3 text-slate-400">
                  {user.reportingManager || "—"}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(user)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary/10"
                    >
                      <SquarePen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.name)}
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