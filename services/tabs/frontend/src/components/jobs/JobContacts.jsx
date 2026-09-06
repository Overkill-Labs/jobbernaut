import InlineField from "../ui/InlineField";

const CONTACT_TYPES = ["Recruiter", "Hiring Manager", "Referral", "Other"];

const emptyContact = () => ({
  id: `contact_${Date.now()}_${Math.random().toString(36).slice(2)}`,
  type: "Recruiter",
  name: "",
  email: "",
  phone: "",
});

/**
 * Props:
 *   data     — job object
 *   onChange — (newContacts: array) => void
 */
export default function JobContacts({ data, onChange }) {
  const contacts = data.key_contacts ?? [];

  const update = (id, field, value) =>
    onChange(contacts.map((c) => (c.id === id ? { ...c, [field]: value } : c)));

  const remove = (id) => onChange(contacts.filter((c) => c.id !== id));

  const add = () => onChange([...contacts, emptyContact()]);

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
          Contacts
        </h3>
        <button
          type="button"
          onClick={add}
          className="text-xs text-[var(--accent)] hover:underline"
        >
          + Add contact
        </button>
      </div>

      {contacts.length === 0 ? (
        <p className="text-sm italic text-[var(--text)]">No contacts yet.</p>
      ) : (
        <div className="space-y-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-2 items-center bg-[var(--code-bg)] rounded-xl px-3 py-2"
            >
              <select
                value={contact.type}
                onChange={(e) => update(contact.id, "type", e.target.value)}
                className="text-xs bg-[var(--code-bg)] text-[var(--text-h)] border border-[var(--border)] rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                {CONTACT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <InlineField
                value={contact.name ?? ""}
                onChange={(v) => update(contact.id, "name", v)}
                placeholder="Name"
                label="Contact name"
                className="text-sm"
              />
              <InlineField
                value={contact.email ?? ""}
                onChange={(v) => update(contact.id, "email", v)}
                type="email"
                placeholder="Email"
                label="Contact email"
                className="text-sm"
              />
              <InlineField
                value={contact.phone ?? ""}
                onChange={(v) => update(contact.id, "phone", v)}
                placeholder="Phone"
                label="Contact phone"
                className="text-sm"
              />

              <button
                type="button"
                onClick={() => remove(contact.id)}
                className="text-[var(--text)] hover:text-red-500 transition-colors text-xl leading-none px-1"
                aria-label="Remove contact"
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
