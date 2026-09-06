import InlineField from "../ui/InlineField";

const STATUS_OPTIONS = [
  "applied",
  "screening",
  "interviewing",
  "offer",
  "rejected",
  "archived",
];

const STATUS_STYLES = {
  applied: "bg-blue-900/60 text-blue-300",
  screening: "bg-purple-900/60 text-purple-300",
  interviewing: "bg-amber-900/60 text-amber-300",
  offer: "bg-green-900/60 text-green-300",
  rejected: "bg-red-900/60 text-red-300",
  archived: "bg-gray-700/60 text-gray-400",
};

/**
 * Props:
 *   data     — job object
 *   onChange — (field: string, value: any) => void
 */
export default function JobHeader({ data, onChange }) {
  return (
    <div className="space-y-1">
      <InlineField
        value={data.title}
        onChange={(v) => onChange("title", v)}
        placeholder="Job title"
        label="Job title"
        className="text-2xl font-bold"
      />
      <InlineField
        value={data.company_name}
        onChange={(v) => onChange("company_name", v)}
        placeholder="Company name"
        label="Company name"
        className="text-base font-medium"
      />

      <div className="flex flex-wrap items-center gap-3 pt-1">
        {/* Status badge — native select styled as a pill */}
        <select
          value={data.status ?? "applied"}
          onChange={(e) => onChange("status", e.target.value)}
          className={[
            "text-xs font-semibold px-3 py-1 rounded-full border-none cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
            STATUS_STYLES[data.status] ?? STATUS_STYLES.applied,
          ].join(" ")}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        {/* Date applied */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-[var(--text)]">Applied</span>
          <InlineField
            value={data.date_applied ?? ""}
            onChange={(v) => onChange("date_applied", v)}
            type="date"
            placeholder="Date"
            label="Date applied"
            className="text-sm"
          />
        </div>

        {/* Location */}
        <InlineField
          value={data.location ?? ""}
          onChange={(v) => onChange("location", v)}
          placeholder="Location"
          label="Location"
          className="text-sm"
        />
      </div>
    </div>
  );
}
