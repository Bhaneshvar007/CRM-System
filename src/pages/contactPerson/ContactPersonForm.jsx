import { useState } from "react";
import { ArrowLeft, X, ChevronDown } from "lucide-react";

const inputFieldClass =
  "w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const selectFieldClass =
  "w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-16 text-sm text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

// Sample data — wire these to your actual Customer Management and Dropdown Master lists
const customerOptions = ["ABC Industries", "Bluewave Pipes", "Orbit Chemicals"];
const contactNameOptions = ["Ramesh Iyer", "Sunita Rao", "Vivek Shah", "Anita Deshmukh"];
const designationOptions = ["Purchase Manager", "Director", "Accounts Manager", "General Manager"];
const departmentOptions = ["Procurement", "Management", "Accounts", "Sales"];

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

export default function ContactPersonForm({ onBack, onSubmit, onCancel }) {
  const [customerId, setCustomerId] = useState("");
  const [contactName, setContactName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);

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
          Add Contact Person
        </h2>
      </div>

      {/* Unified 2-per-row grid */}
      <div className="mb-5 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        <Field label="Customer" required className="sm:col-span-2">
          <ClearableSelect
            value={customerId}
            onChange={setCustomerId}
            options={customerOptions}
            placeholder="Select Customer"
          />
        </Field>

        <Field label="Contact Name" required>
          <ClearableSelect
            value={contactName}
            onChange={setContactName}
            options={contactNameOptions}
            placeholder="Select Contact Name"
          />
        </Field>

        <Field label="Designation" required>
          <ClearableSelect
            value={designation}
            onChange={setDesignation}
            options={designationOptions}
            placeholder="Select Designation"
          />
        </Field>

        <Field label="Department" required>
          <ClearableSelect
            value={department}
            onChange={setDepartment}
            options={departmentOptions}
            placeholder="Select Department"
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

        <Field label="Email Address" required className="sm:col-span-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            className={inputFieldClass}
          />
        </Field>

        {/* Is Primary Contact toggle */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Is Primary Contact
          </label>
          <button
            type="button"
            onClick={() => setIsPrimary((v) => !v)}
            className={`flex h-6 w-11 items-center rounded-full transition-colors ${
              isPrimary ? "bg-primary" : "bg-slate-300"
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
                isPrimary ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() =>
            onSubmit?.({
              customerId,
              contactName,
              designation,
              department,
              mobile,
              email,
              isPrimary,
            })
          }
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Add Contact
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