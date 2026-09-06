import InlineField from "../ui/InlineField";

const ACTION_TYPES = [
  "HR Screening",
  "Technical Round",
  "System Design",
  "Behavioral",
  "Offer Call",
  "Follow-up",
  "Other",
];

const emptyAction = () => ({
  id: `action_${Date.now()}_${Math.random().toString(36).slice(2)}`,
  type: "HR Screening",
  date: "",
  is_completed: false,
});

/**
 * Props:
 *   data     — job object
 *   onChange — (newActions: array) => void
 */
export default function JobActions({ data, onChange }) {
  const actions = data.key_actions ?? [];

  const update = (id, field, value) =>
    onChange(actions.map((a) => (a.id === id ? { ...a, [field]: value } : a)));

  const remove = (id) => onChange(actions.filter((a) => a.id !== id));

  const add = () => onChange([...actions, emptyAction()]);

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
          Actions
        </h3>
        <button
          type="button"
          onClick={add}
          className="text-xs text-[var(--accent)] hover:underline"
        >
          + Add action
        </button>
      </div>

      {actions.length === 0 ? (
        <p className="text-sm italic text-[var(--text)]">No actions yet.</p>
      ) : (
        <div className="space-y-2">
          {actions.map((action) => (
            <div
              key={action.id}
              className="grid grid-cols-[auto_auto_1fr_auto] gap-2 items-center bg-[var(--code-bg)] rounded-xl px-3 py-2"
            >
              {/* Completion toggle */}
              <input
                type="checkbox"
                checked={action.is_completed ?? false}
                onChange={(e) =>
                  update(action.id, "is_completed", e.target.checked)
                }
                className="w-4 h-4 accent-[var(--accent)] cursor-pointer"
                aria-label="Mark as completed"
              />

              {/* Type */}
              <select
                value={action.type}
                onChange={(e) => update(action.id, "type", e.target.value)}
                className="text-xs bg-[var(--code-bg)] text-[var(--text-h)] border border-[var(--border)] rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                {ACTION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              {/* Date */}
              <InlineField
                value={action.date ?? ""}
                onChange={(v) => update(action.id, "date", v)}
                type="date"
                placeholder="Date"
                label="Action date"
                className={[
                  "text-sm",
                  action.is_completed ? "line-through opacity-50" : "",
                ].join(" ")}
              />

              <button
                type="button"
                onClick={() => remove(action.id)}
                className="text-[var(--text)] hover:text-red-500 transition-colors text-xl leading-none px-1"
                aria-label="Remove action"
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
