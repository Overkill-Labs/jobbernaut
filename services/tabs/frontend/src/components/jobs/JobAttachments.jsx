import InlineField from "../ui/InlineField";

const ATTACHMENT_TYPES = [
  "Resume",
  "Cover Letter",
  "Portfolio",
  "Reference",
  "Other",
];

const emptyAttachment = () => ({
  id: `attachment_${Date.now()}_${Math.random().toString(36).slice(2)}`,
  type: "Resume",
  link: "",
});

/**
 * Props:
 *   data     — job object
 *   onChange — (newAttachments: array) => void
 */
export default function JobAttachments({ data, onChange }) {
  const attachments = data.attachments ?? [];

  const update = (id, field, value) =>
    onChange(
      attachments.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    );

  const remove = (id) => onChange(attachments.filter((a) => a.id !== id));

  const add = () => onChange([...attachments, emptyAttachment()]);

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
          Attachments
        </h3>
        <button
          type="button"
          onClick={add}
          className="text-xs text-[var(--accent)] hover:underline"
        >
          + Add attachment
        </button>
      </div>

      {attachments.length === 0 ? (
        <p className="text-sm italic text-[var(--text)]">No attachments yet.</p>
      ) : (
        <div className="space-y-2">
          {attachments.map((att) => (
            <div
              key={att.id}
              className="grid grid-cols-[auto_1fr_auto] gap-2 items-center bg-[var(--code-bg)] rounded-xl px-3 py-2"
            >
              <select
                value={att.type}
                onChange={(e) => update(att.id, "type", e.target.value)}
                className="text-xs bg-[var(--code-bg)] text-[var(--text-h)] border border-[var(--border)] rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                {ATTACHMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <InlineField
                value={att.link ?? ""}
                onChange={(v) => update(att.id, "link", v)}
                type="url"
                placeholder="https://..."
                label="Attachment link"
                className="text-sm"
                renderValue={(v) =>
                  v ? (
                    <a
                      href={v}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] underline underline-offset-2 truncate hover:opacity-80"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {v}
                    </a>
                  ) : null
                }
              />

              <button
                type="button"
                onClick={() => remove(att.id)}
                className="text-[var(--text)] hover:text-red-500 transition-colors text-xl leading-none px-1"
                aria-label="Remove attachment"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
