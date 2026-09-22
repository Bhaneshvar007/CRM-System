import { useState } from "react";
import {
  ArrowLeft,
  X,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  ListOrdered,
  List,
  AlignLeft,
  Image as ImageIcon,
  Eraser,
} from "lucide-react";
import { Link } from "react-router-dom";



const inputFieldClass =
  "w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const selectFieldClass =
  "w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-16 text-sm text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const templateTypeOptions = ["Transactional", "Marketing", "Notification"];
const templateCategoryOptions = ["Onboarding", "Sales", "Support", "Billing"];

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

const toolbarIcons = [Bold, Italic, Underline, Strikethrough];
const toolbarIcons2 = [ListOrdered, List];
const toolbarIcons3 = [AlignLeft, ImageIcon, Eraser];

export default function EmailTemplateForm({ onSubmit, onCancel }) {
  const [templateType, setTemplateType] = useState("");
  const [templateCategory, setTemplateCategory] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const wordCount = description.trim() === "" ? 0 : description.trim().split(/\s+/).length;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-3 pb-5">
        <Link to="/settings/email-template/list">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50">
            <ArrowLeft className="h-4 w-4" />
          </button>
        </Link>
        <h2 className="text-lg font-bold text-slate-900">Add Template</h2>
      </div>

      {/* Template Type / Template Category */}
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Template Type <span className="text-danger">*</span>
          </label>
          <ClearableSelect
            value={templateType}
            onChange={setTemplateType}
            options={templateTypeOptions}
            placeholder="Select Template Type"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Template Category <span className="text-danger">*</span>
          </label>
          <ClearableSelect
            value={templateCategory}
            onChange={setTemplateCategory}
            options={templateCategoryOptions}
            placeholder="Select Template Category"
          />
        </div>
      </div>

      {/* Template Name / Subject */}
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Template Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Enter Template Name"
            className={inputFieldClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Subject <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter Email Subject"
            className={inputFieldClass}
          />
        </div>
      </div>

      {/* Description / rich text editor */}
      <div className="mb-8">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
          Description <span className="text-danger">*</span>
        </label>
        <div className="rounded-lg border border-slate-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 px-3 py-2 text-slate-500">
            <select
              className="rounded border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 outline-none"
              defaultValue="Normal"
            >
              <option>Normal</option>
              <option>Heading 1</option>
              <option>Heading 2</option>
            </select>
            <div className="h-4 w-px bg-slate-200" />
            {toolbarIcons.map((Icon, i) => (
              <Icon key={i} className="h-4 w-4 cursor-pointer hover:text-slate-800" />
            ))}
            <div className="h-4 w-px bg-slate-200" />
            {toolbarIcons2.map((Icon, i) => (
              <Icon key={i} className="h-4 w-4 cursor-pointer hover:text-slate-800" />
            ))}
            <div className="h-4 w-px bg-slate-200" />
            {toolbarIcons3.map((Icon, i) => (
              <Icon key={i} className="h-4 w-4 cursor-pointer hover:text-slate-800" />
            ))}
          </div>

          {/* Editable area */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Compose your email template here..."
            rows={10}
            className="w-full resize-none rounded-b-lg px-4 py-3 text-sm italic text-slate-500 outline-none placeholder:italic"
          />

          <div className="flex justify-end border-t border-slate-100 px-3 py-1.5 text-xs text-slate-400">
            {wordCount} words
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <Link to="/settings/email-template/list">
          <button
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
        </Link>
        <button
          onClick={() =>
            onSubmit?.({ templateType, templateCategory, templateName, subject, description })
          }
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Submit
        </button>
      </div>
    </div >
  );
}