import { useState } from "react";
import { ArrowLeft, Search, Plus, SquarePen, Trash2, Filter } from "lucide-react";

const initialTasks = [
  {
    taskId: "TK-5001",
    title: "Call ABC Industries regarding quotation discussion",
    description: "Follow up on the ₹5,00,000 quotation sent last week",
    assignedTo: "Dilip Santani",
    dueDate: "20 Sep 2026",
    priority: "High",
    status: "Pending",
    createdDate: "18 Sep 2026",
  },
  {
    taskId: "TK-5002",
    title: "Send revised proposal to Bluewave Pipes",
    description: "Update pricing after negotiation call",
    assignedTo: "Suresh P",
    dueDate: "22 Sep 2026",
    priority: "Medium",
    status: "In Progress",
    createdDate: "19 Sep 2026",
  },
  {
    taskId: "TK-5003",
    title: "Schedule site visit for Orbit Chemicals",
    description: "Coordinate with client for a technical walkthrough",
    assignedTo: "Sachin Shetye",
    dueDate: "25 Sep 2026",
    priority: "Low",
    status: "Pending",
    createdDate: "19 Sep 2026",
  },
  {
    taskId: "TK-5004",
    title: "Collect payment confirmation from Greenline Infra",
    description: "Chase accounts team for pending invoice payment",
    assignedTo: "Dilip Santani",
    dueDate: "17 Sep 2026",
    priority: "High",
    status: "Completed",
    createdDate: "12 Sep 2026",
  },
];

const priorityOptions = ["Low", "Medium", "High"];
const statusOptions = ["Pending", "In Progress", "Completed", "Overdue"];

const priorityStyles = {
  Low: "bg-success/10 text-success",
  Medium: "bg-warning/10 text-warning",
  High: "bg-danger/10 text-danger",
};

const statusStyles = {
  Pending: "bg-slate-100 text-slate-600",
  "In Progress": "bg-primary/10 text-primary",
  Completed: "bg-success/10 text-success",
  Overdue: "bg-danger/10 text-danger",
};

export default function TaskListTable({ onAddTask, onBack, onEdit }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleDelete = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.taskId !== taskId));
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.assignedTo.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter ? t.priority === priorityFilter : true;
    const matchesStatus = statusFilter ? t.status === statusFilter : true;
    return matchesSearch && matchesPriority && matchesStatus;
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
          <h2 className="text-lg font-bold text-slate-900">Task Management</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search task or assignee..."
              className="w-60 rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            onClick={onAddTask}
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
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-lg border border-slate-300 py-1.5 px-3 text-sm text-slate-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Priorities</option>
          {priorityOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
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
        {(priorityFilter || statusFilter) && (
          <button
            onClick={() => {
              setPriorityFilter("");
              setStatusFilter("");
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
              <th className="px-5 py-3">Task ID</th>
              <th className="px-5 py-3">Task Title</th>
              <th className="px-5 py-3">Assigned To</th>
              <th className="px-5 py-3">Due Date</th>
              <th className="px-5 py-3">Priority</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Created Date</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr
                key={task.taskId}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-5 py-3 text-slate-500">{task.taskId}</td>
                <td className="px-5 py-3 max-w-[260px] truncate font-medium text-primary" title={task.title}>
                  {task.title}
                </td>
                <td className="px-5 py-3 text-slate-600">{task.assignedTo}</td>
                <td className="px-5 py-3 text-slate-500">{task.dueDate}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyles[task.priority] || "bg-slate-100 text-slate-600"}`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[task.status] || "bg-slate-100 text-slate-600"}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-slate-500">{task.createdDate}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(task)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary/10"
                    >
                      <SquarePen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(task.taskId)}
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