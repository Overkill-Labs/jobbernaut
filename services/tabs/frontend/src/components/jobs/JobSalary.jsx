import InlineField from "../ui/InlineField";

/**
 * Props:
 *   data     — job object
 *   onChange — (newSalaryRange: object) => void
 */
export default function JobSalary({ data, onChange }) {
  const salary = data.salary_range ?? {};

  const patch = (field, rawValue) => {
    const value =
      field === "currency" ? rawValue : rawValue === "" ? "" : Number(rawValue);
    onChange({ ...salary, [field]: value });
  };

  return (
    <section>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-3">
        Salary Range
      </h3>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-[var(--text)]">Min</span>
          <InlineField
            value={salary.min != null ? String(salary.min) : ""}
            onChange={(v) => patch("min", v)}
            type="number"
            placeholder="0"
            label="Minimum salary"
            className="text-sm w-28"
          />
        </div>
        <span className="text-[var(--text)]">–</span>
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-[var(--text)]">Max</span>
          <InlineField
            value={salary.max != null ? String(salary.max) : ""}
            onChange={(v) => patch("max", v)}
            type="number"
            placeholder="0"
            label="Maximum salary"
            className="text-sm w-28"
          />
        </div>
        <InlineField
          value={salary.currency ?? ""}
          onChange={(v) => patch("currency", v)}
          placeholder="USD"
          label="Currency"
          className="text-sm w-16"
        />
      </div>
    </section>
  );
}
