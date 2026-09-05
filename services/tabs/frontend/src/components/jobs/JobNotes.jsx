import InlineField from "../ui/InlineField";

/**
 * Props:
 *   data     — job object
 *   onChange — (field: string, value: string) => void
 */
export default function JobNotes({ data, onChange }) {
  return (
    <section>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-2">
        Notes
      </h3>
      <InlineField
        value={data.notes ?? ""}
        onChange={(v) => onChange("notes", v)}
        type="textarea"
        placeholder="Add personal notes…"
        label="Notes"
        className="text-sm leading-relaxed w-full"
      />
    </section>
  );
}
