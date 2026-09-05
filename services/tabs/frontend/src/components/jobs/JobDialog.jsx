import { useState } from "react";
import Dialog from "../ui/Dialog";
import JobHeader from "./JobHeader";
import JobLinks from "./JobLinks";
import JobDescription from "./JobDescription";
import JobSalary from "./JobSalary";
import JobContacts from "./JobContacts";
import JobActions from "./JobActions";
import JobAttachments from "./JobAttachments";
import JobNotes from "./JobNotes";

/**
 * Props:
 *   job      — job object (or null when closed)
 *   onClose  — () => void
 *   onSave   — (updatedJob: object) => void  — called on every field change
 */
export default function JobDialog({ job, onClose, onSave }) {
  const [draft, setDraft] = useState(job);

  // Keep draft in sync if a different job is opened
  // (parent controls open/close via job === null)
  if (job !== null && draft?.id !== job.id) {
    setDraft(job);
  }

  const patchField = (field, value) => {
    const updated = { ...draft, [field]: value };
    setDraft(updated);
    onSave(updated);
  };

  const patchSalary = (newSalary) => {
    const updated = { ...draft, salary_range: newSalary };
    setDraft(updated);
    onSave(updated);
  };

  const patchContacts = (newContacts) => {
    const updated = { ...draft, key_contacts: newContacts };
    setDraft(updated);
    onSave(updated);
  };

  const patchActions = (newActions) => {
    const updated = { ...draft, key_actions: newActions };
    setDraft(updated);
    onSave(updated);
  };

  const patchAttachments = (newAttachments) => {
    const updated = { ...draft, attachments: newAttachments };
    setDraft(updated);
    onSave(updated);
  };

  return (
    <Dialog isOpen={job !== null} onClose={onClose}>
      {draft && (
        <>
          {/* Dialog header bar */}
          <div className="flex items-start justify-between px-6 pt-6 pb-0 gap-4">
            <div className="flex-1 min-w-0">
              <JobHeader data={draft} onChange={patchField} />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 mt-1 text-[var(--text)] hover:text-[var(--text-h)] text-2xl leading-none transition-colors"
              aria-label="Close dialog"
            >
              ×
            </button>
          </div>

          <div className="h-px bg-[var(--border)] mx-6 mt-4" />

          {/* Scrollable body */}
          <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
            <JobLinks data={draft} onChange={patchField} />
            <div className="h-px bg-[var(--border)]" />
            <JobDescription data={draft} onChange={patchField} />
            <div className="h-px bg-[var(--border)]" />
            <JobSalary data={draft} onChange={patchSalary} />
            <div className="h-px bg-[var(--border)]" />
            <JobContacts data={draft} onChange={patchContacts} />
            <div className="h-px bg-[var(--border)]" />
            <JobActions data={draft} onChange={patchActions} />
            <div className="h-px bg-[var(--border)]" />
            <JobAttachments data={draft} onChange={patchAttachments} />
            <div className="h-px bg-[var(--border)]" />
            <JobNotes data={draft} onChange={patchField} />
          </div>
        </>
      )}
    </Dialog>
  );
}
