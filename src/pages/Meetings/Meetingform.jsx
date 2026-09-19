import { useState } from "react";
import { ArrowLeft, X, ChevronDown } from "lucide-react";

const inputFieldClass =
  "w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const selectFieldClass =
  "w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-16 text-sm text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

// Sample data — wire this to your actual Lead/Customer list
const customerOptions = ["ABC Industries", "Bluewave Pipes", "Orbit Chemicals", "Greenline Infra"];
const outcomeOptions = ["Scheduled", "Positive", "Follow-up Required", "Not Interested", "Deal Closed"];

function Field({ label, required, className, children }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children}
    </div>
  );
}

function ClearableSelect({ value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectFieldClass}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-slate-400">
        <X
          onClick={() => onChange("")}
          className="h-3.5 w-3.5 pointer-events-auto cursor-pointer hover:text-slate-600"
        />
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
}

export default function MeetingForm({ onBack, onSubmit, onCancel }) {
  const [customerReference, setCustomerReference] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [location, setLocation] = useState("");
  const [agenda, setAgenda] = useState("");
  const [attendees, setAttendees] = useState("");
  const [notes, setNotes] = useState("");
  const [outcome, setOutcome] = useState("");

  return (
    <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h2 className="text-lg font-bold uppercase tracking-wide text-slate-900">
          Add Meeting
        </h2>
      </div>

      {/* Unified 2-per-row grid */}
      <div className="mb-5 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        <Field label="Customer Reference" required className="sm:col-span-2">
          <ClearableSelect
            value={customerReference}
            onChange={setCustomerReference}
            options={customerOptions}
            placeholder="Select Customer"
          />
        </Field>

        <Field label="Meeting Date" required>
          <input
            type="date"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            className={inputFieldClass}
          />
        </Field>

        <Field label="Meeting Time" required>
          <input
            type="time"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            className={inputFieldClass}
          />
        </Field>

        <Field label="Location" required>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location or Meeting Link"
            className={inputFieldClass}
          />
        </Field>

        <Field label="Outcome">
          <ClearableSelect
            value={outcome}
            onChange={setOutcome}
            options={outcomeOptions}
            placeholder="Select Outcome"
          />
        </Field>

        <Field label="Attendees" required className="sm:col-span-2">
          <input
            type="text"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            placeholder="Enter Attendee Names, comma separated"
            className={inputFieldClass}
          />
        </Field>

        <Field label="Agenda" required className="sm:col-span-2">
          <textarea
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            placeholder="Enter Meeting Agenda"
            rows={3}
            className={`${inputFieldClass} resize-none`}
          />
        </Field>

        <Field label="Meeting Notes" className="sm:col-span-2">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter Meeting Notes / Outcome Details"
            rows={4}
            className={`${inputFieldClass} resize-none`}
          />
        </Field>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() =>
            onSubmit?.({
              customerReference,
              meetingDate,
              meetingTime,
              location,
              agenda,
              attendees,
              notes,
              outcome,
            })
          }
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Add Meeting
        </button>
        <button
          onClick={onCancel}
          className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}