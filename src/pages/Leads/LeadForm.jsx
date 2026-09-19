import { useState } from "react";
import { ArrowLeft, X, ChevronDown } from "lucide-react";

const inputFieldClass =
  "w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const selectFieldClass =
  "w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-16 text-sm text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const sourceOptions = ["Website", "Referral", "Trade Show", "Cold Call", "Social Media"];
const industryOptions = ["Textiles", "Manufacturing", "Chemicals", "Construction", "IT Services"];
const assignedToOptions = ["Sachin Shetye", "Suresh P", "Dilip Santani", "Ankita Goyal"];
const statusOptions = ["New", "In Progress", "Qualified", "Lost"];

function Field({ label, required, children }) {
  return (
    <div>
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

export default function LeadForm({ onBack, onSubmit, onCancel }) {
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [industry, setIndustry] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("");
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
          Add Lead
        </h2>
      </div>

      {/* Single unified grid — always 2 fields per row */}
      <div className="mb-8 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        <Field label="Company Name" required>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter Company Name"
            className={inputFieldClass}
          />
        </Field>

        <Field label="Contact Person" required>
          <input
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            placeholder="Enter Contact Person"
            className={inputFieldClass}
          />
        </Field>

        <Field label="Mobile Number" required>
          <div className="flex overflow-hidden rounded-lg border border-slate-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
            <span className="flex items-center gap-1 border-r border-slate-300 bg-slate-50 px-2.5 text-sm text-slate-600">
              🇮🇳
            </span>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="+91"
              className="w-full px-3 py-2.5 text-sm text-slate-700 outline-none"
            />
          </div>
        </Field>

        <Field label="Email Address" required>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            className={inputFieldClass}
          />
        </Field>

        <Field label="Lead Source" required>
          <ClearableSelect
            value={source}
            onChange={setSource}
            options={sourceOptions}
            placeholder="Select Lead Source"
          />
        </Field>

        <Field label="Industry" required>
          <ClearableSelect
            value={industry}
            onChange={setIndustry}
            options={industryOptions}
            placeholder="Select Industry"
          />
        </Field>

        <Field label="Assigned To" required>
          <ClearableSelect
            value={assignedTo}
            onChange={setAssignedTo}
            options={assignedToOptions}
            placeholder="Select Assignee"
          />
        </Field>

        <Field label="Lead Status" required>
          <ClearableSelect
            value={status}
            onChange={setStatus}
            options={statusOptions}
            placeholder="Select Lead Status"
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Remarks">
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter Remarks"
              rows={4}
              className={`${inputFieldClass} resize-none`}
            />
          </Field>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() =>
            onSubmit?.({
              companyName,
              contactPerson,
              mobile,
              email,
              source,
              industry,
              assignedTo,
              status,
              remarks,
            })
          }
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Add Lead
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