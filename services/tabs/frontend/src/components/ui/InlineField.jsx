import { useState, useRef, useEffect } from "react";

/**
 * Inline-editable field primitive.
 *
 * Props:
 *   value        — current string value
 *   onChange     — (newValue: string) => void  — called on commit
 *   type         — "text" | "textarea" | "date" | "url" | "number" | "email"
 *   placeholder  — shown when value is empty
 *   label        — accessible label (optional)
 *   className    — extra classes applied to both display and input
 *   renderValue  — (value) => ReactNode  — custom display renderer
 *
 * Behaviour:
 *   Click → enter editing mode
 *   Blur  → commit
 *   Enter → commit  (text / url / number / email / date)
 *   Escape → cancel (revert to original value)
 */
export default function InlineField({
  value,
  onChange,
  type = "text",
  placeholder = "—",
  label,
  className = "",
  renderValue,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");
  const inputRef = useRef(null);

  // Focus & select when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (type !== "textarea" && type !== "date") {
        try {
          inputRef.current.select();
        } catch (_) {
          /* date inputs don't support select */
        }
      }
    }
  }, [isEditing, type]);

  const commit = () => {
    setIsEditing(false);
    if (draft !== (value ?? "")) onChange(draft);
  };

  const cancel = () => {
    setIsEditing(false);
    setDraft(value ?? "");
  };

  const handleKeyDown = (e) => {
    if (type !== "textarea" && e.key === "Enter") {
      e.preventDefault();
      commit();
    }
    if (e.key === "Escape") {
      e.stopPropagation(); // prevent dialog close on Escape while editing
      cancel();
    }
  };

  const sharedInputClass = [
    "w-full bg-transparent border border-[var(--accent)] rounded px-2 py-0.5",
    "text-[var(--text-h)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
    className,
  ].join(" ");

  if (isEditing) {
    if (type === "textarea") {
      return (
        <textarea
          ref={inputRef}
          aria-label={label}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={4}
          className={`${sharedInputClass} resize-none`}
        />
      );
    }
    return (
      <input
        ref={inputRef}
        type={type}
        aria-label={label}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={sharedInputClass}
      />
    );
  }

  // Display mode
  const displayNode = renderValue ? renderValue(value) : null;
  const isEmpty = !value;

  return (
    <button
      type="button"
      onClick={() => {
        setDraft(value ?? "");
        setIsEditing(true);
      }}
      className={[
        "group text-left w-full rounded px-2 py-0.5",
        "hover:bg-[var(--accent-bg)] transition-colors",
        isEmpty ? "text-[var(--text)] italic" : "text-[var(--text-h)]",
        className,
      ].join(" ")}
      title="Click to edit"
      aria-label={label}
    >
      {displayNode ?? (isEmpty ? placeholder : value)}
    </button>
  );
}
