import { useState } from "react";
import { ArrowLeft, X, ChevronDown } from "lucide-react";

const inputFieldClass =
  "w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const selectFieldClass =
  "w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-16 text-sm text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const customerTypeOptions = ["Retail", "Wholesale", "Distributor", "Corporate"];

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

export default function CustomerForm({ onBack, onSubmit, onCancel }) {
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [primaryContact, setPrimaryContact] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const handleSameAsBilling = (checked) => {
    setSameAsBilling(checked);
    if (checked) setShippingAddress(billingAddress);
  };

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
          Add Customer
        </h2>
      </div>

      {/* Unified 2-per-row grid */}
      <div className="mb-5 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        <Field label="Company Name" required>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter Company Name"
            className={inputFieldClass}
          />
        </Field>

        <Field label="GST Number" required>
          <input
            type="text"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
            placeholder="Enter GST Number"
            className={inputFieldClass}
          />
        </Field>

        <Field label="Website">
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="www.example.com"
            className={inputFieldClass}
          />
        </Field>

        <Field label="Customer Type" required>
          <ClearableSelect
            value={customerType}
            onChange={setCustomerType}
            options={customerTypeOptions}
            placeholder="Select Customer Type"
          />
        </Field>

        <Field label="Primary Contact" required>
          <input
            type="text"
            value={primaryContact}
            onChange={(e) => setPrimaryContact(e.target.value)}
            placeholder="Enter Primary Contact"
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

        <Field label="Email Address" required className="sm:col-span-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            className={inputFieldClass}
          />
        </Field>

        <Field label="Billing Address" required className="sm:col-span-2">
          <textarea
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            placeholder="Enter Billing Address"
            rows={3}
            className={`${inputFieldClass} resize-none`}
          />
        </Field>

        <div className="sm:col-span-2">
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Shipping Address <span className="text-danger">*</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs text-slate-500">
              <input
                type="checkbox"
                checked={sameAsBilling}
                onChange={(e) => handleSameAsBilling(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-slate-300 text-primary focus:ring-primary"
              />
              Same as billing address
            </label>
          </div>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter Shipping Address"
            rows={3}
            disabled={sameAsBilling}
            className={`${inputFieldClass} resize-none ${sameAsBilling ? "cursor-not-allowed bg-slate-50 text-slate-400" : ""}`}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={() =>
            onSubmit?.({
              companyName,
              gstNumber,
              website,
              billingAddress,
              shippingAddress,
              primaryContact,
              mobile,
              email,
              customerType,
            })
          }
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Add Customer
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