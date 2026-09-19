import { useState } from "react";
import { ArrowLeft, X, ChevronDown, Plus, Trash2 } from "lucide-react";

const inputFieldClass =
  "w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const selectFieldClass =
  "w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-16 text-sm text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const smallInputClass =
  "w-full rounded-lg border border-slate-300 bg-white py-2 px-2.5 text-sm text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

// Sample data — wire these to your actual Customer and Product lists
const customerOptions = ["ABC Industries", "Bluewave Pipes", "Orbit Chemicals", "Greenline Infra"];
const statusOptions = ["Draft", "Sent", "Approved", "Rejected", "Expired"];

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

function emptyItem() {
  return { product: "", quantity: "", rate: "", tax: "", discount: "" };
}

function calcAmount({ quantity, rate, tax, discount }) {
  const qty = Number(quantity) || 0;
  const rt = Number(rate) || 0;
  const taxPct = Number(tax) || 0;
  const discPct = Number(discount) || 0;
  const base = qty * rt;
  const afterDiscount = base - (base * discPct) / 100;
  const afterTax = afterDiscount + (afterDiscount * taxPct) / 100;
  return afterTax;
}

export default function QuotationForm({ onBack, onSubmit, onCancel }) {
  const [customerName, setCustomerName] = useState("");
  const [quotationDate, setQuotationDate] = useState("");
  const [validTill, setValidTill] = useState("");
  const [status, setStatus] = useState("");
  const [items, setItems] = useState([emptyItem()]);

  const updateItem = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addItem = () => setItems((prev) => [...prev, emptyItem()]);
  const removeItem = (index) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  const totalAmount = items.reduce((sum, item) => sum + calcAmount(item), 0);

  return (
    <div className="max-w-4xl rounded-xl border border-slate-200 bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h2 className="text-lg font-bold uppercase tracking-wide text-slate-900">
          Add Quotation
        </h2>
      </div>

      {/* Quotation header fields */}
      <div className="mb-6 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        <Field label="Customer Name" required>
          <ClearableSelect
            value={customerName}
            onChange={setCustomerName}
            options={customerOptions}
            placeholder="Select Customer"
          />
        </Field>

        <Field label="Status" required>
          <ClearableSelect
            value={status}
            onChange={setStatus}
            options={statusOptions}
            placeholder="Select Status"
          />
        </Field>

        <Field label="Quotation Date" required>
          <input
            type="date"
            value={quotationDate}
            onChange={(e) => setQuotationDate(e.target.value)}
            className={inputFieldClass}
          />
        </Field>

        <Field label="Valid Till" required>
          <input
            type="date"
            value={validTill}
            onChange={(e) => setValidTill(e.target.value)}
            className={inputFieldClass}
          />
        </Field>
      </div>

      {/* Line items */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Products <span className="text-danger">*</span>
          </label>
          <button
            onClick={addItem}
            className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Item
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-3 py-2">Product</th>
                <th className="px-3 py-2 w-24">Quantity</th>
                <th className="px-3 py-2 w-28">Rate</th>
                <th className="px-3 py-2 w-24">Tax %</th>
                <th className="px-3 py-2 w-28">Discount %</th>
                <th className="px-3 py-2 w-32 text-right">Amount</th>
                <th className="px-3 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-t border-slate-100">
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={item.product}
                      onChange={(e) => updateItem(index, "product", e.target.value)}
                      placeholder="Enter Product"
                      className={smallInputClass}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", e.target.value)}
                      placeholder="0"
                      className={smallInputClass}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(index, "rate", e.target.value)}
                      placeholder="0"
                      className={smallInputClass}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={item.tax}
                      onChange={(e) => updateItem(index, "tax", e.target.value)}
                      placeholder="0"
                      className={smallInputClass}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={item.discount}
                      onChange={(e) => updateItem(index, "discount", e.target.value)}
                      placeholder="0"
                      className={smallInputClass}
                    />
                  </td>
                  <td className="px-3 py-2 text-right font-medium text-slate-700">
                    ₹{calcAmount(item).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                      className="text-danger hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="mt-3 flex justify-end">
          <div className="w-64 rounded-lg bg-slate-50 px-4 py-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-600">Total Amount</span>
              <span className="text-base font-bold text-slate-900">
                ₹{totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() =>
            onSubmit?.({ customerName, quotationDate, validTill, status, items, totalAmount })
          }
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Add Quotation
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