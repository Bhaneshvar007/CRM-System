import { useState } from "react";
import { ArrowLeft, Search, Plus, SquarePen, Trash2, Filter } from "lucide-react";

const initialMeetings = [
  {
    meetingId: "MT-6001",
    customerReference: "ABC Industries",
    meetingDate: "15 Sep 2026",
    meetingTime: "11:00 AM",
    location: "Client Office, Pune",
    agenda: "Product discussion for bulk pipe order",
    attendees: "Ramesh Iyer, Dilip Santani",
    notes: "Client wants revised pricing for 500 units",
    outcome: "Follow-up Required",
  },
  {
    meetingId: "MT-6002",
    customerReference: "Bluewave Pipes",
    meetingDate: "17 Sep 2026",
    meetingTime: "03:30 PM",
    location: "Google Meet",
    agenda: "Annual supply contract negotiation",
    attendees: "Anita Deshmukh, Suresh P",
    notes: "Agreed on quarterly payment terms",
    outcome: "Positive",
  },
  {
    meetingId: "MT-6003",
    customerReference: "Orbit Chemicals",
    meetingDate: "19 Sep 2026",
    meetingTime: "10:00 AM",
    location: "Client Site, Bengaluru",
    agenda: "Initial requirement discussion",
    attendees: "Vikram Nair, Sachin Shetye",
    notes: "",
    outcome: "Scheduled",
  },
  {
    meetingId: "MT-6004",
    customerReference: "Greenline Infra",
    meetingDate: "10 Sep 2026",
    meetingTime: "02:00 PM",
    location: "Site Office",
    agenda: "Material requirement walkthrough",
    attendees: "Priya Menon, Dilip Santani",
    notes: "Client went with a competitor",
    outcome: "Not Interested",
  },
];

const outcomeOptions = ["Scheduled", "Positive", "Follow-up Required", "Not Interested", "Deal Closed"];

const outcomeStyles = {
  Scheduled: "bg-slate-100 text-slate-600",
  Positive: "bg-success/10 text-success",
  "Follow-up Required": "bg-warning/10 text-warning",
  "Not Interested": "bg-danger/10 text-danger",
  "Deal Closed": "bg-primary/10 text-primary",
};

export default function MeetingListTable({ onAddMeeting, onBack, onEdit }) {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [search, setSearch] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("");

  const handleDelete = (meetingId) => {
    setMeetings((prev) => prev.filter((m) => m.meetingId !== meetingId));
  };

  const filteredMeetings = meetings.filter((m) => {
    const matchesSearch =
      m.customerReference.toLowerCase().includes(search.toLowerCase()) ||
      m.agenda.toLowerCase().includes(search.toLowerCase());
    const matchesOutcome = outcomeFilter ? m.outcome === outcomeFilter : true;
    return matchesSearch && matchesOutcome;
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
          <h2 className="text-lg font-bold text-slate-900">Meeting Management</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer or agenda..."
              className="w-60 rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            onClick={onAddMeeting}
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
          value={outcomeFilter}
          onChange={(e) => setOutcomeFilter(e.target.value)}
          className="rounded-lg border border-slate-300 py-1.5 px-3 text-sm text-slate-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">All Outcomes</option>
          {outcomeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {outcomeFilter && (
          <button
            onClick={() => setOutcomeFilter("")}
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
              <th className="px-5 py-3">Meeting ID</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Time</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Agenda</th>
              <th className="px-5 py-3">Attendees</th>
              <th className="px-5 py-3">Outcome</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeetings.map((m) => (
              <tr
                key={m.meetingId}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-5 py-3 text-slate-500">{m.meetingId}</td>
                <td className="px-5 py-3 font-medium text-primary">
                  {m.customerReference}
                </td>
                <td className="px-5 py-3 text-slate-600">{m.meetingDate}</td>
                <td className="px-5 py-3 text-slate-600">{m.meetingTime}</td>
                <td className="px-5 py-3 text-slate-600">{m.location}</td>
                <td className="px-5 py-3 max-w-[200px] truncate text-slate-600" title={m.agenda}>
                  {m.agenda}
                </td>
                <td className="px-5 py-3 max-w-[180px] truncate text-slate-600" title={m.attendees}>
                  {m.attendees}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${outcomeStyles[m.outcome] || "bg-slate-100 text-slate-600"}`}
                  >
                    {m.outcome}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(m)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary/10"
                    >
                      <SquarePen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(m.meetingId)}
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