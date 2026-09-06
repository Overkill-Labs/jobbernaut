import { useState } from "react";
import seedJobs from "../data/mockJobs.json";
import JobDialog from "../components/jobs/JobDialog";

const STATUS_STYLES = {
  applied: "bg-blue-900/60 text-blue-300",
  screening: "bg-purple-900/60 text-purple-300",
  interviewing: "bg-amber-900/60 text-amber-300",
  offer: "bg-green-900/60 text-green-300",
  rejected: "bg-red-900/60 text-red-300",
  archived: "bg-gray-700/60 text-gray-400",
};

const createEmptyJob = () => ({
  id: `job_${Date.now()}_${Math.random().toString(36).slice(2)}`,
  title: "",
  company_name: "",
  date_applied: new Date().toISOString().slice(0, 10),
  location: "",
  status: "applied",
  posting_link: "",
  tracking_link: "",
  description: "",
  salary_range: { min: null, max: null, currency: "USD" },
  key_contacts: [],
  key_actions: [],
  attachments: [],
  notes: "",
  is_archived: false,
});

export default function JobsPage() {
  const [jobs, setJobs] = useState(seedJobs);
  const [activeJob, setActiveJob] = useState(null);
  const [isNewJob, setIsNewJob] = useState(false);

  const handleSave = (updatedJob) => {
    setJobs((prev) => {
      const exists = prev.some((j) => j.id === updatedJob.id);
      return exists
        ? prev.map((j) => (j.id === updatedJob.id ? updatedJob : j))
        : [updatedJob, ...prev];
    });
  };

  const handleDelete = (jobId) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  const handleAddJob = () => {
    setActiveJob(createEmptyJob());
    setIsNewJob(true);
  };

  const handleClose = () => {
    setActiveJob(null);
    setIsNewJob(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-h)] antialiased">
      <header className="border-b border-[var(--border)] px-8 py-5 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Jobbernaut</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[var(--text)]">
            {jobs.length} job{jobs.length !== 1 ? "s" : ""}
          </span>
          <button
            type="button"
            onClick={handleAddJob}
            className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-[var(--accent)] text-white hover:opacity-90 active:opacity-80 transition-opacity"
          >
            <span className="text-base leading-none">+</span>
            Add Job
          </button>
        </div>
      </header>

      <main className="px-8 py-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wider text-[var(--text)] border-b border-[var(--border)]">
              <th className="pb-3 pr-4 w-1/4">Title</th>
              <th className="pb-3 pr-4 w-1/5">Company</th>
              <th className="pb-3 pr-4 w-24">Status</th>
              <th className="pb-3 pr-4">Applied</th>
              <th className="pb-3">Location</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr
                key={job.id}
                onClick={() => setActiveJob(job)}
                className="border-b border-[var(--border)] cursor-pointer hover:bg-[var(--accent-bg)] transition-colors"
              >
                <td className="py-3 pr-4 font-medium text-[var(--text-h)]">
                  {job.title || (
                    <span className="italic text-[var(--text)]">Untitled</span>
                  )}
                </td>
                <td className="py-3 pr-4">
                  {job.company_name || (
                    <span className="italic text-[var(--text)]">—</span>
                  )}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={[
                      "text-xs font-semibold px-2.5 py-0.5 rounded-full",
                      STATUS_STYLES[job.status] ?? STATUS_STYLES.applied,
                    ].join(" ")}
                  >
                    {job.status
                      ? job.status.charAt(0).toUpperCase() + job.status.slice(1)
                      : "—"}
                  </span>
                </td>
                <td className="py-3 pr-4 text-[var(--text)]">
                  {job.date_applied || "—"}
                </td>
                <td className="py-3 text-[var(--text)]">
                  {job.location || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <JobDialog
        job={activeJob}
        isNew={isNewJob}
        onClose={handleClose}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
