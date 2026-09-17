import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, X, ChevronDown } from "lucide-react";

const selectFieldClass =
  "w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-16 text-sm text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const inputFieldClass =
  "w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

function ClearableSelect({ placeholder }) {
  return (
    <div className="relative">
      <select defaultValue="" className={selectFieldClass}>
        <option value="" disabled>
          {placeholder}
        </option>
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-slate-400">
        <X className="h-3.5 w-3.5 pointer-events-auto cursor-pointer hover:text-slate-600" />
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
}

export default function UserCreationForm({ onBack, onSubmit, onCancel }) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

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
          Add User
        </h2>
      </div>

      {/* Name / Email */}
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className={inputFieldClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Email ID
          </label>
          <input
            type="email"
            defaultValue="mohit@arrowpipes.com"
            className={`${inputFieldClass} bg-primary/10 text-slate-700`}
          />
        </div>
      </div>

      {/* Phone / Role */}
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Phone Number
          </label>
          <div className="flex overflow-hidden rounded-lg border border-slate-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
            <button
              type="button"
              className="flex items-center gap-1 border-r border-slate-300 bg-slate-50 px-2.5 text-sm text-slate-600"
            >
              🇮🇳 <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91"
              className="w-full px-3 py-2.5 text-sm text-slate-700 outline-none"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Role <span className="text-danger">*</span>
          </label>
          <ClearableSelect placeholder="Select Role" />
        </div>
      </div>

      {/* Password / Designation */}
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputFieldClass} bg-primary/10 pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Designation <span className="text-danger">*</span>
          </label>
          <ClearableSelect placeholder="Select Designation" />
        </div>
      </div>

      {/* Department / Reporting Manager */}
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Department <span className="text-danger">*</span>
          </label>
          <ClearableSelect placeholder="Select Department" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Reporting Manager
          </label>
          <ClearableSelect placeholder="Select Reporting Manager" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSubmit}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Add User
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