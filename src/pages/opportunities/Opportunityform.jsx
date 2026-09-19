import { useState } from "react";
import { ArrowLeft, X, ChevronDown } from "lucide-react";

const inputFieldClass =
  "w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const selectFieldClass =
  "w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-16 text-sm text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

// Sample data — wire these to your actual Lead/Customer and User lists
const referenceOptions = [
  "ABC Industries",
  "Bluewave Pipes",
  "Orbit Chemicals (Lead)",
  "Greenline Infra (Lead)",
];
const stageOptions = ["Prospecting", "Qualification", "Proposal", "Negotiation", "Won", "Lost"];
const executiveOptions = ["Sachin Shetye", "Suresh P", "Dilip Santani", "Ankita Goyal"];

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

export default function OpportunityForm({ onBack, onSubmit, onCancel }) {
  const [dealName, setDealName] = useState("");
  const [reference, setReference] = useState("");
  const [expectedRevenue, setExpectedRevenue] = useState("");
  const [probability, setProbability] = useState(50);
  const [closeDate, setCloseDate] = useState("");
  const [stage, setStage] = useState("");
  const [assignedExecutive, setAssignedExecutive] = useState("");
  const [remarks, setRemarks] = useState("");

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
          Add Opportunity
        </h2>
      </div>

      {/* Unified 2-per-row grid */}
      <div className="mb-5 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        <Field label="Deal Name" required>
          <input
            type="text"
            value={dealName}
            onChange={(e) => setDealName(e.target.value)}
            placeholder="Enter Deal Name"
            className={inputFieldClass}
          />
        </Field>

        <Field label="Lead / Customer Reference" required>
          <ClearableSelect
            value={reference}
            onChange={setReference}
            options={referenceOptions}
            placeholder="Select Lead or Customer"
          />
        </Field>

        <Field label="Expected Revenue" required>
          <div className="flex overflow-hidden rounded-lg border border-slate-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
            <span className="flex items-center border-r border-slate-300 bg-slate-50 px-3 text-sm text-slate-600">
              ₹
            </span>
            <input
              type="number"
              value={expectedRevenue}
              onChange={(e) => setExpectedRevenue(e.target.value)}
              placeholder="Enter Expected Revenue"
              className="w-full px-3 py-2.5 text-sm text-slate-700 outline-none"
            />
          </div>
        </Field>

        <Field label={`Probability (${probability}%)`} required>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={probability}
            onChange={(e) => setProbability(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </Field>

        <Field label="Expected Close Date" required>
          <input
            type="date"
            value={closeDate}
            onChange={(e) => setCloseDate(e.target.value)}
            className={inputFieldClass}
          />
        </Field>

        <Field label="Stage" required>
          <ClearableSelect
            value={stage}
            onChange={setStage}
            options={stageOptions}
            placeholder="Select Stage"
          />
        </Field>

        <Field label="Assigned Executive" required className="sm:col-span-2">
          <ClearableSelect
            value={assignedExecutive}
            onChange={setAssignedExecutive}
            options={executiveOptions}
            placeholder="Select Assigned Executive"
          />
        </Field>

        <Field label="Remarks" className="sm:col-span-2">
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter Remarks"
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
              dealName,
              reference,
              expectedRevenue,
              probability,
              closeDate,
              stage,
              assignedExecutive,
              remarks,
            })
          }
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Add Opportunity
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