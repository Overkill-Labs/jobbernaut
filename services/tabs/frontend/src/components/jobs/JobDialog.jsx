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
 *   isNew    — true when this job hasn't been committed to the list yet
 *   onClose  — () => void
 *   onSave   — (job: object) => void   — upserts job into the list
 *   onDelete — (jobId: string) => void — removes job from the list
 */
export default function JobDialog({
  job,
  isNew = false,
  onClose,
  onSave,
  onDelete,
}) {
  const [draft, setDraft] = useState(job);

  // Sync draft when a different job is opened
  if (job !== null && draft?.id !== job.id) {
    setDraft(job);
  }

  // For NEW jobs: patch functions only update local draft (don't commit to list yet).
  // For EXISTING jobs: every patch immediately auto-saves (original inline-edit behaviour).
  const patch = (updater) => {
    const updated = updater(draft);
    setDraft(updated);
    if (!isNew) onSave(updated);
  };

  const patchField = (field, value) => patch((d) => ({ ...d, [field]: value }));
  const patchSalary = (newSalary) =>
    patch((d) => ({ ...d, salary_range: newSalary }));
  const patchContacts = (v) => patch((d) => ({ ...d, key_contacts: v }));
  const patchActions = (v) => patch((d) => ({ ...d, key_actions: v }));
  const patchAttachments = (v) => patch((d) => ({ ...d, attachments: v }));

  const handleSave = () => {
    onSave(draft);
    onClose();
  };

  const handleDelete = () => {
    onDelete(draft.id);
    onClose();
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

          {/* Footer */}
          <div className="h-px bg-[var(--border)]" />
          <div className="px-6 py-4 flex items-center justify-between gap-3">
            {isNew ? (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm text-[var(--text)] hover:text-[var(--text-h)] transition-colors"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="text-sm font-semibold px-5 py-2 rounded-lg bg-[var(--accent)] text-white hover:opacity-90 active:opacity-80 transition-opacity"
                >
                  Save Job
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-sm font-medium px-4 py-2 rounded-lg text-red-400 hover:bg-red-900/30 transition-colors"
                >
                  Delete Job
                </button>
                <span className="text-xs text-[var(--text)] italic">
                  Changes saved automatically
                </span>
              </>
            )}
          </div>
        </>
      )}
    </Dialog>
  );
}
