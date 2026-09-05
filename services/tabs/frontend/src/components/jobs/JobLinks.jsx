import InlineField from "../ui/InlineField";

function LinkDisplay({ value }) {
  if (!value) return null;
  return (
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--accent)] underline underline-offset-2 truncate max-w-xs hover:opacity-80"
      onClick={(e) => e.stopPropagation()}
    >
      {value}
    </a>
  );
}

/**
 * Props:
 *   data     — job object
 *   onChange — (field: string, value: string) => void
 */
export default function JobLinks({ data, onChange }) {
  return (
    <section>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-3">
        Links
      </h3>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-sm w-28 shrink-0 text-[var(--text)]">
            Job posting
          </span>
          <InlineField
            value={data.posting_link ?? ""}
            onChange={(v) => onChange("posting_link", v)}
            type="url"
            placeholder="https://..."
            label="Job posting link"
            className="text-sm flex-1"
            renderValue={(v) => <LinkDisplay value={v} />}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm w-28 shrink-0 text-[var(--text)]">
            Application
          </span>
          <InlineField
            value={data.tracking_link ?? ""}
            onChange={(v) => onChange("tracking_link", v)}
            type="url"
            placeholder="https://..."
            label="Application tracking link"
            className="text-sm flex-1"
            renderValue={(v) => <LinkDisplay value={v} />}
          />
        </div>
      </div>
    </section>
  );
}
