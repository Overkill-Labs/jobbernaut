import InlineField from "../ui/InlineField";

/**
 * Props:
 *   data     — job object
 *   onChange — (field: string, value: string) => void
 */
export default function JobDescription({ data, onChange }) {
  return (
    <section>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-2">
        Description
      </h3>
      <InlineField
        value={data.description ?? ""}
        onChange={(v) => onChange("description", v)}
        type="textarea"
        placeholder="Add a job description…"
        label="Job description"
        className="text-sm leading-relaxed w-full"
      />
    </section>
  );
}
